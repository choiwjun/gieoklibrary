# 기억책방 (Memory Bookstore)

시니어를 위한 **생애 기록 및 디지털 유산 플랫폼**

## 🚀 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript 5+
- **스타일**: Tailwind CSS 4
- **백엔드**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI API (Whisper, GPT-4)

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

## 🛠 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`docs/env-setup.md` 파일을 참고하여 `.env.local` 파일을 생성하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인

### 4. 빌드

```bash
npm run build
```

## 📚 문서

- [PRD (기능 명세서)](docs/prd.md)
- [TRD (기술 요구사항)](docs/trd.md)
- [Design System](docs/design.md)
- [Database Design](docs/databasedesign.md)
- [Coding Convention](docs/codingconvention.md)
- [Tasks](docs/tasks.md)

## 🔧 개발 명령어

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 실행
npm run lint         # ESLint 실행
```

## 📄 라이선스

Private - All rights reserved
