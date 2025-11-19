# 🌤️ 한국 기상청 API 연동 가이드

## 🇰🇷 공공데이터포털 기상청 API (완전 무료!)

### 장점
- ✅ **완전 무료** (호출 제한 거의 없음)
- ✅ **한국 기상청 공식 데이터**
- ✅ **정확한 한국 날씨 정보**
- ✅ **초단기실황, 초단기예보, 단기예보 지원**

### OpenWeatherMap vs 기상청 API 비교

| 항목 | OpenWeatherMap | 기상청 API |
|------|----------------|-----------|
| 무료 한도 | 1,000건/일 | 거의 무제한 |
| 데이터 정확도 | 글로벌 | 한국에 최적화 |
| 사용 난이도 | 쉬움 | 중간 |
| 응답 속도 | 빠름 | 보통 |

---

## 📋 기상청 API 발급 방법

### 1단계: 공공데이터포털 회원가입
1. https://www.data.go.kr 접속
2. 회원가입 (본인인증 필요)
3. 로그인

### 2단계: API 신청
1. 검색창에 **"단기예보"** 검색
2. "기상청_단기예보 ((구)_동네예보) 조회서비스" 선택
3. **"활용신청"** 클릭
4. 활용목적 입력 (예: 점심 메뉴 추천 웹사이트)
5. 신청 완료

### 3단계: 승인 대기 (1~2시간)
- 이메일로 승인 통보
- "마이페이지" → "오픈API" → "개발계정 상세보기"에서 **서비스키** 확인

---

## 🔧 기상청 API 코드 구현

### `/api/weather/route.js` 수정

\`\`\`javascript
import { NextResponse } from 'next/server';

// 위경도 → 기상청 격자 변환 함수
function convertToGrid(lat, lon) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 43;
  const YO = 136;

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
    const API_KEY = process.env.NEXT_PUBLIC_KMA_API_KEY; // 기상청 API 키

    if (!API_KEY) {
      return NextResponse.json({
        condition: 'clear',
        temp: 20,
        description: '맑음',
        isMock: true
      });
    }

    // 위경도를 기상청 격자로 변환
    const grid = convertToGrid(lat, lon);

    // 현재 시간 기준으로 발표 시각 계산
    const now = new Date();
    const baseDate = now.toISOString().slice(0, 10).replace(/-/g, '');
    
    // 기상청 API는 매시 40분에 발표 (매시간 10분 이후 데이터 사용 가능)
    let baseTime = String(now.getHours()).padStart(2, '0') + '00';
    if (now.getMinutes() < 40) {
      // 아직 발표 전이면 이전 시간대 사용
      const prevHour = now.getHours() - 1;
      baseTime = String(prevHour < 0 ? 23 : prevHour).padStart(2, '0') + '00';
    }

    // 초단기실황 API 호출
    const apiUrl = \`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=\${API_KEY}&numOfRows=10&pageNo=1&dataType=JSON&base_date=\${baseDate}&base_time=\${baseTime}&nx=\${grid.x}&ny=\${grid.y}\`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.response.header.resultCode !== '00') {
      throw new Error('기상청 API 호출 실패');
    }

    const items = data.response.body.items.item;
    
    // T1H: 기온, PTY: 강수형태, SKY: 하늘상태
    let temp = 20;
    let pty = 0; // 0:없음, 1:비, 2:비/눈, 3:눈
    let sky = 1; // 1:맑음, 3:구름많음, 4:흐림

    items.forEach(item => {
      if (item.category === 'T1H') temp = parseFloat(item.obsrValue);
      if (item.category === 'PTY') pty = parseInt(item.obsrValue);
      if (item.category === 'SKY') sky = parseInt(item.obsrValue);
    });

    // 날씨 상태 판단
    let condition = 'clear';
    let description = '맑음';

    if (pty > 0) {
      condition = 'rainy';
      description = pty === 1 ? '비' : pty === 3 ? '눈' : '진눈깨비';
    } else if (sky === 4) {
      condition = 'cloudy';
      description = '흐림';
    } else if (sky === 3) {
      condition = 'cloudy';
      description = '구름많음';
    }

    // 온도에 따른 조정
    if (temp >= 28 && condition === 'clear') {
      condition = 'hot';
      description = '더운 날씨';
    } else if (temp <= 10) {
      condition = 'cold';
      description = '추운 날씨';
    }

    return NextResponse.json({
      condition,
      temp: Math.round(temp),
      description,
      isMock: false
    });

  } catch (error) {
    console.error('기상청 API 에러:', error);
    
    return NextResponse.json({
      condition: 'clear',
      temp: 20,
      description: '맑음',
      isMock: true,
      error: error.message
    });
  }
}
\`\`\`

---

## 🔑 환경변수 설정

\`.env.local\` 파일에 추가:

\`\`\`env
# 기상청 API (공공데이터포털)
NEXT_PUBLIC_KMA_API_KEY=발급받은_서비스키_입력

# 기존 OpenWeatherMap (백업용)
NEXT_PUBLIC_WEATHER_API_KEY=발급받은_API_키_입력
\`\`\`

---

## 💡 추천 방식

### 옵션 1: 기상청 API만 사용 (추천!)
- 완전 무료
- 한국 날씨에 정확
- 호출 제한 걱정 없음

### 옵션 2: OpenWeatherMap + 기상청 혼용
- OpenWeatherMap을 우선 사용 (빠름)
- 에러 발생 시 기상청 API로 fallback
- 글로벌 서비스 확장 시 유리

---

## ⚠️ 주의사항

1. **발표 시각 확인**
   - 초단기실황: 매시간 40분 발표
   - 10분 정도 지연될 수 있음

2. **격자 좌표 변환 필수**
   - 위경도를 기상청 격자(nx, ny)로 변환 필요
   - 위 코드의 \`convertToGrid\` 함수 사용

3. **API 응답 시간**
   - OpenWeatherMap보다 느릴 수 있음
   - 캐싱 추천 (같은 지역은 1시간 동안 재사용)

---

## 🚀 적용 방법

1. 공공데이터포털에서 API 키 발급
2. \`.env.local\`에 키 추가
3. \`/api/weather/route.js\` 파일 교체
4. 서버 재시작 (\`npm run dev\`)

---

## 📊 데이터 종류

| API | 업데이트 주기 | 예보 기간 | 용도 |
|-----|-------------|----------|------|
| 초단기실황 | 매시간 | 현재 | **현재 날씨** (추천!) |
| 초단기예보 | 매시간 | 6시간 | 단기 예보 |
| 단기예보 | 1일 8회 | 3일 | 주간 예보 |

현재 프로젝트는 **초단기실황**만 있으면 충분합니다!

---

필요하시면 기상청 API로 변경한 파일을 만들어드릴게요! 😊
