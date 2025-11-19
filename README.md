# 🍽️ 오늘 점심은 뭐먹을까?

매일 고민되는 점심 메뉴, 이제 AI가 추천해드립니다!

## 📋 주요 기능

### 현재 구현된 기능
- ✅ 카테고리별 메뉴 추천 (한식, 중식, 일식, 양식, 아시안, 치킨, 패스트푸드, 카페, 분식, 고기)
- ✅ 날씨 기반 메뉴 추천
- ✅ 이전 추천 히스토리 관리 (중복 방지)
- ✅ 반응형 디자인 (모바일/태블릿/데스크톱)
- ✅ 애니메이션 효과

### 🚧 개발 예정 기능
- [ ] 실제 날씨 API 연동 (OpenWeatherMap)
- [ ] 소셜 로그인 (Google, Naver)
- [ ] 사용자 위치 기반 근처 가게 추천
- [ ] 카카오맵/네이버지도 연동
- [ ] 가게 정보 (거리순, 별점순, 추천순)
- [ ] MBTI 사이트 연동
- [ ] 사주팔자 메뉴 추천
- [ ] 타로 메뉴 추천

## 🚀 시작하기

### 1. 프로젝트 설치

```bash
cd E:/lunchmenu
npm install
```

### 2. 환경변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 API 키를 입력하세요.

```bash
cp .env.example .env.local
```

필요한 API 키:
- **OpenWeatherMap API**: https://openweathermap.org/api (무료)
- **카카오맵 API**: https://developers.kakao.com/ (무료)
- **네이버 지도 API**: https://www.ncloud.com/product/applicationService/maps
- **Google OAuth**: https://console.cloud.google.com/
- **Naver OAuth**: https://developers.naver.com/

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 4. 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📦 Vercel 배포

### Vercel로 배포하기

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com) 접속 및 로그인
3. "New Project" 클릭
4. GitHub 레포지토리 선택
5. 환경변수 설정 (Settings → Environment Variables)
6. Deploy 클릭!

### 빠른 배포
```bash
npm install -g vercel
vercel
```

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **API**: OpenWeatherMap, Kakao Map, Naver Map
- **Deployment**: Vercel

## 📱 프로젝트 구조

```
lunchmenu/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.js       # 메인 페이지
│   │   ├── layout.js     # 레이아웃
│   │   └── globals.css   # 글로벌 스타일
│   ├── components/       # 재사용 컴포넌트
│   ├── data/            
│   │   └── menuData.js   # 메뉴 데이터
│   └── utils/
│       └── weather.js    # 날씨 유틸리티
├── public/               # 정적 파일
├── package.json
└── README.md
```

## 🎯 메뉴 카테고리

- 🍚 **한식**: 김치찌개, 된장찌개, 제육볶음, 불고기, 비빔밥 등
- 🥟 **중식**: 짜장면, 짬뽕, 탕수육, 깐풍기 등
- 🍱 **일식**: 초밥, 라멘, 돈카츠, 우동 등
- 🍝 **양식**: 파스타, 피자, 스테이크, 샐러드 등
- 🍜 **아시안**: 쌀국수, 팟타이, 카레, 똠얌꿍 등
- 🍗 **치킨**: 후라이드, 양념, 간장치킨 등
- 🍔 **패스트푸드**: 햄버거, 피자, 샌드위치 등
- ☕ **카페/디저트**: 브런치, 샐러드, 베이글 등
- 🍢 **분식**: 떡볶이, 김밥, 순대, 튀김 등
- 🥩 **고기/구이**: 삼겹살, 갈비, 곱창 등

## 🌟 향후 확장 계획

1. **MBTI 연동**: MBTI 성향별 메뉴 추천
2. **사주팔자**: 오늘의 운세에 맞는 메뉴
3. **타로 카드**: 타로로 알아보는 오늘의 메뉴
4. **음식 일기**: 먹은 음식 기록 및 통계
5. **친구 추천**: 친구들이 추천하는 맛집

## 📝 개발자 노트

### 날씨 API 연동 방법
```javascript
import { getWeatherByLocation, getUserLocation } from '@/utils/weather'

// 사용자 위치 가져오기
const location = await getUserLocation()

// 날씨 정보 가져오기
const weather = await getWeatherByLocation(location.lat, location.lon)
```

### 메뉴 추천 로직
```javascript
import { getRandomMenu, getRecommendedMenu } from '@/data/menuData'

// 랜덤 메뉴 추천
const menu = getRandomMenu(weather, excludeMenus)

// 특정 카테고리에서 추천
const menu = getRecommendedMenu('korean', weather, excludeMenus)
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

MIT License

## 📧 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요!

---

Made with ❤️ and 🍜
