import { NextResponse } from 'next/server';

// 위경도 → 기상청 격자 변환 함수 (Lambert Conformal Conic Projection)
function convertToGrid(lat, lon) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = re * sf / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = re * sf / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { x, y };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get('lat'));
  const lon = parseFloat(searchParams.get('lon'));

  if (!lat || !lon) {
    return NextResponse.json(
      { error: '위도와 경도가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const KMA_API_KEY = process.env.NEXT_PUBLIC_KMA_API_KEY; // 기상청 API 키

    if (!KMA_API_KEY) {
      // API 키가 없을 경우 모의 데이터 반환
      console.log('기상청 API 키가 없습니다. 모의 데이터를 사용합니다.');
      return NextResponse.json({
        condition: 'clear',
        temp: 20,
        description: '맑음',
        isMock: true
      });
    }

    // 위경도를 기상청 격자로 변환
    const grid = convertToGrid(lat, lon);
    console.log(`좌표 변환: (${lat}, ${lon}) → 격자(${grid.x}, ${grid.y})`);

    // 현재 시간 기준으로 발표 시각 계산
    const now = new Date();
    const kstOffset = 9 * 60; // KST는 UTC+9
    const kstTime = new Date(now.getTime() + kstOffset * 60 * 1000);
    
    const baseDate = kstTime.toISOString().slice(0, 10).replace(/-/g, '');
    
    // 기상청 초단기실황 API는 매시 30분에 생성, 10분 후(40분)에 API로 조회 가능
    let baseHour = kstTime.getUTCHours();
    const baseMinute = kstTime.getUTCMinutes();
    
    // 현재 시각이 40분 이전이면 이전 시간대 데이터 사용
    if (baseMinute < 40) {
      baseHour = baseHour - 1;
      if (baseHour < 0) baseHour = 23;
    }
    
    const baseTime = String(baseHour).padStart(2, '0') + '00';
    console.log(`기준 시각: ${baseDate} ${baseTime}`);

    // 기상청 초단기실황 API 호출
    const apiUrl = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${encodeURIComponent(KMA_API_KEY)}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${grid.x}&ny=${grid.y}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('기상청 API 응답:', data.response.header);

    if (data.response.header.resultCode !== '00') {
      throw new Error(`기상청 API 오류: ${data.response.header.resultMsg}`);
    }

    const items = data.response.body.items.item;
    
    // T1H: 기온(℃), PTY: 강수형태, RN1: 1시간 강수량(mm)
    let temp = 20;
    let pty = 0; // 0:없음, 1:비, 2:비/눈, 3:눈, 4:소나기
    
    items.forEach(item => {
      if (item.category === 'T1H') temp = parseFloat(item.obsrValue);
      if (item.category === 'PTY') pty = parseInt(item.obsrValue);
    });

    console.log(`날씨 데이터: 기온=${temp}℃, 강수형태=${pty}`);

    // 날씨 상태 판단
    let condition = 'clear';
    let description = '맑음';

    if (pty > 0) {
      condition = 'rainy';
      if (pty === 1) description = '비';
      else if (pty === 2) description = '비/눈';
      else if (pty === 3) description = '눈';
      else if (pty === 4) description = '소나기';
    }

    // 온도에 따른 조정
    if (temp >= 28 && condition === 'clear') {
      condition = 'hot';
      description = '더운 날씨';
    } else if (temp <= 10 && condition !== 'rainy') {
      condition = 'cold';
      if (description === '맑음') description = '추운 날씨';
    }

    return NextResponse.json({
      condition,
      temp: Math.round(temp),
      description,
      isMock: false
    });

  } catch (error) {
    console.error('기상청 API 에러:', error);
    
    // 에러 발생 시 모의 데이터 반환
    return NextResponse.json({
      condition: 'clear',
      temp: 20,
      description: '맑음',
      isMock: true,
      error: error.message
    });
  }
}
