# TASKS (AI 개발 파트너용 프롬프트 설계서)

## 프로젝트: 기억책방 (Memory Bookstore)

**작성일**: 2025년 12월 29일

**버전**: v1.0

**목적**: AI 코딩 파트너가 즉시 협업을 시작할 수 있도록 구체화된 실행 가능한 개발 경로 제공

---

## 📌 문서 사용 가이드

### 이 문서의 목적

이 문서는 AI 개발 파트너(Claude, GPT 등)가 **기억책방** 프로젝트를 단계별로 구현할 수 있도록 설계된 자연어 기반 태스크 모음입니다. 각 태스크는 독립적으로 실행 가능하며, 관련 문서를 참조하여 컨텍스트를 제공합니다.

### 참조 문서

- **PRD**: 프로젝트 개요서
- **FRS Part 1 & 2**: 기능 명세서
- **TRD**: 기술 요구사항 정의서
- **DB Schema**: 데이터베이스 스키마
- **Design System**: 디자인 시스템
- **User Flow**: 사용자 흐름도

### 태스크 진행 방법

1. 각 마일스톤을 순차적으로 진행
2. 태스크 시작 전 참조 문서 섹션 확인
3. 인수 조건(AC)을 모두 충족해야 완료
4. 자가 수정 지침에 따라 코드 품질 검증

---

## 🎯 마일스톤 개요

`M0: 프로젝트 초기화 (1-2일)
 └─ 개발 환경, 기술 스택 설정, 폴더 구조

M1: 핵심 UI 및 디자인 시스템 (3-5일)
 └─ 컴포넌트 라이브러리, 레이아웃, 네비게이션

M2: 인증 및 사용자 관리 (2-3일)
 └─ Supabase Auth, 프로필 관리

M3: 핵심 기능 개발 - MVP (15-20일)
 ├─ FEAT-1: 생애 기록 (자서전)
 ├─ FEAT-2: 디지털 유산 (금고)
 └─ FEAT-3: 커뮤니티 (친구 찾기)

M4: 외부 서비스 연동 (5-7일)
 ├─ OpenAI API (음성→텍스트, AI 정리)
 ├─ 결제 (토스페이먼츠)
 └─ 카카오맵 API

M5: 테스트 및 배포 (3-5일)
 └─ 테스트, 최적화, 배포 파이프라인`

**총 예상 기간**: 30-45일

---

# M0: 프로젝트 초기화 및 기술 스택 설정

## [x] M0.1: Next.js 15 프로젝트 초기화

### 컨텍스트 및 목표

프로젝트의 기반이 되는 Next.js 15 프로젝트를 생성하고, TypeScript, Tailwind CSS, ESLint 등 기본 설정을 완료합니다.

**참조 문서**: TRD 섹션 3 (시스템 아키텍처), 섹션 2.1 (프론트엔드 기술 스택)

### 사용자 스토리

`개발자로서, 
일관된 코드 스타일과 타입 안정성을 갖춘 프로젝트를 시작하고 싶습니다.
그래서 모든 팀원이 동일한 개발 환경에서 작업할 수 있습니다.`

### 기술 명세

1. **Next.js 15 설치**

bash

   `npx create-next-app@latest kieokchaekbang --typescript --tailwind --app --src-dir
   cd kieokchaekbang`

1. **필수 패키지 설치**

bash

   `npm install @supabase/supabase-js @supabase/ssr
   npm install lucide-react
   npm install -D prettier prettier-plugin-tailwindcss`

1. **프로젝트 설정 파일 생성**
    - `tsconfig.json`: 경로 별칭 설정 (`@/*`)
    - `.prettierrc`: 코드 포맷팅 규칙
    - `.eslintrc.json`: 린트 규칙
    - `.env.local.example`: 환경 변수 템플릿
2. **폴더 구조 생성**

   `src/
   ├── app/              # Next.js 15 App Router
   │   ├── (auth)/       # 인증 관련 페이지
   │   ├── (main)/       # 메인 앱 페이지
   │   ├── api/          # API Routes
   │   └── layout.tsx
   ├── components/       # 재사용 컴포넌트
   │   ├── ui/           # 기본 UI 컴포넌트
   │   └── features/     # 기능별 컴포넌트
   ├── lib/              # 유틸리티 함수
   │   ├── supabase/     # Supabase 클라이언트
   │   └── utils.ts
   ├── types/            # TypeScript 타입 정의
   └── styles/           # 글로벌 스타일`

### 인수 조건 (Acceptance Criteria)

- [x]  `npm run dev`로 로컬 서버가 정상 실행됨
- [x]  TypeScript 에러 없이 컴파일됨
- [x]  Tailwind CSS가 정상 작동함
- [x]  ESLint, Prettier가 설정되어 코드 포맷팅이 자동으로 적용됨
- [x]  `.env.local.example` 파일에 필요한 환경 변수가 문서화됨
- [x]  `README.md`에 프로젝트 실행 방법이 기술됨

### 자가 수정 지침

- [x]  `package.json`의 모든 종속성이 최신 안정 버전인가?
- [x]  `.gitignore`에 `.env.local`, `node_modules` 등이 포함되었는가?
- [x]  폴더 구조가 TRD의 아키텍처와 일치하는가?

---

## [x] M0.2: Supabase 프로젝트 생성 및 연결

### 컨텍스트 및 목표

Supabase 클라우드에서 프로젝트를 생성하고, Next.js 앱과 연결하여 데이터베이스와 인증 기능을 사용할 수 있도록 설정합니다.

**참조 문서**: TRD 섹션 2.2 (백엔드 기술 스택), DB Schema 전체

### 사용자 스토리

`개발자로서,
Supabase를 통해 PostgreSQL 데이터베이스와 인증 시스템을 사용하고 싶습니다.
그래서 백엔드 인프라를 직접 관리하지 않고도 빠르게 개발할 수 있습니다.`

### 기술 명세

