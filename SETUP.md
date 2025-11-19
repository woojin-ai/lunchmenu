# 🚀 설치 및 실행 가이드

## 📋 사전 준비사항

- Node.js 18.17 이상 설치 필요
- npm 또는 yarn 패키지 매니저
- Git (선택사항)

## 📦 설치 방법

### 1단계: 디렉토리 이동
```bash
cd E:/lunchmenu
```

### 2단계: 패키지 설치
```bash
npm install
```

또는 yarn 사용 시:
```bash
yarn install
```

### 3단계: 환경변수 설정 (선택사항)

실제 API를 사용하려면 `.env.local` 파일을 생성하세요:

```bash
# .env.example 파일을 복사
copy .env.example .env.local
```

그리고 각 API 키를 입력하세요:

```env
# 날씨 API (선택사항)
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here

# 카카오맵 API (선택사항)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_api_key_here
```

**참고**: API 키 없이도 모의 데이터로 테스트 가능합니다!

## 🏃‍♂️ 실행 방법

### 개발 모드로 실행
```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 프로덕션 빌드
```bash
npm run build
npm start
```

## 🌐 Vercel 배포

### 방법 1: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel
```

### 방법 2: GitHub + Vercel 연동

1. GitHub에 프로젝트 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lunchmenu.git
git push -u origin main
```

2. [Vercel](https://vercel.com) 접속
3. "New Project" → GitHub 레포지토리 선택
4. 환경변수 설정 (Settings → Environment Variables)
5. Deploy 클릭!

## 🔧 문제 해결

### 포트가 이미 사용중인 경우
```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```

### 캐시 문제가 있는 경우
```bash
# .next 폴더 삭제 후 재실행
rm -rf .next
npm run dev
```

### 패키지 설치 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

## 📱 접속 확인

- **로컬**: http://localhost:3000
- **네트워크**: http://[컴퓨터IP]:3000
  - 같은 네트워크의 다른 기기에서 접속 가능

## 🎯 주요 기능 테스트

1. ✅ 카테고리 선택하고 메뉴 추천받기
2. ✅ 랜덤 메뉴 추천받기
3. ✅ 추천 히스토리 확인
4. ✅ 근처 가게 찾기 (모의 데이터)

## 📚 더 알아보기

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

문제가 발생하면 README.md 파일을 참고하거나 이슈를 등록해주세요!
