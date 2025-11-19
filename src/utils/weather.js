// 날씨 API 유틸리티
// OpenWeatherMap API를 사용할 예정 (무료 플랜 사용 가능)

export async function getWeatherByLocation(lat, lon) {
  try {
    // 실제 사용 시 환경변수에 API 키를 저장하세요
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    if (!API_KEY) {
      console.warn('날씨 API 키가 설정되지 않았습니다.');
      return { condition: 'clear', temp: 20 };
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );
    
    const data = await response.json();
    
    // 날씨 상태를 우리 시스템에 맞게 변환
    const weatherCondition = mapWeatherCondition(data.weather[0].main);
    
    return {
      condition: weatherCondition,
      temp: Math.round(data.main.temp),
      description: data.weather[0].description
    };
  } catch (error) {
    console.error('날씨 정보를 가져오는데 실패했습니다:', error);
    return { condition: 'clear', temp: 20 };
  }
}

// OpenWeatherMap 날씨 코드를 우리 시스템으로 변환
function mapWeatherCondition(weatherMain) {
  const mapping = {
    'Clear': 'clear',
    'Clouds': 'cloudy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'rainy',
    'Snow': 'cold',
    'Mist': 'cloudy',
    'Smoke': 'cloudy',
    'Haze': 'cloudy',
    'Dust': 'cloudy',
    'Fog': 'cloudy',
    'Sand': 'cloudy',
    'Ash': 'cloudy',
    'Squall': 'rainy',
    'Tornado': 'rainy'
  };
  
  return mapping[weatherMain] || 'clear';
}

// 사용자 위치 가져오기
export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('브라우저가 위치 정보를 지원하지 않습니다.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

// 온도에 따른 날씨 상태 판단
export function getWeatherByTemperature(temp) {
  if (temp >= 28) return 'hot';
  if (temp <= 10) return 'cold';
  return 'clear';
}

export default {
  getWeatherByLocation,
  getUserLocation,
  getWeatherByTemperature
};