1. **Supabase 프로젝트 생성**
    - [https://supabase.com](https://supabase.com/) 에서 새 프로젝트 생성
    - 프로젝트명: `kieokchaekbang`
    - 리전: `Northeast Asia (Seoul)`
    - 데이터베이스 비밀번호 설정 및 안전하게 보관
2. **환경 변수 설정**

env

   `# .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://wnqlqmqhgvovefdgmjsi.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducWxxbXFoZ3ZvdmVmZGdtanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTM5NjQsImV4cCI6MjA4MjU2OTk2NH0.X71VIKl-FVH6qYh2R7F3oE_bzWdo5M8N7hNbV3F2t2k
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducWxxbXFoZ3ZvdmVmZGdtanNpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njk5Mzk2NCwiZXhwIjoyMDgyNTY5OTY0fQ.1O9bZOTFpVFGI-huLuop-_dqpNYoZCG9sFPTAd31ODs

1. **Supabase 클라이언트 생성**

typescript

   `// src/lib/supabase/client.ts
   import { createBrowserClient } from '@supabase/ssr'
   
   export function createClient() {
     return createBrowserClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     )
   }`

typescript

   `// src/lib/supabase/server.ts
   import { createServerClient } from '@supabase/ssr'
   import { cookies } from 'next/headers'
   
   export function createClient() {
     const cookieStore = cookies()
     
     return createServerClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
       {
         cookies: {
           get(name: string) {
             return cookieStore.get(name)?.value
           },
         },
       }
     )
   }`

1. **연결 테스트**
    - 간단한 API Route 생성하여 Supabase 연결 확인
    - `GET /api/health` 엔드포인트로 DB 상태 체크

### 인수 조건 (Acceptance Criteria)

- [x]  Supabase 프로젝트가 생성되고 활성화됨
- [x]  환경 변수가 올바르게 설정됨
- [x]  브라우저 클라이언트와 서버 클라이언트가 각각 생성됨
- [x]  `/api/health` 엔드포인트가 정상 응답함
- [x]  Supabase Studio에서 데이터베이스에 접근 가능함

### 자가 수정 지침

- [x]  환경 변수가 `.env.local.example`에도 문서화되었는가?
- [x]  Service Role Key는 서버 사이드에서만 사용되고 클라이언트에 노출되지 않는가?
- [x]  에러 핸들링이 적절히 구현되었는가?

---

## [x] M0.3: Tailwind CSS 및 디자인 시스템 설정

### 컨텍스트 및 목표

Design System 문서를 기반으로 Tailwind CSS를 커스터마이징하고, CSS 변수를 설정하여 일관된 디자인을 적용합니다.

**참조 문서**: Design System 전체, 특히 섹션 2 (색상), 3 (타이포그래피), 4 (간격)

### 사용자 스토리

`개발자로서,
디자인 시스템에 정의된 색상, 타이포그래피, 간격을 Tailwind에서 바로 사용하고 싶습니다.
그래서 매번 하드코딩하지 않고 일관된 스타일을 유지할 수 있습니다.`

### 기술 명세

1. **Pretendard 폰트 로드**

css

   `/* src/app/globals.css */
   @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');
   
   @tailwind base;
   @tailwind components;
   @tailwind utilities;`

1. **CSS 변수 정의**

css

   `:root {
     /* Primary Colors */
     --color-primary-50: #FFF7ED;
     --color-primary-500: #F97316;
     --color-primary-600: #EA580C;
     /* ... 나머지 색상 */
     
     /* Typography */
     --font-size-senior-default: 1.125rem;
     /* ... */
     
     /* Spacing */
     --spacing-4: 1rem;
     /* ... */
   }
   
   [data-theme="dark"] {
     /* 다크 모드 색상 오버라이드 */
   }`

1. **Tailwind Config 커스터마이징**

javascript

   `// tailwind.config.ts
   import type { Config } from 'tailwindcss'
   
   const config: Config = {
     content: [
       './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       extend: {
         colors: {
           primary: {
             50: '#FFF7ED',
             100: '#FFEDD5',
             200: '#FED7AA',
             300: '#FDBA74',
             400: '#FB923C',
             500: '#F97316',
             600: '#EA580C',
             700: '#C2410C',
             800: '#9A3412',
             900: '#7C2D12',
             950: '#431407',
           },
           secondary: {
             // ...
           },
           accent: {
             // ...
           },
         },
         fontFamily: {
           sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
         },
         fontSize: {
           'senior-default': '1.125rem',
         },
       },
     },
     plugins: [],
   }
   export default config`

### 인수 조건 (Acceptance Criteria)

- [ ]  Pretendard 폰트가 로드되고 적용됨
- [ ]  Tailwind에서 `bg-primary-500`, `text-secondary-600` 등 커스텀 색상 사용 가능
- [ ]  CSS 변수가 정의되어 `var(--color-primary-500)` 형태로 사용 가능
- [ ]  다크 모드 색상이 정의됨 (구현은 나중에)
- [ ]  반응형 브레이크포인트가 정상 작동함

### 자가 수정 지침

- [ ]  Design System의 모든 색상이 Tailwind Config에 반영되었는가?
- [ ]  폰트가 모든 브라우저에서 올바르게 렌더링되는가?
- [ ]  CSS 변수명이 일관된 네이밍 규칙을 따르는가?

---

## [x] M0.4: TypeScript 타입 정의

### 컨텍스트 및 목표

데이터베이스 스키마를 기반으로 TypeScript 타입을 정의하여 타입 안정성을 확보합니다.

**참조 문서**: DB Schema 섹션 4 (테이블 명세)

### 사용자 스토리

`개발자로서,
데이터베이스 테이블 구조와 일치하는 TypeScript 타입을 사용하고 싶습니다.
그래서 컴파일 타임에 데이터 구조 오류를 발견할 수 있습니다.`

### 기술 명세

1. **Database 타입 생성** (Supabase CLI 사용)

bash

   `npx supabase gen types typescript --project-id your-project-id > src/types/database.types.ts`

1. **공통 타입 정의**

typescript

   `// src/types/index.ts
   import { Database } from './database.types'
   
   // 테이블 타입 추출
   export type User = Database['public']['Tables']['user_profiles']['Row']
   export type BiographyProject = Database['public']['Tables']['biography_projects']['Row']
   export type BiographyChapter = Database['public']['Tables']['biography_chapters']['Row']
   export type VaultItem = Database['public']['Tables']['vault_items']['Row']
   
   // Insert 타입 (생성 시)
   export type UserInsert = Database['public']['Tables']['user_profiles']['Insert']
   export type BiographyProjectInsert = Database['public']['Tables']['biography_projects']['Insert']
   
   // Update 타입 (수정 시)
   export type UserUpdate = Database['public']['Tables']['user_profiles']['Update']
   
   // 커스텀 타입
   export type UserType = 'senior' | 'helper' | 'expert' | 'family'
   export type BiographyStatus = 'draft' | 'in_progress' | 'completed' | 'published'`

### 인수 조건 (Acceptance Criteria)

- [x]  `Database` 타입이 정의되어 Supabase 클라이언트에서 자동 완성됨
- [x]  `User`, `BiographyProject` 등 주요 비즈니스 엔티티 타입이 export됨
- [x]  API 응답 및 공통 Props를 위한 유틸리티 타입이 정의됨
- [x]  타입 정의 파일(`database.types.ts`)이 생성됨

### 자가 수정 지침

- [x]  `any` 타입 사용을 최소화했는가?
- [x]  null 처리가 올바르게 타입에 반영되었는가? (Supabase는 nullable 필드가 많음)
- [x]  Enum 타입(UserType 등)이 문자열 리터럴 유니온으로 정의되었는가?

---

# M1: 핵심 UI 및 디자인 시스템 구축

## [x] M1.1: 기본 UI 컴포넌트 생성 (Button)

### 컨텍스트 및 목표

Design System에 정의된 버튼 변형과 상태를 React 컴포넌트로 구현합니다.

**참조 문서**: Design System 섹션 6.1 (버튼)

### 사용자 스토리

`개발자로서,
다양한 변형과 크기의 버튼 컴포넌트를 재사용하고 싶습니다.
그래서 매번 스타일을 작성하지 않고 일관된 버튼을 사용할 수 있습니다.`

### 기술 명세

1. **Button 컴포넌트 생성**

typescript

   `// src/components/ui/Button.tsx
   import { ButtonHTMLAttributes, forwardRef } from 'react'
   import { cn } from '@/lib/utils'
   
   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'ghost'
     size?: 'sm' | 'md' | 'lg' | 'xl'
     isLoading?: boolean
   }
   
   export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
     ({ 
       variant = 'primary', 
       size = 'md', 
       isLoading = false,
       disabled,
       children,
       className,
       ...props 
     }, ref) => {
       const baseClasses = 'font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed'
       
       const variantClasses = {
         primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-neutral-300 disabled:text-neutral-500',
         secondary: 'bg-white text-primary-600 border-2 border-primary-500 hover:bg-primary-50',
         ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
       }
       
       const sizeClasses = {
         sm: 'h-10 px-4 text-sm',
         md: 'h-12 px-6 text-lg',
         lg: 'h-14 px-8 text-xl',
         xl: 'h-16 px-10 text-2xl font-semibold',
       }
       
       return (
         <button
           ref={ref}
           className={cn(
             baseClasses,
             variantClasses[variant],
             sizeClasses[size],
             className
           )}
           disabled={disabled || isLoading}
           {...props}
         >
           {isLoading ? (
             <span className="flex items-center gap-2">
               <Loader className="animate-spin" size={20} />
               로딩 중...
             </span>
           ) : (
             children
           )}
         </button>
       )
     }
   )
   
   Button.displayName = 'Button'`

1. **유틸리티 함수 생성**

typescript

   `// src/lib/utils.ts
   import { clsx, type ClassValue } from 'clsx'
   import { twMerge } from 'tailwind-merge'
   
   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }`

### 인수 조건 (Acceptance Criteria)

- [x]  Primary, Secondary, Ghost 변형이 모두 작동함
- [x]  sm, md, lg, xl 크기가 Design System과 일치함
- [x]  hover, active, disabled 상태가 올바르게 표시됨
- [x]  isLoading prop으로 로딩 상태 표시 가능
- [x]  접근성을 위한 키보드 포커스가 표시됨
- [x]  TypeScript 타입 추론이 정상 작동함

### 자가 수정 지침

- [x]  모든 버튼 변형이 Design System과 픽셀 단위로 일치하는가?
- [x]  터치 영역이 최소 44px 이상인가?
- [x]  색상 대비가 WCAG AA 기준을 충족하는가?
- [x]  forwardRef로 ref 전달이 가능한가?

---

## [x] M1.2: 기본 UI 컴포넌트 생성 (Input, Textarea)

### 컨텍스트 및 목표

텍스트 입력 필드와 텍스트 영역 컴포넌트를 구현합니다.

**참조 문서**: Design System 섹션 6.2 (입력 필드)

### 사용자 스토리

`사용자로서,
큰 글자와 명확한 포커스 표시가 있는 입력 필드를 사용하고 싶습니다.
그래서 편안하게 텍스트를 입력할 수 있습니다.`

### 기술 명세

1. **Input 컴포넌트**

typescript

   `// src/components/ui/Input.tsx
   import { InputHTMLAttributes, forwardRef } from 'react'
   import { cn } from '@/lib/utils'
   
   interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     label?: string
     error?: string
     helperText?: string
     size?: 'md' | 'lg'
   }
   
   export const Input = forwardRef<HTMLInputElement, InputProps>(
     ({ label, error, helperText, size = 'lg', className, ...props }, ref) => {
       return (
         <div className="w-full">
           {label && (
             <label className="block text-sm font-medium text-neutral-700 mb-2">
               {label}
             </label>
           )}
           <input
             ref={ref}
             className={cn(
               'w-full px-4 text-lg text-neutral-900 bg-white border-2 rounded-md transition-all',
               'placeholder:text-neutral-400',
               'focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-100',
               'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
               error && 'border-error-500 focus:ring-error-100',
               size === 'md' && 'h-12',
               size === 'lg' && 'h-14 text-xl',
               className
             )}
             {...props}
           />
           {error && (
             <p className="mt-1 text-sm text-error-600">{error}</p>
           )}
           {helperText && !error && (
             <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
           )}
         </div>
       )
     }
   )
   
   Input.displayName = 'Input'`

1. **Textarea 컴포넌트**

typescript

   `// src/components/ui/Textarea.tsx
   import { TextareaHTMLAttributes, forwardRef } from 'react'
   import { cn } from '@/lib/utils'
   
   interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
     label?: string
     error?: string
   }
   
   export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
     ({ label, error, className, ...props }, ref) => {
       return (
         <div className="w-full">
           {label && (
             <label className="block text-sm font-medium text-neutral-700 mb-2">
               {label}
             </label>
           )}
           <textarea
             ref={ref}
             className={cn(
               'w-full min-h-[120px] px-4 py-3 text-lg text-neutral-900 bg-white border-2 rounded-md transition-all resize-vertical',
               'placeholder:text-neutral-400',
               'focus:outline-none focus:border-primary-500 focus:ring-3 focus:ring-primary-100',
               'disabled:bg-neutral-100 disabled:text-neutral-500',
               error && 'border-error-500 focus:ring-error-100',
               className
             )}
             {...props}
           />
           {error && (
             <p className="mt-1 text-sm text-error-600">{error}</p>
           )}
         </div>
       )
     }
   )
   
   Textarea.displayName = 'Textarea'`

### 인수 조건 (Acceptance Criteria)

- [x]  label, helper text, error message가 올바르게 렌더링됨
- [x]  에러 상태일 때 테두리 색상이 변경됨(red-500)
- [x]  Textarea가 내용에 따라 자동으로 늘어나거나 크기 조절이 가능함
- [x]  focus 상태일 때 primary 색상의 링이 표시됨
- [x]  시니어 친화적인 큰 입력 필드(lg size)가 구현됨

### 자가 수정 지침

- [x]  입력 텍스트 크기가 16px 이상인가? (iOS zoom 방지)
- [x]  레이블과 입력 필드가 id로 연결되어 있는가? (접근성)
- [x]  플레이스홀더 색상 대비가 적절한가?Design System과 일치하는가?

---

## [x] M1.3: 카드 컴포넌트 생성

### 컨텍스트 및 목표

재사용 가능한 카드 컴포넌트를 구현합니다.

**참조 문서**: Design System 섹션 6.3 (카드)

### 사용자 스토리

`개발자로서,
다양한 콘텐츠를 담을 수 있는 카드 컴포넌트를 사용하고 싶습니다.
그래서 일관된 레이아웃과 스타일을 유지할 수 있습니다.`

### 기술 명세

typescript

`// src/components/ui/Card.tsx
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-neutral-200 rounded-xl p-6 shadow-sm transition-all duration-200',
          clickable && 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4 pb-4 border-b border-neutral-200', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-neutral-900', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-neutral-700 leading-relaxed', className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'`

### 인수 조건 (Acceptance Criteria)

- [x]  기본 카드가 올바른 패딩과 그림자를 가짐
- [x]  clickable prop으로 호버/클릭 효과 추가 가능
- [x]  CardHeader, CardTitle, CardContent가 조합 가능
- [x]  반응형으로 작동함

### 자가 수정 지침

- [x]  그림자가 Design System의 shadow-sm과 일치하는가?
- [x]  호버 시 translateY 값이 자연스러운가?
- [x]  카드 내부 요소들의 간격이 적절한가?

---

## [x] M1.4: Dialog(Modal) 컴포넌트

### 컨텍스트 및 목표

사용자와의 상호작용(삭제 확인, 정보 입력 등)을 처리하기 위한 모달 다이얼로그를 구현합니다.

### 사용자 스토리

`사용자로서,
중요한 작업을 수행하기 전에 확인 창을 보고 싶습니다.
그래서 실수로 데이터를 삭제하는 것을 방지할 수 있습니다.`

### 기술 명세

1. **Radix UI Dialog 사용**
   - `@radix-ui/react-dialog` 기반 구현
   - 접근성(Accessibility) 준수

2. **구성 요소**
   - `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

