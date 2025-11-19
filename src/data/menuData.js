// 점심 메뉴 데이터 (배달의민족 카테고리 참조)
export const menuCategories = {
  korean: {
    id: 'korean',
    name: '한식',
    emoji: '🍚',
    description: '정갈한 한식으로 든든하게',
    menus: [
      { name: '김치찌개', tags: ['국물', '따뜻한', '매운맛'], weather: ['cold', 'rainy'] },
      { name: '된장찌개', tags: ['국물', '따뜻한', '구수한'], weather: ['cold', 'rainy'] },
      { name: '제육볶음', tags: ['매운맛', '고기', '든든한'], weather: ['all'] },
      { name: '불고기', tags: ['고기', '달콤한', '든든한'], weather: ['all'] },
      { name: '비빔밥', tags: ['건강식', '채소', '든든한'], weather: ['all'] },
      { name: '삼겹살', tags: ['고기', '구이', '든든한'], weather: ['all'] },
      { name: '갈비탕', tags: ['국물', '따뜻한', '든든한'], weather: ['cold', 'rainy'] },
      { name: '냉면', tags: ['시원한', '면', '국물'], weather: ['hot'] },
      { name: '순대국', tags: ['국물', '따뜻한', '든든한'], weather: ['cold', 'rainy'] },
      { name: '설렁탕', tags: ['국물', '따뜻한', '든든한'], weather: ['cold', 'rainy'] },
      { name: '칼국수', tags: ['면', '국물', '따뜻한'], weather: ['cold', 'rainy'] },
      { name: '부대찌개', tags: ['국물', '매운맛', '든든한'], weather: ['cold', 'rainy'] },
      { name: '삼계탕', tags: ['국물', '보양식', '따뜻한'], weather: ['hot', 'cold'] },
      { name: '떡볶이', tags: ['분식', '매운맛', '간식'], weather: ['all'] },
      { name: '김밥', tags: ['분식', '간편한', '가벼운'], weather: ['all'] },
    ]
  },
  chinese: {
    id: 'chinese',
    name: '중식',
    emoji: '🥟',
    description: '풍미 가득한 중화요리',
    menus: [
      { name: '짜장면', tags: ['면', '달콤한', '든든한'], weather: ['all'] },
      { name: '짬뽕', tags: ['면', '국물', '매운맛'], weather: ['cold', 'rainy'] },
      { name: '탕수육', tags: ['고기', '달콤한', '바삭한'], weather: ['all'] },
      { name: '깐풍기', tags: ['고기', '매운맛', '바삭한'], weather: ['all'] },
      { name: '마파두부', tags: ['두부', '매운맛', '든든한'], weather: ['all'] },
      { name: '양장피', tags: ['해산물', '새콤한', '시원한'], weather: ['hot'] },
      { name: '유산슬', tags: ['해산물', '채소', '건강식'], weather: ['all'] },
      { name: '볶음밥', tags: ['밥', '든든한', '간편한'], weather: ['all'] },
      { name: '고추잡채', tags: ['면', '매운맛', '든든한'], weather: ['all'] },
      { name: '꿔바로우', tags: ['고기', '달콤한', '바삭한'], weather: ['all'] },
    ]
  },
  japanese: {
    id: 'japanese',
    name: '일식',
    emoji: '🍱',
    description: '정갈한 일본 요리',
    menus: [
      { name: '초밥', tags: ['생선', '신선한', '가벼운'], weather: ['all'] },
      { name: '라멘', tags: ['면', '국물', '따뜻한'], weather: ['cold', 'rainy'] },
      { name: '돈카츠', tags: ['고기', '바삭한', '든든한'], weather: ['all'] },
      { name: '우동', tags: ['면', '국물', '따뜻한'], weather: ['cold', 'rainy'] },
      { name: '텐동', tags: ['튀김', '바삭한', '든든한'], weather: ['all'] },
      { name: '규동', tags: ['소고기', '밥', '든든한'], weather: ['all'] },
      { name: '오야코동', tags: ['닭고기', '밥', '든든한'], weather: ['all'] },
      { name: '회덮밥', tags: ['생선', '신선한', '든든한'], weather: ['hot'] },
      { name: '소바', tags: ['면', '시원한', '가벼운'], weather: ['hot'] },
      { name: '야키니쿠', tags: ['고기', '구이', '든든한'], weather: ['all'] },
    ]
  },
  western: {
    id: 'western',
    name: '양식',
    emoji: '🍝',
    description: '서양의 맛있는 요리',
    menus: [
      { name: '파스타', tags: ['면', '든든한', '크림/토마토'], weather: ['all'] },
      { name: '피자', tags: ['치즈', '든든한', '간편한'], weather: ['all'] },
      { name: '스테이크', tags: ['소고기', '고급', '든든한'], weather: ['all'] },
      { name: '리조또', tags: ['밥', '크림', '든든한'], weather: ['all'] },
      { name: '햄버거', tags: ['패스트푸드', '든든한', '간편한'], weather: ['all'] },
      { name: '샌드위치', tags: ['빵', '가벼운', '간편한'], weather: ['all'] },
      { name: '샐러드', tags: ['채소', '건강식', '가벼운'], weather: ['hot'] },
      { name: '그라탕', tags: ['치즈', '따뜻한', '든든한'], weather: ['cold'] },
      { name: '오믈렛', tags: ['계란', '가벼운', '든든한'], weather: ['all'] },
      { name: '수프', tags: ['국물', '따뜻한', '가벼운'], weather: ['cold', 'rainy'] },
    ]
  },
  asian: {
    id: 'asian',
    name: '아시안',
    emoji: '🍜',
    description: '동남아의 이국적인 맛',
    menus: [
      { name: '쌀국수', tags: ['면', '국물', '가벼운'], weather: ['hot', 'rainy'] },
      { name: '팟타이', tags: ['면', '새콤달콤', '든든한'], weather: ['all'] },
      { name: '분짜', tags: ['면', '국물', '가벼운'], weather: ['hot'] },
      { name: '월남쌈', tags: ['쌈', '신선한', '가벼운'], weather: ['hot'] },
      { name: '카레', tags: ['밥', '매운맛', '든든한'], weather: ['cold', 'rainy'] },
      { name: '똠얌꿍', tags: ['국물', '매운맛', '새콤한'], weather: ['all'] },
      { name: '팟카팽', tags: ['고기', '매운맛', '든든한'], weather: ['all'] },
      { name: '볶음쌀국수', tags: ['면', '든든한', '매운맛'], weather: ['all'] },
    ]
  },
  chicken: {
    id: 'chicken',
    name: '치킨',
    emoji: '🍗',
    description: '바삭바삭 치킨',
    menus: [
      { name: '후라이드치킨', tags: ['튀김', '바삭한', '든든한'], weather: ['all'] },
      { name: '양념치킨', tags: ['튀김', '달콤매콤', '든든한'], weather: ['all'] },
      { name: '반반치킨', tags: ['튀김', '바삭한', '든든한'], weather: ['all'] },
      { name: '간장치킨', tags: ['튀김', '달콤한', '든든한'], weather: ['all'] },
      { name: '파닭', tags: ['튀김', '파향', '든든한'], weather: ['all'] },
      { name: '뿌링클', tags: ['튀김', '달콤한', '든든한'], weather: ['all'] },
    ]
  },
  fastfood: {
    id: 'fastfood',
    name: '패스트푸드',
    emoji: '🍔',
    description: '빠르고 간편하게',
    menus: [
      { name: '햄버거', tags: ['패스트푸드', '든든한', '간편한'], weather: ['all'] },
      { name: '피자', tags: ['치즈', '든든한', '간편한'], weather: ['all'] },
      { name: '샌드위치', tags: ['빵', '가벼운', '간편한'], weather: ['all'] },
      { name: '핫도그', tags: ['빵', '간편한', '든든한'], weather: ['all'] },
      { name: '버거킹', tags: ['패스트푸드', '든든한', '간편한'], weather: ['all'] },
    ]
  },
  cafe: {
    id: 'cafe',
    name: '카페/디저트',
    emoji: '☕',
    description: '달콤한 디저트와 커피',
    menus: [
      { name: '브런치', tags: ['가벼운', '건강식', '여유'], weather: ['all'] },
      { name: '샐러드', tags: ['채소', '건강식', '가벼운'], weather: ['hot'] },
      { name: '샌드위치', tags: ['빵', '가벼운', '간편한'], weather: ['all'] },
      { name: '베이글', tags: ['빵', '가벼운', '간편한'], weather: ['all'] },
      { name: '와플', tags: ['디저트', '달콤한', '가벼운'], weather: ['all'] },
      { name: '파니니', tags: ['빵', '따뜻한', '간편한'], weather: ['all'] },
    ]
  },
  bunsik: {
    id: 'bunsik',
    name: '분식',
    emoji: '🍢',
    description: '한국식 간식',
    menus: [
      { name: '떡볶이', tags: ['분식', '매운맛', '간식'], weather: ['all'] },
      { name: '김밥', tags: ['분식', '간편한', '가벼운'], weather: ['all'] },
      { name: '순대', tags: ['분식', '든든한', '간식'], weather: ['cold'] },
      { name: '튀김', tags: ['분식', '바삭한', '간식'], weather: ['all'] },
      { name: '라면', tags: ['면', '국물', '간편한'], weather: ['cold', 'rainy'] },
      { name: '우동', tags: ['면', '국물', '따뜻한'], weather: ['cold', 'rainy'] },
    ]
  },
  meat: {
    id: 'meat',
    name: '고기/구이',
    emoji: '🥩',
    description: '든든한 고기 한상',
    menus: [
      { name: '삼겹살', tags: ['고기', '구이', '든든한'], weather: ['all'] },
      { name: '목살', tags: ['고기', '구이', '든든한'], weather: ['all'] },
      { name: '갈비', tags: ['고기', '구이', '든든한'], weather: ['all'] },
      { name: '양념갈비', tags: ['고기', '구이', '달콤한'], weather: ['all'] },
      { name: '소갈비', tags: ['고기', '구이', '고급'], weather: ['all'] },
      { name: '돼지갈비', tags: ['고기', '구이', '든든한'], weather: ['all'] },
      { name: '닭갈비', tags: ['고기', '매운맛', '든든한'], weather: ['all'] },
      { name: '곱창', tags: ['고기', '구이', '든든한'], weather: ['all'] },
    ]
  }
};

