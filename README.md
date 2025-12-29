# 기억책방 (Gieok Library) 📖

> 시니어를 위한 AI 자서전 및 디지털 유산 플랫폼

당신의 소중한 이야기를 아름다운 책으로 남겨드립니다.

---

## 📌 프로젝트 소개

**기억책방**은 60대 초반 건강한 시니어를 위한 생애 기록 플랫폼입니다. AI 음성 인터뷰를 통해 쉽고 편하게 자서전을 작성하고, 디지털 유산을 안전하게 보관할 수 있습니다.

### 핵심 기능

- 🎙️ **AI 음성 자서전**: AI의 질문에 답하며 음성으로 이야기를 녹음
- 🎬 **영상 편지 타임캡슐**: 미래에 전달할 영상 메시지 보관
- 🤝 **동네 친구 매칭**: 같은 지역 시니어와의 만남 주선
- 💼 **50+ 경력 매칭**: 시니어 전문가와 도움이 필요한 사용자 연결
- 🔐 **디지털 금고**: 중요한 문서와 정보를 안전하게 보관

---

## 🚀 빠른 시작

### 필수 요구사항

- **Node.js** 20.0.0 이상
- **npm** 10.0.0 이상
- **Supabase 계정** (무료 플랜 가능)
- **OpenAI API 키** (Whisper 및 GPT-4o 사용)

### 설치 및 실행

#### 1. 저장소 클론

```bash
git clone https://github.com/your-username/gieoklibrary.git
cd gieoklibrary
```

#### 2. 의존성 설치

```bash
npm install
```

#### 3. 환경 변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 파일을 생성합니다.

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열어 실제 값을 입력합니다:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

#### 5. (선택) 데이터베이스 스키마 적용

Supabase Dashboard의 SQL Editor에서 `docs/databasedesign.md`에 정의된 SQL을 실행합니다.

---

## 🛠️ 기술 스택

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

### Backend & Database
- **Supabase** (PostgreSQL + Auth + Storage + Realtime)
- **Row Level Security (RLS)**

### AI & External Services
- **OpenAI Whisper API** (음성 → 텍스트 변환)
- **OpenAI GPT-4o** (텍스트 정리 및 요약)
- **토스페이먼츠** (결제)
- **카카오맵 API** (지도)

### UI Components
- **Radix UI** (접근성 우선 headless 컴포넌트)
- **Lucide React** (아이콘)
- **CVA** (Class Variance Authority)
- **Tailwind Merge** (클래스 병합)

## 📁 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # 인증 라우트 그룹
│   ├── (main)/           # 메인 앱 라우트 그룹
│   └── api/              # API Routes
├── components/           # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── features/         # 기능별 컴포넌트
│   └── layout/           # 레이아웃 컴포넌트
├── lib/                  # 유틸리티 및 라이브러리
│   ├── supabase/         # Supabase 클라이언트
│   ├── utils.ts          # 공통 유틸리티
│   └── constants.ts      # 상수 정의
├── types/                # TypeScript 타입 정의
└── hooks/                # 커스텀 React Hooks
```

## 📜 사용 가능한 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit

# 코드 포맷팅 (Prettier)
npx prettier --write .
```

---

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary (주황색)**: `#F97316` - 따뜻함과 위로
- **Secondary (갈색)**: `#78716C` - 전통과 신뢰
- **Accent (베이지)**: `#F59E0B` - 따뜻한 중성색

### 타이포그래피

- **폰트**: Pretendard Variable
- **기본 크기**: 18px (시니어 친화적)
- **최소 터치 영역**: 44x44px (WCAG AAA 기준)

자세한 내용은 [docs/design.md](docs/design.md)를 참조하세요.

## 📚 문서

- [PRD (기능 명세서)](docs/prd.md)
- [TRD (기술 요구사항)](docs/trd.md)
- [Design System](docs/design.md)
- [Database Design](docs/databasedesign.md)
- [Coding Convention](docs/codingconvention.md)
- [Tasks](docs/tasks.md)

---

## 🔒 보안

- **환경 변수**: `.env.local` 파일은 절대 Git에 커밋하지 마세요.
- **Supabase RLS**: 모든 테이블에 Row Level Security 활성화
- **API 키 보호**: 서버 전용 키(`OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)는 클라이언트에 노출하지 마세요.

---

## 📈 개발 로드맵

- [x] **M0**: 프로젝트 초기화 및 기술 스택 설정
- [x] **M1**: 핵심 UI 및 디자인 시스템 구축
- [ ] **M2**: 인증 및 사용자 관리
- [ ] **M3**: 핵심 기능 개발 (자서전, 금고, 커뮤니티)
- [ ] **M4**: 외부 서비스 연동 (OpenAI, 결제, 카카오맵)
- [ ] **M5**: 테스트 및 배포

자세한 진행 상황은 [docs/tasks.md](docs/tasks.md)를 참조하세요.

---

## 🤝 기여하기

기여는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 커밋 메시지 규칙

```
<type>(<scope>): <subject>

feat(auth): 카카오 소셜 로그인 추가
fix(biography): 녹음 중단 시 오류 수정
docs(readme): 설치 가이드 업데이트
```

---

## 📄 라이선스

Private - All rights reserved

---

**Made with ❤️ for Seniors**
