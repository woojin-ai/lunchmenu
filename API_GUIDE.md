# 🔑 API 연동 가이드

## 📋 필요한 API 키

### 1. OpenWeatherMap API (날씨 정보) - **무료**
**발급 방법:**
1. https://openweathermap.org/api 접속
2. "Sign Up" 클릭해서 계정 생성
3. 이메일 인증 완료
4. API Keys 메뉴에서 키 복사

**사용 플랜:** Free (하루 1,000번 호출 무료)

---

### 2. 카카오 로컬 API (근처 가게 검색) - **무료**
**발급 방법:**
1. https://developers.kakao.com/ 접속
2. 로그인 (카카오 계정 필요)
3. "내 애플리케이션" 클릭
4. "애플리케이션 추가하기" 클릭
5. 앱 이름 입력 후 저장
6. 생성된 앱 클릭 → "앱 키" 탭
7. **"REST API 키"** 복사

**주의사항:** 
- JavaScript 키가 아니라 **REST API 키**를 사용해야 합니다!
- 플랫폼 등록 필요 없음 (서버에서 호출)

---

### 3. Google OAuth (구글 로그인) - **무료**
**발급 방법:**
1. https://console.cloud.google.com/ 접속
2. 프로젝트 생성
3. "API 및 서비스" → "사용자 인증 정보"
4. "사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
5. 애플리케이션 유형: **웹 애플리케이션**
6. 승인된 리디렉션 URI 추가:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.vercel.app/api/auth/callback/google`
7. 클라이언트 ID와 클라이언트 보안 비밀번호 복사

---

### 4. Naver OAuth (네이버 로그인) - **무료**
**발급 방법:**
1. https://developers.naver.com/apps/#/register 접속
2. 애플리케이션 이름 입력
3. 사용 API: **네이버 로그인** 선택
4. 서비스 URL: `http://localhost:3000`
5. Callback URL: `http://localhost:3000/api/auth/callback/naver`
6. 등록 완료 후 Client ID와 Client Secret 복사

---

## 🔧 API 키 설정 방법

### Step 1: `.env.local` 파일 생성

프로젝트 루트(E:/lunchmenu/)에 `.env.local` 파일을 생성하고 아래 내용을 붙여넣으세요:

```env
# 날씨 API (OpenWeatherMap)
NEXT_PUBLIC_WEATHER_API_KEY=여기에_발급받은_API_키_붙여넣기

# 카카오 로컬 API (가게 검색)
NEXT_PUBLIC_KAKAO_MAP_API_KEY=여기에_발급받은_REST_API_키_붙여넣기

# Google OAuth (로그인)
GOOGLE_CLIENT_ID=여기에_구글_클라이언트_ID_붙여넣기
GOOGLE_CLIENT_SECRET=여기에_구글_클라이언트_시크릿_붙여넣기

# Naver OAuth (로그인)
NAVER_CLIENT_ID=여기에_네이버_클라이언트_ID_붙여넣기
NAVER_CLIENT_SECRET=여기에_네이버_클라이언트_시크릿_붙여넣기

# NextAuth 설정
NEXTAUTH_SECRET=랜덤한_긴_문자열_아무거나_입력
NEXTAUTH_URL=http://localhost:3000
```

### Step 2: API 키 입력 예시

```env
# 실제 사용 예시 (이건 예시라 작동 안됨)
NEXT_PUBLIC_WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
NEXT_PUBLIC_KAKAO_MAP_API_KEY=1234567890abcdefghijklmnopqrstuvwxyz
GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
NAVER_CLIENT_ID=AbCdEfGhIj
NAVER_CLIENT_SECRET=KlMnOpQrSt
NEXTAUTH_SECRET=this-is-a-super-secret-key-please-change-this-to-random-string
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 적용 및 확인

### 1. 개발 서버 재시작
API 키를 추가한 후 **반드시 서버를 재시작**해야 합니다:

```bash
# Ctrl+C로 서버 중지
npm run dev
```

### 2. 작동 확인

**날씨 API 확인:**
- 브라우저 개발자 도구(F12) → Console 탭
- 에러 없이 날씨 온도가 표시되는지 확인

**카카오 API 확인:**
- 메뉴 추천 후 "근처 가게 찾기" 클릭
- 실제 가게 목록이 표시되는지 확인

---

## ⚠️ 주의사항

### 1. API 키는 절대 GitHub에 올리지 마세요!
`.env.local` 파일은 `.gitignore`에 자동으로 추가되어 있지만, 실수로 커밋하지 않도록 주의하세요.

### 2. Vercel 배포 시
Vercel 대시보드에서도 환경변수를 따로 설정해야 합니다:
1. Vercel 프로젝트 설정
2. Settings → Environment Variables
3. 각 변수 이름과 값 입력
4. Production, Preview, Development 모두 체크
5. 재배포

### 3. NEXTAUTH_SECRET 생성
랜덤한 문자열이 필요하면 아래 명령어 사용:

```bash
# Node.js로 랜덤 문자열 생성
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🎯 우선순위

**바로 적용해도 되는 것:**
1. ✅ **날씨 API** - 무료이고 바로 사용 가능
2. ✅ **카카오 로컬 API** - 무료이고 승인 필요 없음

**나중에 해도 되는 것:**
3. 🔄 Google/Naver 로그인 - 로그인 기능 구현 시

---

## 📞 도움이 필요하면

API 키 발급 중 막히면:
1. 어느 단계에서 막혔는지
2. 어떤 에러가 나는지
3. 스크린샷

위 정보를 공유해주시면 바로 해결해드릴게요!

---

## 💡 테스트용 임시 데이터

API 키가 없어도 **모의 데이터로 작동**합니다:
- 날씨: 기본값 (맑음, 20°C)
- 가게 검색: 샘플 가게 5개 표시

나중에 API 키를 받아서 적용하면 실제 데이터로 자동 전환됩니다! 🎉