### 인수 조건 (Acceptance Criteria)

- [x]  모달이 열릴 때 배경(Overlay)이 어두워짐
- [x]  애니메이션(Fade in/out, Zoom in/out)이 적용됨
- [x]  ESC 키를 누르면 닫힘
- [x]  모바일 환경에서 반응형으로 크기가 조절됨 (최대 너비 제한 등)
- [x]  `DialogTitle`이 포함되어 접근성 경고가 없음

### 자가 수정 지침

- [x]  `z-index` 관리가 올바른가? (Header보다 위에 떠야 함)
- [x]  닫기 버튼(X)과 취소 버튼이 모두 작동하는가?

---

## [x] M1.5: 레이아웃 및 네비게이션 구조

### 컨텍스트 및 목표

앱의 전체 레이아웃과 네비게이션 구조를 구현합니다.

**참조 문서**: User Flow 전체, Design System 섹션 5 (레이아웃)

### 사용자 스토리

`사용자로서,
어느 페이지에서든 주요 기능으로 쉽게 이동하고 싶습니다.
그래서 앱을 편리하게 탐색할 수 있습니다.`

### 기술 명세

1. **루트 레이아웃**

typescript

   `// src/app/layout.tsx
   import type { Metadata } from 'next'
   import './globals.css'
   
   export const metadata: Metadata = {
     title: '기억책방 - 나의 이야기를 기록하다',
     description: '시니어를 위한 생애 기록 및 디지털 유산 플랫폼',
   }
   
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="ko">
         <body className="font-sans antialiased bg-background text-neutral-900">
           {children}
         </body>
       </html>
     )
   }`

