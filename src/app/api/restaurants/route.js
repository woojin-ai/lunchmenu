import { NextResponse } from 'next/server';

// 카카오 로컬 API를 사용한 근처 가게 검색
// https://developers.kakao.com/docs/latest/ko/local/dev-guide

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query'); // 검색할 메뉴명
  const lat = searchParams.get('lat'); // 위도
  const lon = searchParams.get('lon'); // 경도
  const radius = searchParams.get('radius') || '1000'; // 검색 반경 (미터)
  const sort = searchParams.get('sort') || 'distance'; // distance, accuracy

  if (!query || !lat || !lon) {
    return NextResponse.json(
      { error: '검색어, 위도, 경도가 필요합니다.' },
      { status: 400 }
    );
  }

  try {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    if (!KAKAO_API_KEY) {
      // API 키가 없을 경우 모의 데이터 반환
      return NextResponse.json({
        restaurants: getMockRestaurants(query),
        isMock: true
      });
    }

    // 카카오 로컬 API 호출
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&x=${lon}&y=${lat}&radius=${radius}&sort=${sort}`,
      {
        headers: {
          'Authorization': `KakaoAK ${KAKAO_API_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('가게 정보를 가져오는데 실패했습니다.');
    }

    const data = await response.json();

    // 데이터 포맷팅
    const restaurants = data.documents.map(place => ({
      id: place.id,
      name: place.place_name,
      address: place.address_name,
      roadAddress: place.road_address_name,
      phone: place.phone,
      distance: place.distance,
      placeUrl: place.place_url,
      category: place.category_name,
      lat: place.y,
      lon: place.x
      // Kakao API는 별점/리뷰 정보를 제공하지 않음
    }));

    return NextResponse.json({
      restaurants,
      totalCount: data.meta.total_count,
      isMock: false
    });

  } catch (error) {
    console.error('가게 검색 API 에러:', error);
    
    // 에러 발생 시 모의 데이터 반환
    return NextResponse.json({
      restaurants: getMockRestaurants(query),
      isMock: true,
      error: error.message
    });
  }
}

// 모의 데이터 생성 함수
function getMockRestaurants(query) {
  const mockData = [
    {
      id: '1',
      name: `${query} 맛집`,
      address: '서울시 강남구 역삼동 123-45',
      roadAddress: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      distance: '150',
      placeUrl: '#',
      category: '음식점 > 한식'
    },
    {
      id: '2',
      name: `맛있는 ${query}`,
      address: '서울시 강남구 역삼동 234-56',
      roadAddress: '서울시 강남구 테헤란로 234',
      phone: '02-2345-6789',
      distance: '280',
      placeUrl: '#',
      category: '음식점 > 한식'
    },
    {
      id: '3',
      name: `${query} 전문점`,
      address: '서울시 강남구 역삼동 345-67',
      roadAddress: '서울시 강남구 테헤란로 345',
      phone: '02-3456-7890',
      distance: '420',
      placeUrl: '#',
      category: '음식점 > 한식'
    },
    {
      id: '4',
      name: `옛날 ${query}`,
      address: '서울시 강남구 역삼동 456-78',
      roadAddress: '서울시 강남구 테헤란로 456',
      phone: '02-4567-8901',
      distance: '580',
      placeUrl: '#',
      category: '음식점 > 한식'
    },
    {
      id: '5',
      name: `${query} 하우스`,
      address: '서울시 강남구 역삼동 567-89',
      roadAddress: '서울시 강남구 테헤란로 567',
      phone: '02-5678-9012',
      distance: '750',
      placeUrl: '#',
      category: '음식점 > 한식'
    }
  ];

  return mockData;
}