// 날씨에 따른 추천 가중치
export const weatherRecommendations = {
  hot: ['cold', 'refreshing', 'light'],
  cold: ['warm', 'soup', 'hearty'],
  rainy: ['warm', 'soup', 'comfort'],
  cloudy: ['all'],
  clear: ['all']
};

// 상황별 메뉴 추천
export const situationalMenus = {
  newbie: {
    id: 'newbie',
    name: '신입 환영',
    emoji: '🎉',
    description: '신입과 함께 먹기 좋은 메뉴',
    menus: ['삼겹살', '치킨', '피자', '곱창', '초밥', '스테이크', '닭갈비', '족발']
  },
  sad: {
    id: 'sad',
    name: '우울할 때',
    emoji: '😢',
    description: '기분 전환이 필요할 때',
    menus: ['짬뽕', '라멘', '부대찌개', '마라탕', '떡볶이', '김치찌개', '매운갈비천', '깐풍기']
  },
  noappetite: {
    id: 'noappetite',
    name: '입맛 없을 때',
    emoji: '😐',
    description: '가볍게 먹기 좋은 메뉴',
    menus: ['냉면', '쌌국수', '소바', '샐러드', '월남쌌', '회덮밥', '샌드위치', '죽']
  },
  company: {
    id: 'company',
    name: '회식 메뉴',
    emoji: '🍺',
    description: '팀원들과 함께',
    menus: ['삼겹살', '곱창', '닭갈비', '초밥', '회', '족발', '보쌌', '갈비']
  },
  overtime: {
    id: 'overtime',
    name: '야근 전',
    emoji: '💪',
    description: '든든하게 채우기',
    menus: ['제육볶음', '돈카츠', '스테이크', '불고기', '탕수육', '규동', '햄버거', '파스타']
  },
  date: {
    id: 'date',
    name: '데이트',
    emoji: '💕',
    description: '분위기 있는 메뉴',
    menus: ['파스타', '스테이크', '초밥', '리조또', '피자', '오뭈렛', '샐러드', '브런치']
  },
  alone: {
    id: 'alone',
    name: '혼밥',
    emoji: '🙋',
    description: '혼자 먹기 편한 메뉴',
    menus: ['김밥', '라멘', '덮밥', '짜장면', '김치찌개', '냉면', '우동', '샌드위치']
  },
  diet: {
    id: 'diet',
    name: '다이어트',
    emoji: '🥗',
    description: '가볍고 건강하게',
    menus: ['샐러드', '회덮밥', '소바', '쌌국수', '월남쌌', '샌드위치', '두부', '닭가슴살']
  }
};