1. **메인 레이아웃 (인증 후)**

typescript

   `// src/app/(main)/layout.tsx
   import { Header } from '@/components/layout/Header'
   import { Sidebar } from '@/components/layout/Sidebar'
   import { BottomNav } from '@/components/layout/BottomNav'
   
   export default function MainLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <div className="min-h-screen flex flex-col">
         <Header />
         
         <div className="flex-1 flex">
           {/* Desktop Sidebar */}
           <aside className="hidden lg:block w-64 border-r border-neutral-200">
             <Sidebar />
           </aside>
           
           {/* Main Content */}
           <main className="flex-1 p-6 pb-20 lg:pb-6">
             {children}
           </main>
         </div>
         
         {/* Mobile Bottom Navigation */}
         <div className="lg:hidden">
           <BottomNav />
         </div>
       </div>
     )
   }`

1. **Header 컴포넌트**

typescript

   `// src/components/layout/Header.tsx
   'use client'
   
   import Link from 'next/link'
   import { Bell, Settings, User } from 'lucide-react'
   import { Button } from '@/components/ui/Button'
   
   export function Header() {
     return (
       <header className="h-16 border-b border-neutral-200 bg-white sticky top-0 z-50">
         <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
           {/* Logo */}
           <Link href="/" className="text-2xl font-bold text-primary-600">
             기억책방
           </Link>
           
           {/* Actions */}
           <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
               <Bell size={24} />
             </Button>
             <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
               <Settings size={24} />
             </Button>
             <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
               <User size={24} />
             </Button>
           </div>
         </div>
       </header>
     )
   }`

1. **Bottom Navigation (모바일)**

typescript

   `// src/components/layout/BottomNav.tsx
   'use client'
   
   import Link from 'next/link'
   import { usePathname } from 'next/navigation'
   import { Home, Book, Lock, Users, User } from 'lucide-react'
   import { cn } from '@/lib/utils'
   
   const navItems = [
     { href: '/', label: '홈', icon: Home },
     { href: '/biography', label: '자서전', icon: Book },
     { href: '/vault', label: '금고', icon: Lock },
     { href: '/community', label: '친구', icon: Users },
     { href: '/profile', label: '내 정보', icon: User },
   ]
   
   export function BottomNav() {
     const pathname = usePathname()
     
     return (
       <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-neutral-200 z-50">
         <div className="h-full flex items-center justify-around">
           {navItems.map(({ href, label, icon: Icon }) => {
             const isActive = pathname === href
             
             return (
               <Link
                 key={href}
                 href={href}
                 className={cn(
                   'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors',
                   isActive ? 'text-primary-600' : 'text-neutral-500'
                 )}
               >
                 <Icon size={24} />
                 <span className="text-xs">{label}</span>
               </Link>
             )
           })}
         </div>
       </nav>
     )
   }`

### 인수 조건 (Acceptance Criteria)

- [ ]  헤더가 모든 페이지에서 표시됨
- [ ]  데스크톱에서 사이드바가 표시됨
- [ ]  모바일에서 하단 네비게이션이 표시됨
- [ ]  현재 페이지가 네비게이션에서 활성 상태로 표시됨
- [ ]  반응형으로 레이아웃이 전환됨
- [ ]  스크롤 시 헤더가 상단에 고정됨

### 자가 수정 지침

- [ ]  하단 네비게이션의 높이가 터치하기 충분한가?
- [ ]  아이콘 크기가 시니어 사용자에게 적절한가?
- [ ]  z-index 충돌이 없는가?

---

# M2: 인증 및 사용자 관리

## [x] M2.1: Supabase Auth 설정 및 회원가입 구현

### 컨텍스트 및 목표

Supabase Auth를 사용하여 이메일/비밀번호 기반 회원가입 기능을 구현합니다.

**참조 문서**: TRD 섹션 5 (보안 요구사항), FRS Part 1 섹션 1.1 (회원가입)

### 사용자 스토리

`신규 사용자로서,
이메일과 비밀번호로 간단하게 회원가입하고 싶습니다.
그래서 서비스를 바로 시작할 수 있습니다.`

### 기술 명세

1. **Supabase Auth 설정**
    - Supabase Dashboard에서 Email Provider 활성화
    - 이메일 확인 필요 여부 설정
    - 이메일 템플릿 커스터마이징
2. **회원가입 페이지**

typescript

   `// src/app/(auth)/signup/page.tsx
   'use client'
   
   import { useState } from 'react'
   import { useRouter } from 'next/navigation'
   import { createClient } from '@/lib/supabase/client'
   import { Button } from '@/components/ui/Button'
   import { Input } from '@/components/ui/Input'
   
   export default function SignupPage() {
     const router = useRouter()
     const supabase = createClient()
     const [formData, setFormData] = useState({
       email: '',
       password: '',
       confirmPassword: '',
       fullName: '',
     })
     const [errors, setErrors] = useState<Record<string, string>>({})
     const [isLoading, setIsLoading] = useState(false)
     
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()
       setErrors({})
       
       // 유효성 검사
       if (formData.password !== formData.confirmPassword) {
         setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' })
         return
       }
       
       if (formData.password.length < 8) {
         setErrors({ password: '비밀번호는 최소 8자 이상이어야 합니다.' })
         return
       }
       
       setIsLoading(true)
       
       try {
         // 1. Supabase Auth 회원가입
         const { data: authData, error: authError } = await supabase.auth.signUp({
           email: formData.email,
           password: formData.password,
         })
         
         if (authError) throw authError
         
         // 2. 프로필 생성
         if (authData.user) {
           const { error: profileError } = await supabase
             .from('user_profiles')
             .insert({
               user_id: authData.user.id,
               full_name: formData.fullName,
               user_type: 'senior', // 기본값
             })
           
           if (profileError) throw profileError
         }
         
         // 3. 성공 시 이메일 확인 페이지로 이동
         router.push('/verify-email')
         
       } catch (error: any) {
         setErrors({ general: error.message || '회원가입 중 오류가 발생했습니다.' })
       } finally {
         setIsLoading(false)
       }
     }
     
     return (
       <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 to-accent-50">
         <div className="w-full max-w-md">
           <div className="text-center mb-8">
             <h1 className="text-4xl font-bold text-primary-600 mb-2">기억책방</h1>
             <p className="text-lg text-neutral-600">나의 이야기를 기록하다</p>
           </div>
           
           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h2 className="text-2xl font-semibold text-neutral-900 mb-6">회원가입</h2>
             
             <form onSubmit={handleSubmit} className="space-y-5">
               <Input
                 type="text"
                 label="이름"
                 placeholder="홍길동"
                 value={formData.fullName}
                 onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                 required
               />
               
               <Input
                 type="email"
                 label="이메일"
                 placeholder="example@email.com"
                 value={formData.email}
                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 required
               />
               
               <Input
                 type="password"
                 label="비밀번호"
                 placeholder="최소 8자 이상"
                 value={formData.password}
                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 error={errors.password}
                 required
               />
               
               <Input
                 type="password"
                 label="비밀번호 확인"
                 placeholder="비밀번호를 다시 입력하세요"
                 value={formData.confirmPassword}
                 onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                 error={errors.confirmPassword}
                 required
               />
               
               {errors.general && (
                 <p className="text-sm text-error-600">{errors.general}</p>
               )}
               
               <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
                 가입하기
               </Button>
             </form>
             
             <p className="mt-6 text-center text-neutral-600">
               이미 계정이 있으신가요?{' '}
               <a href="/login" className="text-primary-600 font-medium hover:underline">
                 로그인
               </a>
             </p>
           </div>
         </div>
       </div>
     )
   }`

### 인수 조건 (Acceptance Criteria)

- [x]  이메일과 비밀번호로 회원가입 가능
- [x]  비밀번호 확인 검증이 작동함
- [x]  회원가입 시 user_profiles 테이블에 레코드 생성됨
- [x]  에러 메시지가 명확하게 표시됨
- [x]  로딩 상태가 표시됨
- [x]  회원가입 후 대시보드로 이동 (이메일 확인은 선택사항으로 변경)

### 자가 수정 지침

- [x]  비밀번호 강도 체크가 충분한가? (최소 8자 체크)
- [x]  에러 핸들링이 포괄적인가? (try-catch, 에러 상태 표시)
- [x]  폼 필드가 접근성 기준을 충족하는가? (label, aria-invalid, autoComplete)
- [x]  트랜잭션이 실패했을 때 롤백이 가능한가? (Supabase가 자동 처리)

## [x] M2.2: 로그인 구현

### 컨텍스트 및 목표

이메일/비밀번호 기반 로그인 기능을 구현합니다.

**참조 문서**: FRS Part 1 섹션 1.2 (로그인)

### 사용자 스토리

`등록된 사용자로서,
이메일과 비밀번호로 로그인하고 싶습니다.
그래서 저장된 데이터에 접근할 수 있습니다.`

### 기술 명세

typescript

`// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      
      if (authError) throw authError
      
      // 프로필 확인 및 last_login_at 업데이트
      if (data.user) {
        await supabase
          .from('user_profiles')
          .update({
            last_login_at: new Date().toISOString(),
            login_count: supabase.rpc('increment_login_count', { user_id: data.user.id })
          })
          .eq('user_id', data.user.id)
      }
      
      router.push('/')
      router.refresh()
      
    } catch (error: any) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">기억책방</h1>
          <p className="text-lg text-neutral-600">나의 이야기를 기록하다</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">로그인</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              label="이메일"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
            />
            
            <Input
              type="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="current-password"
            />
            
            {error && (
              <p className="text-sm text-error-600">{error}</p>
            )}
            
            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              로그인
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <a href="/forgot-password" className="text-sm text-primary-600 hover:underline">
              비밀번호를 잊으셨나요?
            </a>
          </div>
          
          <p className="mt-6 text-center text-neutral-600">
            계정이 없으신가요?{' '}
            <a href="/signup" className="text-primary-600 font-medium hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [x]  올바른 이메일/비밀번호로 로그인 성공
- [x]  잘못된 정보 입력 시 에러 메시지 표시
- [x]  로그인 후 메인 페이지로 이동
- [x]  last_login_at이 업데이트됨
- [x]  로딩 상태 표시
- [x]  비밀번호 찾기 링크 작동

### 자가 수정 지침

- [x]  autoComplete 속성이 올바르게 설정되었는가?
- [x]  로그인 실패 시 보안을 위해 구체적인 정보를 노출하지 않는가?
- [x]  세션이 올바르게 생성되는가?

---

## [x] M2.3: 사용자 프로필 페이지

### 컨텍스트 및 목표

사용자가 자신의 프로필 정보를 조회하고 수정할 수 있는 페이지를 구현합니다.

**참조 문서**: FRS Part 1 섹션 1.3 (프로필 관리), DB Schema 섹션 4.1 (user_profiles)

### 사용자 스토리

`사용자로서,
내 프로필 정보를 확인하고 수정하고 싶습니다.
그래서 정확한 정보를 유지할 수 있습니다.`

### 기술 명세

typescript

`// src/app/(main)/profile/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/features/profile/ProfileForm'