// 메뉴 추천 로직
export function getRecommendedMenu(category, weather = 'all', excludeMenus = []) {
  const categoryData = menuCategories[category];
  if (!categoryData) return null;

  let availableMenus = categoryData.menus.filter(
    menu => !excludeMenus.includes(menu.name)
  );

  // 날씨에 맞는 메뉴 필터링
  if (weather !== 'all') {
    const weatherMenus = availableMenus.filter(
      menu => menu.weather.includes(weather) || menu.weather.includes('all')
    );
    if (weatherMenus.length > 0) {
      availableMenus = weatherMenus;
    }
  }

  // 랜덤 추천
  const randomIndex = Math.floor(Math.random() * availableMenus.length);
  return availableMenus[randomIndex];
}

// 모든 카테고리에서 랜덤 메뉴 추천
export function getRandomMenu(weather = 'all', excludeMenus = []) {
  const categories = Object.keys(menuCategories);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return {
    category: menuCategories[randomCategory],
    menu: getRecommendedMenu(randomCategory, weather, excludeMenus)
  };
}

// 상황별 메뉴 추천
export function getSituationalMenu(situationId, weather = 'all', excludeMenus = []) {
  const situation = situationalMenus[situationId];
  if (!situation) return null;

  // 상황에 맞는 메뉴 중에서 제외할 메뉴 제거
  let availableMenus = situation.menus.filter(menuName => !excludeMenus.includes(menuName));
  
  if (availableMenus.length === 0) {
    availableMenus = situation.menus; // 모두 제외되면 전체에서 추천
  }

  // 모든 카테고리에서 해당 메뉴 찾기
  let foundMenu = null;
  let foundCategory = null;

  for (const categoryKey of Object.keys(menuCategories)) {
    const category = menuCategories[categoryKey];
    const menu = category.menus.find(m => availableMenus.includes(m.name));
    
    if (menu) {
      // 날씨 조건 확인
      if (weather === 'all' || menu.weather.includes(weather) || menu.weather.includes('all')) {
        foundMenu = menu;
        foundCategory = category;
        break;
      }
    }
  }

  // 찾지 못했으면 날씨 조건 무시하고 다시 찾기
  if (!foundMenu) {
    for (const categoryKey of Object.keys(menuCategories)) {
      const category = menuCategories[categoryKey];
      const menu = category.menus.find(m => availableMenus.includes(m.name));
      
      if (menu) {
        foundMenu = menu;
        foundCategory = category;
        break;
      }
    }
  }

  return foundMenu ? {
    category: foundCategory,
    menu: foundMenu,
    situation: situation
  } : null;
}

export default menuCategories;