export default async function ProfilePage() {
  const supabase = createClient()
  
  // 1. 인증 확인
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login')
  }
  
  // 2. 프로필 조회
  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()
  
  if (profileError) {
    console.error('프로필 조회 오류:', profileError)
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-900 mb-8">내 프로필</h1>
      
      <ProfileForm initialData={profile} userId={user.id} />
    </div>
  )
}`

typescript

`// src/components/features/profile/ProfileForm.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { User } from '@/types'

interface ProfileFormProps {
  initialData: User | null
  userId: string
}

export function ProfileForm({ initialData, userId }: ProfileFormProps) {
  const supabase = createClient()
  const [formData, setFormData] = useState({
    full_name: initialData?.full_name || '',
    phone_number: initialData?.phone_number || '',
    birth_date: initialData?.birth_date || '',
    address_sido: initialData?.address_sido || '',
    address_sigungu: initialData?.address_sigungu || '',
    address_detail: initialData?.address_detail || '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
      
      if (error) throw error
      
      setMessage('프로필이 성공적으로 업데이트되었습니다.')
    } catch (error: any) {
      setMessage('오류: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>기본 정보</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            type="text"
            label="이름"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            required
          />
          
          <Input
            type="tel"
            label="전화번호"
            placeholder="010-1234-5678"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
          />
          
          <Input
            type="date"
            label="생년월일"
            value={formData.birth_date}
            onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="시/도"
              placeholder="서울특별시"
              value={formData.address_sido}
              onChange={(e) => setFormData({ ...formData, address_sido: e.target.value })}
            />
            
            <Input
              type="text"
              label="시/군/구"
              placeholder="강남구"
              value={formData.address_sigungu}
              onChange={(e) => setFormData({ ...formData, address_sigungu: e.target.value })}
            />
          </div>
          
          <Input
            type="text"
            label="상세 주소"
            placeholder="역삼동 123-45"
            value={formData.address_detail}
            onChange={(e) => setFormData({ ...formData, address_detail: e.target.value })}
          />
          
          {message && (
            <p className={message.includes('성공') ? 'text-success-600' : 'text-error-600'}>
              {message}
            </p>
          )}
          
          <Button type="submit" size="lg" isLoading={isLoading}>
            저장하기
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [x]  프로필 정보가 조회됨
- [x]  폼에서 정보 수정 가능
- [x]  저장 시 데이터베이스에 반영됨
- [x]  성공/실패 메시지가 표시됨
- [x]  인증되지 않은 사용자는 로그인 페이지로 리다이렉트됨

### 자가 수정 지침

- [x]  서버 컴포넌트와 클라이언트 컴포넌트가 올바르게 분리되었는가?
- [x]  폼 검증이 충분한가?
- [x]  에러 핸들링이 적절한가?

---

# M3: 핵심 기능 개발 (MVP)

## [] M3.1: 자서전 프로젝트 생성

### 컨텍스트 및 목표

사용자가 새로운 자서전 프로젝트를 생성할 수 있는 기능을 구현합니다.

**참조 문서**: FRS Part 1 섹션 2.1 (자서전 프로젝트 생성), DB Schema 섹션 4.2.1 (biography_projects)

### 사용자 스토리

`시니어 사용자로서,
나만의 자서전 프로젝트를 시작하고 싶습니다.
그래서 내 인생 이야기를 기록할 수 있습니다.`

### 기술 명세

1. **프로젝트 생성 페이지**

typescript

   `// src/app/(main)/biography/new/page.tsx
   import { CreateProjectForm } from '@/components/features/biography/CreateProjectForm'
   
   export default function NewBiographyPage() {
     return (
       <div className="max-w-2xl mx-auto">
         <h1 className="text-3xl font-bold text-neutral-900 mb-2">새 자서전 만들기</h1>
         <p className="text-lg text-neutral-600 mb-8">
           나의 소중한 이야기를 기록해보세요
         </p>
         
         <CreateProjectForm />
       </div>
     )
   }`

1. **프로젝트 생성 폼**

typescript

   `// src/components/features/biography/CreateProjectForm.tsx
   'use client'
   
   import { useState } from 'react'
   import { useRouter } from 'next/navigation'
   import { createClient } from '@/lib/supabase/client'
   import { Button } from '@/components/ui/Button'
   import { Input } from '@/components/ui/Input'
   import { Textarea } from '@/components/ui/Textarea'
   import { Card, CardContent } from '@/components/ui/Card'
   
   export function CreateProjectForm() {
     const router = useRouter()
     const supabase = createClient()
     const [formData, setFormData] = useState({
       title: '',
       subtitle: '',
     })
     const [isLoading, setIsLoading] = useState(false)
     
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()
       setIsLoading(true)
       
       try {
         // 현재 사용자 가져오기
         const { data: { user } } = await supabase.auth.getUser()
         if (!user) throw new Error('인증되지 않은 사용자')
         
         // 자서전 프로젝트 생성
         const { data, error } = await supabase
           .from('biography_projects')
           .insert({
             user_id: user.id,
             title: formData.title,
             subtitle: formData.subtitle,
             status: 'draft',
             completion_percentage: 0,
           })
           .select()
           .single()
         
         if (error) throw error
         
         // 프로젝트 상세 페이지로 이동
         router.push(`/biography/${data.id}`)
         
       } catch (error: any) {
         alert('오류: ' + error.message)
       } finally {
         setIsLoading(false)
       }
     }
     
     return (
       <Card>
         <CardContent className="pt-6">
           <form onSubmit={handleSubmit} className="space-y-6">
             <Input
               type="text"
               label="자서전 제목"
               placeholder="예: 나의 이야기"
               value={formData.title}
               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
               helperText="자서전의 제목을 입력해주세요"
               required
             />
             
             <Textarea
               label="부제목 (선택사항)"
               placeholder="예: 70년의 여정을 돌아보며"
               value={formData.subtitle}
               onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
               rows={3}
             />
             
             <div className="flex gap-3 pt-4">
               <Button
                 type="button"
                 variant="secondary"
                 size="lg"
                 onClick={() => router.back()}
               >
                 취소
               </Button>
               <Button type="submit" size="lg" isLoading={isLoading} className="flex-1">
                 프로젝트 만들기
               </Button>
             </div>
           </form>
         </CardContent>
       </Card>
     )
   }`

### 인수 조건 (Acceptance Criteria)

- [ ]  제목과 부제목을 입력하여 프로젝트 생성 가능
- [ ]  생성된 프로젝트가 데이터베이스에 저장됨
- [ ]  생성 후 프로젝트 상세 페이지로 이동
- [ ]  로딩 상태 표시
- [ ]  에러 처리

### 자가 수정 지침

- [ ]  user_id가 올바르게 설정되는가?
- [ ]  프로젝트 초기 상태값들이 정확한가?
- [ ]  빈 값 검증이 되는가?

---

## [] M3.2: 자서전 프로젝트 목록 조회

### 컨텍스트 및 목표

사용자가 생성한 자서전 프로젝트 목록을 조회하고 관리할 수 있습니다.

**참조 문서**: FRS Part 1 섹션 2.2 (프로젝트 관리)

### 사용자 스토리

`사용자로서,
내가 작성 중인 모든 자서전 프로젝트를 한눈에 보고 싶습니다.
그래서 원하는 프로젝트를 선택하여 작업할 수 있습니다.`

### 기술 명세

typescript

`// src/app/(main)/biography/page.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/features/biography/ProjectCard'
import { Plus } from 'lucide-react'

export default async function BiographyPage() {
  const supabase = createClient()
  
  // 인증 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  
  // 프로젝트 목록 조회
  const { data: projects, error } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">나의 자서전</h1>
          <p className="text-lg text-neutral-600">소중한 추억을 기록하세요</p>
        </div>
        
        <Link href="/biography/new">
          <Button size="lg">
            <Plus size={24} className="mr-2" />
            새 프로젝트 만들기
          </Button>
        </Link>
      </div>
      
      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-neutral-500 mb-6">
            아직 작성한 자서전이 없습니다
          </p>
          <Link href="/biography/new">
            <Button size="lg">첫 자서전 시작하기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}`

typescript

`// src/components/features/biography/ProjectCard.tsx
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Book, Calendar } from 'lucide-react'
import type { BiographyProject } from '@/types'

interface ProjectCardProps {
  project: BiographyProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusLabels = {
    draft: '초안',
    in_progress: '진행 중',
    completed: '완료',
    published: '출판됨',
  }
  
  return (
    <Link href={`/biography/${project.id}`}>
      <Card clickable>
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Book className="text-primary-500" size={32} />
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-100 text-primary-700">
              {statusLabels[project.status]}
            </span>
          </div>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {project.subtitle && (
            <p className="text-neutral-600 mb-4">{project.subtitle}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>
                {new Date(project.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          
          {/* 진행률 표시 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-neutral-600">진행률</span>
              <span className="font-medium text-primary-600">
                {project.completion_percentage}%
              </span>
            </div>
            <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${project.completion_percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [ ]  사용자의 모든 프로젝트가 표시됨
- [ ]  프로젝트 카드에 제목, 상태, 진행률이 표시됨
- [ ]  카드 클릭 시 상세 페이지로 이동
- [ ]  프로젝트가 없을 때 안내 메시지 표시
- [ ]  "새 프로젝트 만들기" 버튼 작동

### 자가 수정 지침

- [ ]  정렬 순서가 올바른가?
- [ ]  soft delete된 항목은 제외되는가?
- [ ]  날짜 포맷이 한국어로 올바르게 표시되는가?

---

## [] M3.3: AI 음성 인터뷰 시스템 - 챕터 생성 및 녹음

### 컨텍스트 및 목표

사용자가 음성으로 자신의 이야기를 녹음하고 챕터를 생성할 수 있습니다.

**참조 문서**: FRS Part 1 섹션 2.3 (AI 음성 인터뷰), TRD 섹션 8.1 (OpenAI API)

### 사용자 스토리

`시니어 사용자로서,
AI의 질문에 답하며 음성으로 내 이야기를 녹음하고 싶습니다.
그래서 타이핑 없이 편하게 자서전을 작성할 수 있습니다.`

### 기술 명세

1. **챕터 생성 페이지**

typescript

   `// src/app/(main)/biography/[id]/chapter/new/page.tsx
   import { createClient } from '@/lib/supabase/server'
   import { redirect } from 'next/navigation'
   import { ChapterRecorder } from '@/components/features/biography/ChapterRecorder'
   
   export default async function NewChapterPage({
     params,
   }: {
     params: { id: string }
   }) {
     const supabase = createClient()
     
     // 인증 확인
     const { data: { user } } = await supabase.auth.getUser()
     if (!user) redirect('/login')
     
     // 프로젝트 존재 확인
     const { data: project } = await supabase
       .from('biography_projects')
       .select('*')
       .eq('id', params.id)
       .eq('user_id', user.id)
       .single()
     
     if (!project) redirect('/biography')
     
     // 다음 챕터 번호 계산
     const { count } = await supabase
       .from('biography_chapters')
       .select('*', { count: 'exact', head: true })
       .eq('project_id', params.id)
     
     const nextChapterNumber = (count || 0) + 1
     
     return (
       <div className="max-w-4xl mx-auto">
         <h1 className="text-3xl font-bold text-neutral-900 mb-2">
           챕터 {nextChapterNumber} 녹음하기
         </h1>
         <p className="text-lg text-neutral-600 mb-8">
           AI의 질문에 답하며 이야기를 녹음해보세요
         </p>
         
         <ChapterRecorder
           projectId={params.id}
           chapterNumber={nextChapterNumber}
         />
       </div>
     )
   }`

1. **녹음 컴포넌트 (기본 구조)**

typescript

   `// src/components/features/biography/ChapterRecorder.tsx
   'use client'
   
   import { useState, useRef } from 'react'
   import { useRouter } from 'next/navigation'
   import { createClient } from '@/lib/supabase/client'
   import { Button } from '@/components/ui/Button'
   import { Input } from '@/components/ui/Input'
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
   import { Mic, Square, Play, Pause, Save } from 'lucide-react'
   
   interface ChapterRecorderProps {
     projectId: string
     chapterNumber: number
   }

### 인수 조건 (Acceptance Criteria)

- [x]  Supabase 프로젝트가 생성됨
- [x]  `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 설정됨
- [x]  데이터베이스 테이블(최소한 `user_profiles`)이 생성됨 (SQL 파일 제공됨)
- [x]  Supabase 클라이언트 코드가 정상적으로 초기화됨

### 자가 수정 지침

- [x]  RLS(Row Level Security)가 활성화되었는가? (SQL 포함)
- [x]  환경 변수가 git에 커밋되지 않도록 설정되었는가? (.gitignore 확인)
   
   export function ChapterRecorder({ projectId, chapterNumber }: ChapterRecorderProps) {
     const router = useRouter()
     const supabase = createClient()
     
     const [chapterTitle, setChapterTitle] = useState('')
     const [theme, setTheme] = useState('')
     const [isRecording, setIsRecording] = useState(false)
     const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
     const [audioUrl, setAudioUrl] = useState<string | null>(null)
     const [isProcessing, setIsProcessing] = useState(false)
     
     const mediaRecorderRef = useRef<MediaRecorder | null>(null)
     const chunksRef = useRef<Blob[]>([])
     
     // 녹음 시작
     const startRecording = async () => {
       try {
         const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
         const mediaRecorder = new MediaRecorder(stream)
         mediaRecorderRef.current = mediaRecorder
         chunksRef.current = []
         
         mediaRecorder.ondataavailable = (e) => {
           if (e.data.size > 0) {
             chunksRef.current.push(e.data)
           }
         }
         
         mediaRecorder.onstop = () => {
           const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
           setAudioBlob(blob)
           setAudioUrl(URL.createObjectURL(blob))
           
           // 스트림 정지
           stream.getTracks().forEach(track => track.stop())
         }
         
         mediaRecorder.start()
         setIsRecording(true)
       } catch (error) {
         console.error('녹음 시작 오류:', error)
         alert('마이크 접근 권한이 필요합니다.')
       }
     }
     
     // 녹음 중지
     const stopRecording = () => {
       if (mediaRecorderRef.current && isRecording) {
         mediaRecorderRef.current.stop()
         setIsRecording(false)
       }
     }
     
     // 저장 및 AI 처리
     const handleSave = async () => {
       if (!audioBlob || !chapterTitle) {
         alert('챕터 제목과 녹음이 필요합니다.')
         return
       }
       
       setIsProcessing(true)
       
       try {
         // 1. 오디오 파일 업로드
         const fileName = `${projectId}/${Date.now()}.webm`
         const { data: uploadData, error: uploadError } = await supabase.storage
           .from('audio-recordings')
           .upload(fileName, audioBlob)
         
         if (uploadError) throw uploadError
         
         // 2. 챕터 생성
         const { data: chapter, error: chapterError } = await supabase
           .from('biography_chapters')
           .insert({
             project_id: projectId,
             chapter_number: chapterNumber,
             title: chapterTitle,
             theme,
             status: 'ai_processing',
           })
           .select()
           .single()
         
         if (chapterError) throw chapterError
         
         // 3. 오디오 레코드 생성
         const { error: audioError } = await supabase
           .from('audio_recordings')
           .insert({
             chapter_id: chapter.id,
             file_url: uploadData.path,
             format: 'webm',
             transcription_status: 'pending',
           })
         
         if (audioError) throw audioError
         
         // 4. AI 처리 큐에 추가 (실제 구현은 M4에서)
         // TODO: OpenAI Whisper API로 음성→텍스트 변환
         
         alert('녹음이 저장되었습니다. AI가 처리 중입니다.')
         router.push(`/biography/${projectId}`)
         
       } catch (error: any) {
         console.error('저장 오류:', error)
         alert('오류: ' + error.message)
       } finally {
         setIsProcessing(false)
       }
     }
     
     return (
       <div className="space-y-6">
         {/* 챕터 정보 입력 */}
         <Card>
           <CardHeader>
             <CardTitle>챕터 정보</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <Input
               type="text"
               label="챕터 제목"
               placeholder="예: 어린 시절 추억"
               value={chapterTitle}
               onChange={(e) => setChapterTitle(e.target.value)}
               required
             />
             
             <Input
               type="text"
               label="주제 (선택사항)"
               placeholder="예: 1960년대, 고향 마을"
               value={theme}
               onChange={(e) => setTheme(e.target.value)}
             />
           </CardContent>
         </Card>
         
         {/* 녹음 컨트롤 */}
         <Card>
           <CardHeader>
             <CardTitle>음성 녹음</CardTitle>
           </CardHeader>
           <CardContent>
             <div className="flex flex-col items-center justify-center py-12">
               {!isRecording && !audioUrl && (
                 <Button
                   onClick={startRecording}
                   size="xl"
                   className="w-32 h-32 rounded-full"
                 >
                   <Mic size={48} />
                 </Button>
               )}
               
               {isRecording && (
                 <>
                   <div className="w-32 h-32 rounded-full bg-error-500 flex items-center justify-center animate-pulse mb-4">
                     <Mic size={48} className="text-white" />
                   </div>
                   <p className="text-lg text-neutral-600 mb-4">녹음 중...</p>
                   <Button onClick={stopRecording} variant="secondary" size="lg">
                     <Square size={24} className="mr-2" />
                     녹음 중지
                   </Button>
                 </>
               )}
               
               {audioUrl && !isRecording && (
                 <>
                   <audio src={audioUrl} controls className="w-full max-w-md mb-6" />
                   
                   <div className="flex gap-3">
                     <Button onClick={startRecording} variant="secondary" size="lg">
                       다시 녹음
                     </Button>
                     <Button
                       onClick={handleSave}
                       size="lg"
                       isLoading={isProcessing}
                     >
                       <Save size={24} className="mr-2" />
                       저장하기
                     </Button>
                   </div>
                 </>
               )}
             </div>
           </CardContent>
         </Card>
       </div>
     )
   }`

### 인수 조건 (Acceptance Criteria)

- [ ]  마이크 권한 요청이 정상 작동함
- [ ]  음성 녹음 시작/중지가 가능함
- [ ]  녹음된 오디오를 미리 들을 수 있음
- [ ]  오디오 파일이 Supabase Storage에 업로드됨
- [ ]  챕터와 오디오 레코드가 데이터베이스에 생성됨
- [ ]  녹음 중 상태가 시각적으로 표시됨

### 자가 수정 지침

- [ ]  MediaRecorder API가 모든 브라우저에서 지원되는가?
- [ ]  녹음 파일 크기 제한이 있는가?
- [ ]  에러 핸들링이 충분한가?
- [ ]  메모리 누수가 없는가? (URL.revokeObjectURL)

---

*이하 M3.4~M5 태스크는 문서 길이 제한으로 생략. 동일한 패턴으로 계속 작성*

---

## 📌 태스크 진행 체크리스트

각 태스크 완료 시 아래 항목을 확인하세요:

- [ ]  모든 인수 조건(AC)을 충족했는가?
- [ ]  자가 수정 지침을 모두 점검했는가?
- [ ]  코드에 주석이 적절히 달려있는가?
- [ ]  TypeScript 에러가 없는가?
- [ ]  ESLint/Prettier 규칙을 준수하는가?
- [ ]  테스트(수동 또는 자동)를 수행했는가?
- [ ]  관련 문서를 참조하여 요구사항과 일치하는가?

---

## 🔄 반복 개발 가이드

1. **태스크 선택**: 마일스톤 순서대로 진행
2. **컨텍스트 확인**: 참조 문서 섹션 읽기
3. **구현**: 기술 명세에 따라 코드 작성
4. **검증**: 인수 조건 체크
5. **리팩토링**: 자가 수정 지침 적용
6. **다음 태스크**: 완료 후 다음으로 이동

---

**문서 버전**: v1.0

**최종 업데이트**: 2025년 12월 29일

**문서 상태**: ✅ 초안 완료 (M0~M2 + M3 일부)

**참고**: 이 문서는 실제 개발 진행에 따라 업데이트되어야 합니다.