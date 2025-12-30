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

# M2.5: 온보딩 및 대시보드

## [x] M2.5.1: 신규 사용자 온보딩 프로세스

### 컨텍스트 및 목표

신규 사용자가 처음 로그인할 때 3단계 온보딩을 통해 기본 정보를 수집하고 관심 기능을 선택합니다.

**참조 문서**: PRD 섹션 1.2 (온보딩 프로세스)

### 사용자 스토리

`신규 사용자로서,
처음 가입할 때 간단한 안내를 받고 내 정보를 입력하고 싶습니다.
그래서 서비스를 쉽게 시작할 수 있습니다.`

### 기술 명세

1. **Step 1: 환영 메시지**

typescript

   `// src/app/(auth)/onboarding/welcome/page.tsx
   export default function WelcomePage() {
     return (
       <div className="min-h-screen flex items-center justify-center p-6">
         <div className="max-w-2xl text-center">
           <h1 className="text-4xl font-bold text-primary-600 mb-6">
             기억책방에 오신 것을 환영합니다
           </h1>
           <div className="space-y-4 mb-8">
             <p className="text-xl text-neutral-700">
               💙 당신의 소중한 이야기를 기록합니다
             </p>
             <p className="text-xl text-neutral-700">
               👨‍👩‍👧‍👦 가족과 함께 추억을 나눕니다
             </p>
             <p className="text-xl text-neutral-700">
               🤝 새로운 친구와 기회를 연결합니다
             </p>
           </div>
           <Link href="/onboarding/info">
             <Button size="xl">시작하기</Button>
           </Link>
         </div>
       </div>
     )
   }`

2. **Step 2: 기본 정보 입력**

typescript

   `// src/app/(auth)/onboarding/info/page.tsx
   - 진행 표시: "2 / 3"
   - 입력 필드: 이름, 생년월일, 거주 지역
   - 검증: 이름 2자 이상, 18세 이상, 지역 필수 선택`

3. **Step 3: 관심 기능 선택**

typescript

   `// src/app/(auth)/onboarding/interests/page.tsx
   - 진행 표시: "3 / 3"
   - 체크박스 카드: 자서전, 영상편지, 친구찾기, 경력활용, 유언장
   - 최소 1개 선택 필요
   - 선택된 기능이 홈 화면에 우선 표시`

### 인수 조건 (Acceptance Criteria)

- [x]  3단계 온보딩 프로세스 완료
- [x]  각 단계별 진행 표시
- [x]  입력 검증이 작동함
- [x]  관심 기능 선택 저장됨
- [x]  완료 후 홈 화면으로 이동
- [x]  온보딩 완료 플래그 저장 (재방문 시 안 보임)

### 자가 수정 지침

- [x]  폼 검증이 충분한가?
- [x]  시니어 친화적인 큰 버튼과 글씨인가?
- [x]  이전/다음 네비게이션이 작동하는가?
- [x]  온보딩 중단 시 다시 시작할 수 있는가?

---

## [] M2.5.2: 메인 대시보드 (홈 화면)

### 컨텍스트 및 목표

사용자가 모든 핵심 기능에 접근할 수 있는 메인 허브 화면을 구현합니다.

**참조 문서**: PRD 섹션 1.3 (홈 화면)

### 사용자 스토리

`사용자로서,
로그인 후 모든 주요 기능을 한눈에 보고 싶습니다.
그래서 원하는 기능으로 쉽게 이동할 수 있습니다.`

### 기술 명세

typescript

`// src/app/(main)/page.tsx
export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 사용자 프로필 및 통계 조회
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // 각 기능별 통계 조회
  const { count: biographyCount } = await supabase
    .from('biography_projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return (
    <div>
      {/* 상단 인사말 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          안녕하세요, {profile?.full_name}님
        </h1>
        <p className="text-lg text-neutral-600">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* 기능 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon="🎤"
          title="오늘의 이야기"
          description="오늘은 어떤 이야기를 들려주실까요?"
          status={`프로젝트 ${biographyCount}개`}
          action="녹음 시작"
          href="/biography"
        />

        <FeatureCard
          icon="📹"
          title="영상 편지"
          description="소중한 사람에게 영상 메시지를 남겨보세요"
          status="작성한 영상 3개"
          action="영상 녹화"
          href="/video-letters"
        />

        <FeatureCard
          icon="👥"
          title="동네 친구"
          description="가까운 곳에서 새로운 친구를 만나보세요"
          status="새로운 추천 2명"
          action="친구 찾기"
          href="/community"
        />

        <FeatureCard
          icon="💼"
          title="내 경력 활용"
          description="당신의 경험을 나누고 새로운 기회를 찾아보세요"
          status="프로필을 작성해보세요"
          action="시작하기"
          href="/career"
        />

        <FeatureCard
          icon="📄"
          title="디지털 금고"
          description="가족에게 전할 중요한 정보를 보관하세요"
          status="아이템 5개 보관 중"
          action="금고 열기"
          href="/vault"
        />
      </div>
    </div>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [ ]  사용자 이름으로 인사말 표시
- [ ]  오늘 날짜 표시
- [ ]  모든 핵심 기능 카드 표시
- [ ]  각 카드에 현재 상태 표시 (프로젝트 수, 새 알림 등)
- [ ]  카드 클릭 시 해당 기능 페이지로 이동
- [ ]  관심 기능이 상단에 우선 표시
- [ ]  반응형 그리드 레이아웃

### 자가 수정 지침

- [ ]  통계 조회 쿼리가 최적화되었는가?
- [ ]  카드 레이아웃이 시니어 친화적인가?
- [ ]  로딩 상태가 표시되는가?
- [ ]  에러 처리가 되어있는가?

---

# M3: 핵심 기능 개발 (MVP)

## [x] M3.1: 자서전 프로젝트 생성

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

- [x]  제목과 부제목을 입력하여 프로젝트 생성 가능
- [x]  생성된 프로젝트가 데이터베이스에 저장됨
- [x]  생성 후 프로젝트 상세 페이지로 이동
- [x]  로딩 상태 표시
- [x]  에러 처리

### 자가 수정 지침

- [x]  user_id가 올바르게 설정되는가?
- [x]  프로젝트 초기 상태값들이 정확한가?
- [x]  빈 값 검증이 되는가?

---

## [x] M3.2: 자서전 프로젝트 목록 조회

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

- [x]  사용자의 모든 프로젝트가 표시됨
- [x]  프로젝트 카드에 제목, 상태, 진행률이 표시됨
- [x]  카드 클릭 시 상세 페이지로 이동
- [x]  프로젝트가 없을 때 안내 메시지 표시
- [x]  "새 프로젝트 만들기" 버튼 작동

### 자가 수정 지침

- [x]  정렬 순서가 올바른가?
- [x]  soft delete된 항목은 제외되는가?
- [x]  날짜 포맷이 한국어로 올바르게 표시되는가?

---

## [x] M3.3: AI 음성 인터뷰 시스템 - 챕터 생성 및 녹음

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

- [x]  마이크 권한 요청이 정상 작동함
- [x]  음성 녹음 시작/중지가 가능함
- [x]  녹음된 오디오를 미리 들을 수 있음
- [x]  오디오 파일이 Supabase Storage에 업로드됨
- [x]  챕터와 오디오 레코드가 데이터베이스에 생성됨
- [x]  녹음 중 상태가 시각적으로 표시됨

### 자가 수정 지침

- [x]  MediaRecorder API가 모든 브라우저에서 지원되는가?
- [x]  녹음 파일 크기 제한이 있는가?
- [x]  에러 핸들링이 충분한가?
- [x]  메모리 누수가 없는가? (URL.revokeObjectURL)

---

## [] M3.4: 챕터 목록 조회 (녹음 목록 화면)

### 컨텍스트 및 목표

프로젝트 내 모든 챕터(녹음)를 목록 형태로 조회하고, 필터링 및 통계를 제공합니다.

**참조 문서**: PRD 섹션 2.4 (녹음 목록 화면), DB Schema 섹션 4.2.2 (biography_chapters)

### 사용자 스토리

`사용자로서,
내가 작성한 모든 이야기를 한눈에 보고 관리하고 싶습니다.
그래서 자서전 작성 진행 상황을 파악하고 필요한 챕터를 찾을 수 있습니다.`

### 기술 명세

typescript

`// src/app/(main)/biography/[id]/chapters/page.tsx
export default async function ChaptersListPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // 챕터 목록 조회
  const { data: chapters } = await supabase
    .from('biography_chapters')
    .select('*')
    .eq('project_id', params.id)
    .eq('user_id', user.id)
    .order('chapter_number', { ascending: true })

  // 통계 계산
  const totalChapters = chapters?.length || 0
  const totalDuration = chapters?.reduce((sum, ch) => sum + (ch.duration_seconds || 0), 0) || 0

  return (
    <div>
      {/* 필터 */}
      <div className="mb-6">
        <Select>
          <option value="all">전체</option>
          <option value="this_month">이번 달</option>
          <option value="last_3_months">지난 3개월</option>
          <option value="this_year">올해</option>
        </Select>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent>
            <p className="text-sm text-neutral-600">총 이야기</p>
            <p className="text-2xl font-bold">{totalChapters}개</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-neutral-600">총 녹음 시간</p>
            <p className="text-2xl font-bold">{formatDuration(totalDuration)}</p>
          </CardContent>
        </Card>
      </div>

      {/* 챕터 목록 */}
      <div className="space-y-4">
        {chapters?.map(chapter => (
          <ChapterListCard key={chapter.id} chapter={chapter} />
        ))}
      </div>

      {/* PDF 다운로드 */}
      <Button className="w-full mt-6">
        <Download className="mr-2" />
        PDF로 다운로드
      </Button>
    </div>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [ ]  챕터 목록이 챕터 번호 순으로 표시됨
- [ ]  각 챕터 카드에 날짜, AI 생성 제목, 미리보기 텍스트 표시
- [ ]  오디오 재생 버튼 (인라인 플레이어)
- [ ]  필터 기능 (전체/이번달/지난3개월/올해)
- [ ]  통계 표시 (총 챕터 수, 총 녹음 시간)
- [ ]  더보기 메뉴 (공유/수정/삭제)
- [ ]  PDF 다운로드 버튼
- [ ]  챕터가 없을 때 안내 메시지

### 자가 수정 지침

- [ ]  AI 처리 중인 챕터의 상태가 명확히 표시되는가?
- [ ]  오디오 플레이어가 여러 개 동시에 재생되지 않는가?
- [ ]  페이지네이션이 필요한가?
- [ ]  로딩 상태가 표시되는가?

---

## [] M3.4.1: 챕터 상세 조회 (녹음 상세 화면)

### 컨텍스트 및 목표

개별 챕터의 상세 내용을 조회하고, 오디오를 재생하며, 편집할 수 있습니다.

**참조 문서**: PRD 섹션 2.5 (녹음 상세 화면)

### 사용자 스토리

`사용자로서,
녹음한 이야기를 읽고 들으며 내용을 확인하고 싶습니다.
그래서 AI가 정리한 내용이 정확한지 검토하고 필요시 수정할 수 있습니다.`

### 기술 명세

typescript

`// src/app/(main)/biography/[id]/chapters/[chapterId]/page.tsx
export default async function ChapterDetailPage({
  params
}: {
  params: { id: string, chapterId: string }
}) {
  const supabase = await createClient()

  // 챕터 및 오디오 정보 조회
  const { data: chapter } = await supabase
    .from('biography_chapters')
    .select(\`
      *,
      audio_recordings (*)
    \`)
    .eq('id', params.chapterId)
    .single()

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 */}
      <div className="mb-6">
        <Link href={\`/biography/\${params.id}/chapters\`}>
          <Button variant="ghost">← 뒤로</Button>
        </Link>
        <p className="text-neutral-600 mt-2">
          {new Date(chapter.created_at).toLocaleDateString('ko-KR')}
        </p>
        <h1 className="text-3xl font-bold mt-2">
          {chapter.title}
        </h1>
      </div>

      {/* 오디오 플레이어 (고정) */}
      <AudioPlayer
        src={getAudioUrl(chapter.audio_recordings[0]?.file_url)}
        className="sticky top-20 mb-6"
      />

      {/* 본문 */}
      <div className="prose prose-lg">
        <div dangerouslySetInnerHTML={{ __html: chapter.content_html }} />
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 flex gap-3">
        <Button variant="secondary">가족과 공유</Button>
        <Button variant="secondary">수정</Button>
        <Button variant="secondary">원본 보기</Button>
        <Button variant="ghost" className="text-error-600">삭제</Button>
      </div>
    </div>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [ ]  챕터 제목과 날짜 표시
- [ ]  오디오 플레이어 (재생/일시정지, 진행바, 재생속도 조절)
- [ ]  정리된 텍스트 표시 (20pt, 줄간격 1.8)
- [ ]  가족과 공유 기능
- [ ]  제목 수정 기능 (인라인 편집)
- [ ]  텍스트 수정 모드
- [ ]  원본 텍스트 보기 (모달)
- [ ]  삭제 확인 다이얼로그
- [ ]  뒤로 가기 버튼

### 자가 수정 지침

- [ ]  오디오 플레이어가 스크롤 시 고정되는가?
- [ ]  텍스트가 시니어 친화적으로 표시되는가?
- [ ]  수정 내역이 기록되는가?
- [ ]  XSS 방지를 위한 sanitization이 되는가?

---

## [] M3.4.2: AI 처리 진행 상황 표시

### 컨텍스트 및 목표

녹음 후 AI 처리 과정을 실시간으로 사용자에게 보여줍니다.

**참조 문서**: PRD 섹션 2.3 (AI 처리 중 화면)

### 사용자 스토리

`사용자로서,
녹음 후 AI가 어떤 작업을 하고 있는지 알고 싶습니다.
그래서 언제 완료될지 예상하고 다른 작업을 할 수 있습니다.`

### 기술 명세

- Supabase Realtime을 통한 상태 업데이트 구독
- 처리 단계:
  1. ✅ 음성 파일 저장 완료
  2. ⏳ 텍스트로 변환 중... (30초~1분)
  3. ⏳ AI가 이야기를 정리 중... (1~2분)
  4. ⏳ 감정 분석 및 키워드 추출 중...
  5. ✅ 완료!

typescript

`// src/components/features/biography/AIProcessingStatus.tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AIProcessingStatus({ chapterId }: { chapterId: string }) {
  const [status, setStatus] = useState('pending')
  const supabase = createClient()

  useEffect(() => {
    // Realtime 구독
    const channel = supabase
      .channel(\`chapter-\${chapterId}\`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'biography_chapters',
          filter: \`id=eq.\${chapterId}\`
        },
        (payload) => {
          setStatus(payload.new.status)
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [chapterId])

  return (
    <div className="max-w-md mx-auto">
      {/* 로딩 애니메이션 */}
      <div className="flex justify-center mb-6">
        <BookLoadingAnimation />
      </div>

      {/* 진행 단계 */}
      <div className="space-y-4">
        <ProcessStep
          status="completed"
          label="음성 파일 저장 완료"
        />
        <ProcessStep
          status={status === 'processing' ? 'current' : 'pending'}
          label="텍스트로 변환 중... (30초~1분)"
        />
        <ProcessStep
          status="pending"
          label="AI가 이야기를 정리 중... (1~2분)"
        />
        <ProcessStep
          status="pending"
          label="감정 분석 중..."
        />
      </div>

      <p className="text-center text-neutral-600 mt-6">
        약 3분 후 완료됩니다
      </p>
      <p className="text-center text-sm text-neutral-500 mt-2">
        백그라운드에서 처리됩니다.<br />
        다른 기능을 사용하셔도 됩니다.<br />
        완료되면 알려드릴게요.
      </p>

      <Button
        onClick={() => router.push('/')}
        className="w-full mt-6"
        variant="secondary"
      >
        홈으로
      </Button>
    </div>
  )
}`

### 인수 조건 (Acceptance Criteria)

- [ ]  책장 넘기는 로딩 애니메이션
- [ ]  처리 단계별 체크리스트
- [ ]  실시간 상태 업데이트 (Realtime)
- [ ]  예상 완료 시간 표시
- [ ]  백그라운드 처리 안내
- [ ]  홈으로 돌아가기 버튼
- [ ]  완료 시 푸시 알림

### 자가 수정 지침

- [ ]  Realtime 구독이 정상 작동하는가?
- [ ]  연결이 끊겼을 때 재연결되는가?
- [ ]  예상 시간이 정확한가?

---

## [] M3.4.3: 가족 공유 기능

### 컨텍스트 및 목표

작성한 챕터나 전체 자서전을 가족 구성원과 공유할 수 있습니다.

**참조 문서**: PRD 섹션 2.7 (가족 공유)

### 사용자 스토리

`사용자로서,
내가 작성한 이야기를 가족과 공유하고 싶습니다.
그래서 가족이 나의 이야기를 읽고 댓글을 남길 수 있습니다.`

### 기술 명세

- 가족 초대 방식:
  1. 카카오톡 공유
  2. 문자 메시지 (전화번호 입력)
  3. 링크 복사
- 공유 범위 선택:
  - 특정 챕터만
  - 전체 자서전
- 권한 설정:
  - 읽기 전용
  - 댓글 작성 가능

### 인수 조건 (Acceptance Criteria)

- [ ]  가족 초대 화면
- [ ]  카카오톡 공유 버튼 (Kakao SDK)
- [ ]  SMS 전송 기능
- [ ]  공유 링크 생성 및 복사
- [ ]  가족 목록 표시
- [ ]  공유 범위 선택
- [ ]  권한 설정
- [ ]  초대 상태 추적 (대기/승인)

### 자가 수정 지침

- [ ]  공유 링크가 만료되는가?
- [ ]  권한이 올바르게 적용되는가?
- [ ]  개인정보가 보호되는가?

---

## [] M3.5: 챕터 수정 및 삭제

### 컨텍스트 및 목표

작성된 챕터를 수정하거나 삭제할 수 있습니다.

**참조 문서**: FRS Part 1 섹션 2.4 (챕터 관리)

### 사용자 스토리

`사용자로서,
작성한 챕터의 제목이나 내용을 수정하고 필요없는 챕터를 삭제하고 싶습니다.
그래서 자서전 내용을 관리할 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  챕터 제목 및 주제 수정 가능
- [ ]  챕터 삭제 시 확인 다이얼로그 표시
- [ ]  삭제는 soft delete 방식 (deleted_at 설정)
- [ ]  수정/삭제 후 목록 페이지로 리다이렉트
- [ ]  권한 확인 (본인 챕터만 수정/삭제 가능)

### 자가 수정 지침

- [ ]  삭제 확인 메시지가 명확한가?
- [ ]  낙관적 업데이트를 사용하는가?
- [ ]  RLS 정책이 올바르게 작동하는가?

---

# M4: AI 처리 및 고급 기능

## [] M4.1: OpenAI Whisper API 연동 - 음성→텍스트 변환

### 컨텍스트 및 목표

녹음된 음성 파일을 OpenAI Whisper API를 통해 텍스트로 변환합니다.

**참조 문서**: TRD 섹션 8.1 (OpenAI API), FRS Part 1 섹션 2.3.2 (음성 인식)

### 사용자 스토리

`사용자로서,
녹음한 음성이 자동으로 텍스트로 변환되기를 원합니다.
그래서 타이핑 없이 자서전을 작성할 수 있습니다.`

### 기술 명세

- OpenAI Whisper API 사용
- Supabase Edge Functions 또는 Next.js API Route
- 환경변수: `OPENAI_API_KEY`
- 처리 상태 업데이트: pending → processing → completed/failed

### 인수 조건 (Acceptance Criteria)

- [ ]  오디오 파일이 Whisper API로 전송됨
- [ ]  변환된 텍스트가 audio_recordings.transcription_text에 저장됨
- [ ]  변환 신뢰도(confidence)가 저장됨
- [ ]  처리 상태가 실시간으로 업데이트됨
- [ ]  에러 발생 시 상태가 'failed'로 변경됨

### 자가 수정 지침

- [ ]  API 키가 안전하게 관리되는가?
- [ ]  파일 크기 제한이 있는가?
- [ ]  재시도 로직이 있는가?
- [ ]  비용 최적화를 고려했는가?

---

## [] M4.2: AI 텍스트 편집 및 개선

### 컨텍스트 및 목표

변환된 텍스트를 AI가 자서전 형식으로 다듬고 개선합니다.

**참조 문서**: TRD 섹션 8.1 (OpenAI API), FRS Part 1 섹션 2.3.3 (AI 편집)

### 사용자 스토리

`사용자로서,
음성 변환된 텍스트가 읽기 좋은 자서전 형식으로 다듬어지기를 원합니다.
그래서 자연스러운 이야기가 완성됩니다.`

### 기술 명세

- OpenAI GPT-4 API 사용
- 프롬프트: "시니어의 음성 녹음을 자서전 형식으로 다듬어주세요"
- 결과: biography_chapters.content 및 content_html 업데이트

### 인수 조건 (Acceptance Criteria)

- [ ]  텍스트가 GPT-4로 전송됨
- [ ]  편집된 텍스트가 content에 저장됨
- [ ]  HTML 형식으로 변환되어 content_html에 저장됨
- [ ]  챕터 상태가 'completed'로 변경됨
- [ ]  단어 수(word_count)가 계산되어 저장됨

### 자가 수정 지침

- [ ]  프롬프트가 효과적인가?
- [ ]  토큰 사용량을 최적화했는가?
- [ ]  HTML 변환이 안전한가? (XSS 방지)

---

## [] M4.3: AI 감정 분석 및 키워드 추출

### 컨텍스트 및 목표

챕터의 내용을 분석하여 감정과 핵심 키워드를 추출합니다.

**참조 문서**: DB Schema 섹션 4.2.2 (emotions, keywords)

### 사용자 스토리

`사용자로서,
내 이야기의 감정과 핵심 주제를 시각화하여 보고 싶습니다.
그래서 추억을 더 잘 이해할 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  챕터 내용에서 감정 분석됨 (기쁨, 슬픔, 그리움 등)
- [ ]  감정 데이터가 JSONB 형식으로 저장됨
- [ ]  핵심 키워드 3-5개 추출됨
- [ ]  keywords 배열에 저장됨
- [ ]  summary(요약)가 생성됨

### 자가 수정 지침

- [ ]  감정 분석이 정확한가?
- [ ]  한국어 처리가 올바른가?
- [ ]  JSONB 구조가 쿼리하기 좋은가?

---

## [] M4.4: 대시보드 페이지

### 컨텍스트 및 목표

사용자의 전체 활동과 통계를 보여주는 대시보드를 구현합니다.

**참조 문서**: FRS Part 1 섹션 1.4 (대시보드)

### 사용자 스토리

`사용자로서,
내 자서전 작성 현황과 통계를 한눈에 보고 싶습니다.
그래서 진행 상황을 파악하고 동기부여를 받을 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  총 프로젝트 수 표시
- [ ]  총 챕터 수 및 완성률 표시
- [ ]  총 단어 수 표시
- [ ]  최근 활동 내역 (최근 작성한 챕터)
- [ ]  빠른 액션 버튼 (새 프로젝트, 새 챕터)
- [ ]  프로젝트별 진행률 차트

### 자가 수정 지침

- [ ]  통계가 정확하게 계산되는가?
- [ ]  로딩 성능이 좋은가?
- [ ]  반응형 디자인이 적용되었는가?

---

# M5: 디지털 금고 기능

## [] M5.1: 디지털 금고 생성

### 컨텍스트 및 목표

사용자가 중요한 정보를 안전하게 보관할 디지털 금고를 생성합니다.

**참조 문서**: FRS Part 2 섹션 3.1 (디지털 금고), DB Schema 섹션 4.2.4 (digital_vaults)

### 사용자 스토리

`시니어 사용자로서,
가족에게 전달할 중요한 정보를 안전하게 보관하고 싶습니다.
그래서 적절한 시기에 가족이 받을 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  사용자당 1개의 금고 자동 생성
- [ ]  마스터 비밀번호 설정 가능
- [ ]  전달 방식 선택 (수동, 시간 기반, 이벤트 기반)
- [ ]  전달 트리거 날짜 설정
- [ ]  금고 상태 표시 (활성, 전달 준비 중, 전달 완료)

### 자가 수정 지침

- [ ]  비밀번호가 안전하게 해시되는가?
- [ ]  이미 금고가 있는 경우 처리되는가?
- [ ]  UI가 시니어 친화적인가?

---

## [] M5.2: 금고 아이템 추가 및 관리

### 컨텍스트 및 목표

금고에 다양한 유형의 아이템을 추가하고 관리합니다.

**참조 문서**: DB Schema 섹션 4.2.5 (vault_items)

### 사용자 스토리

`사용자로서,
금융 정보, 계정 정보, 중요 문서, 메시지 등을 금고에 보관하고 싶습니다.
그래서 가족이 필요할 때 찾을 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  아이템 유형 선택 (금융, 계정, 문서, 메시지, 지시사항, 비디오 레터, 기타)
- [ ]  제목 및 설명 입력
- [ ]  내용 암호화 저장
- [ ]  파일 업로드 지원
- [ ]  중요도 설정 (낮음, 보통, 높음, 긴급)
- [ ]  수신자 지정 가능
- [ ]  전달 조건 설정

### 자가 수정 지침

- [ ]  민감한 정보가 암호화되는가?
- [ ]  파일 업로드 크기 제한이 있는가?
- [ ]  CRUD 기능이 모두 작동하는가?

---

## [] M5.3: 금고 전달 시스템

### 컨텍스트 및 목표

설정된 조건에 따라 금고 내용을 수신자에게 전달합니다.

**참조 문서**: FRS Part 2 섹션 3.3 (전달 시스템)

### 사용자 스토리

`사용자로서,
특정 날짜가 되거나 특정 이벤트가 발생하면 자동으로 금고가 전달되기를 원합니다.
그래서 안심하고 정보를 보관할 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  시간 기반 전달 (특정 날짜)
- [ ]  이벤트 기반 전달 (일정 기간 로그인 없음 등)
- [ ]  수동 전달 버튼
- [ ]  이메일 알림 발송
- [ ]  전달 상태 추적
- [ ]  전달 후 금고 잠금

### 자가 수정 지침

- [ ]  스케줄링이 정확한가?
- [ ]  이메일 전송이 안정적인가?
- [ ]  전달 로그가 남는가?

---

# M5.5: 영상 편지 타임캡슐

## [] M5.5.1: 영상 편지 녹화 및 업로드

### 컨텍스트 및 목표

사용자가 가족에게 전달할 영상 메시지를 녹화하고 업로드합니다.

**참조 문서**: PRD 섹션 3 (영상 편지), DB Schema 섹션 4.2.6 (video_letters)

### 사용자 스토리

`시니어 사용자로서,
사랑하는 가족에게 영상 메시지를 남기고 싶습니다.
그래서 특별한 날이나 이벤트에 자동으로 전달될 수 있습니다.`

### 기술 명세

- WebRTC를 사용한 카메라 액세스
- 영상 녹화 (최대 5분)
- Supabase Storage에 업로드
- video_letters 테이블에 메타데이터 저장
- 썸네일 자동 생성

### 인수 조건 (Acceptance Criteria)

- [ ]  카메라 권한 요청 및 액세스
- [ ]  영상 녹화 시작/중지/다시하기
- [ ]  녹화 중 타이머 표시
- [ ]  미리보기 기능
- [ ]  영상 업로드 (진행 상태 표시)
- [ ]  영상 파일 크기 제한 (500MB)
- [ ]  모바일 반응형 지원

### 자가 수정 지침

- [ ]  브라우저 호환성이 확인되었는가?
- [ ]  파일 크기 검증이 되는가?
- [ ]  업로드 실패 시 재시도가 가능한가?

---

## [] M5.5.2: 전달 조건 설정

### 컨텍스트 및 목표

영상 편지가 언제, 어떻게 전달될지 조건을 설정합니다.

**참조 문서**: PRD 섹션 3.2 (전달 조건)

### 사용자 스토리

`사용자로서,
특정 날짜나 이벤트에 영상이 자동으로 전달되도록 설정하고 싶습니다.
그래서 특별한 순간을 미리 준비할 수 있습니다.`

### 기술 명세

- 전달 방식 선택:
  - 특정 날짜 (생일, 기념일 등)
  - 이벤트 기반 (졸업, 결혼 등)
  - 사후 전달
- 수신자 지정 (가족 구성원)
- 개인 메시지 추가

### 인수 조건 (Acceptance Criteria)

- [ ]  전달 방식 선택 UI
- [ ]  날짜 선택기
- [ ]  수신자 목록 (가족 관계 기반)
- [ ]  개인 메시지 입력
- [ ]  조건 저장 및 수정
- [ ]  전달 조건 미리보기

### 자가 수정 지침

- [ ]  날짜 검증이 되는가?
- [ ]  수신자가 없는 경우 처리되는가?
- [ ]  조건 변경 내역이 추적되는가?

---

## [] M5.5.3: 자동 전달 시스템 (Cron Job)

### 컨텍스트 및 목표

설정된 조건에 따라 영상 편지를 자동으로 전달하는 시스템을 구현합니다.

**참조 문서**: TRD 섹션 3.2 (데이터 흐름 - 영상 편지 전달)

### 사용자 스토리

`사용자로서,
설정한 날짜가 되면 자동으로 영상이 전달되기를 원합니다.
그래서 직접 관리하지 않아도 됩니다.`

### 기술 명세

- Supabase Edge Function으로 Cron Job 구현
- 매일 00:00에 실행
- 전달 조건 확인
- 조건 만족 시:
  - FCM 푸시 알림
  - 이메일 발송 (SendGrid)
  - 상태 업데이트 (pending → delivered)
  - 전달 로그 기록

### 인수 조건 (Acceptance Criteria)

- [ ]  Cron Job이 정해진 시간에 실행됨
- [ ]  전달 조건 쿼리가 정확함
- [ ]  푸시 알림 발송 성공
- [ ]  이메일 발송 성공
- [ ]  상태 업데이트 정상 작동
- [ ]  전달 로그 기록됨
- [ ]  에러 처리 및 재시도 로직

### 자가 수정 지침

- [ ]  Cron Job이 실패해도 데이터가 손상되지 않는가?
- [ ]  중복 전달 방지가 되는가?
- [ ]  로그가 충분히 상세한가?

---

# M5.7: 커뮤니티 기능

## [] M5.7.1: 동네 친구 프로필 생성

### 컨텍스트 및 목표

사용자가 친구 찾기 기능을 사용하기 위한 프로필을 생성합니다.

**참조 문서**: PRD 섹션 4 (동네 친구 매칭), DB Schema 섹션 4.3 (friend_profiles)

### 사용자 스토리

`시니어 사용자로서,
비슷한 관심사를 가진 동네 친구를 찾고 싶습니다.
그래서 새로운 친구를 만들고 사회 활동을 할 수 있습니다.`

### 기술 명세

- 프로필 정보:
  - 관심사 (취미, 활동)
  - 원하는 활동 유형
  - 선호 만남 장소
  - 자기소개
- 위치 기반 매칭을 위한 주소 정보

### 인수 조건 (Acceptance Criteria)

- [ ]  프로필 생성 폼
- [ ]  관심사 다중 선택
- [ ]  자기소개 입력 (최대 500자)
- [ ]  프로필 사진 업로드 (선택)
- [ ]  주소 기반 위치 정보 저장
- [ ]  프로필 공개/비공개 설정

### 자가 수정 지침

- [ ]  필수 필드가 적절한가?
- [ ]  프로필 사진 크기 제한이 있는가?
- [ ]  개인정보 보호가 고려되었는가?

---

## [] M5.7.2: 친구 추천 및 매칭

### 컨텍스트 및 목표

AI 기반으로 비슷한 관심사와 가까운 위치의 친구를 추천합니다.

**참조 문서**: TRD 섹션 3 (시스템 아키텍처)

### 사용자 스토리

`사용자로서,
나와 맞는 친구를 자동으로 추천받고 싶습니다.
그래서 쉽게 친구를 찾을 수 있습니다.`

### 기술 명세

- 매칭 알고리즘:
  - 관심사 유사도 (40%)
  - 거리 근접성 (30%)
  - 활동 선호도 (20%)
  - 연령대 유사성 (10%)
- 카카오맵 API로 거리 계산
- 추천 목록 페이지네이션

### 인수 조건 (Acceptance Criteria)

- [ ]  추천 알고리즘 구현
- [ ]  거리 기반 필터링 (0-5km, 5-10km, 10km+)
- [ ]  관심사 기반 필터링
- [ ]  추천 목록 표시
- [ ]  프로필 상세 보기
- [ ]  친구 요청 보내기

### 자가 수정 지침

- [ ]  알고리즘이 효과적인가?
- [ ]  성능이 좋은가?
- [ ]  거리 계산이 정확한가?

---

## [] M5.7.3: 1:1 채팅 기능

### 컨텍스트 및 목표

친구가 된 사용자들 간 실시간 채팅 기능을 구현합니다.

**참조 문서**: TRD 섹션 15.1 (실시간 기능), DB Schema 섹션 4.3.4 (messages)

### 사용자 스토리

`사용자로서,
친구와 실시간으로 메시지를 주고받고 싶습니다.
그래서 만남을 계획하거나 소통할 수 있습니다.`

### 기술 명세

- Supabase Realtime 사용
- 메시지 전송/수신
- 읽음 표시
- 메시지 알림
- 채팅방 목록

### 인수 조건 (Acceptance Criteria)

- [ ]  실시간 메시지 전송/수신
- [ ]  메시지 읽음 표시
- [ ]  타임스탬프 표시
- [ ]  채팅방 목록 (최근 메시지 순)
- [ ]  읽지 않은 메시지 카운트
- [ ]  이미지 전송 지원 (선택)

### 자가 수정 지침

- [ ]  실시간 동기화가 안정적인가?
- [ ]  오프라인 메시지 처리가 되는가?
- [ ]  메시지 저장소가 효율적인가?

---

# M5.8: 구독 및 결제

## [] M5.8.1: 구독 플랜 페이지

### 컨텍스트 및 목표

무료/유료 구독 플랜을 표시하고 선택할 수 있는 페이지를 구현합니다.

**참조 문서**: TRD 섹션 8.2 (결제), DB Schema 섹션 4.5 (subscriptions)

### 사용자 스토리

`사용자로서,
다양한 구독 플랜을 비교하고 선택하고 싶습니다.
그래서 내 필요에 맞는 플랜을 구독할 수 있습니다.`

### 기술 명세

- 플랜 구성:
  - 무료: 월 10분 녹음, 기본 기능
  - 베이직: 월 9,900원, 월 60분 녹음
  - 프리미엄: 월 19,900원, 무제한 녹음, 모든 기능
- 플랜 비교 테이블
- 결제 페이지로 이동

### 인수 조건 (Acceptance Criteria)

- [ ]  3가지 플랜 표시
- [ ]  기능 비교 테이블
- [ ]  현재 플랜 표시
- [ ]  플랜 선택 버튼
- [ ]  연간 결제 할인 옵션

### 자가 수정 지침

- [ ]  가격 표시가 명확한가?
- [ ]  플랜 변경 정책이 안내되는가?
- [ ]  UI가 이해하기 쉬운가?

---

## [] M5.8.2: 토스페이먼츠 결제 연동

### 컨텍스트 및 목표

토스페이먼츠 API를 연동하여 실제 결제 기능을 구현합니다.

**참조 문서**: TRD 섹션 8.2 (토스페이먼츠)

### 사용자 스토리

`사용자로서,
안전하고 간편하게 결제하고 싶습니다.
그래서 유료 플랜을 구독할 수 있습니다.`

### 기술 명세

- 토스페이먼츠 SDK 통합
- 결제 수단: 카드, 계좌이체, 간편결제
- Webhook으로 결제 완료 처리
- 정기 결제 (구독)

### 인수 조건 (Acceptance Criteria)

- [ ]  토스페이먼츠 SDK 통합
- [ ]  결제 페이지 구현
- [ ]  결제 성공/실패 처리
- [ ]  Webhook 엔드포인트 구현
- [ ]  결제 내역 저장
- [ ]  구독 상태 업데이트
- [ ]  영수증 이메일 발송

### 자가 수정 지침

- [ ]  API 키가 안전하게 관리되는가?
- [ ]  결제 실패 시 롤백되는가?
- [ ]  중복 결제 방지가 되는가?

---

## [] M5.8.3: 결제 내역 및 관리

### 컨텍스트 및 목표

사용자가 자신의 결제 내역을 확인하고 구독을 관리할 수 있습니다.

**참조 문서**: DB Schema 섹션 4.5.2 (payments)

### 사용자 스토리

`사용자로서,
내 결제 내역을 확인하고 구독을 취소하거나 변경하고 싶습니다.
그래서 결제를 관리할 수 있습니다.`

### 인수 조건 (Acceptance Criteria)

- [ ]  결제 내역 목록 (날짜, 금액, 상태)
- [ ]  영수증 다운로드
- [ ]  현재 구독 플랜 표시
- [ ]  구독 취소 기능
- [ ]  플랜 변경 기능
- [ ]  다음 결제 예정일 표시

### 자가 수정 지침

- [ ]  환불 정책이 명시되어 있는가?
- [ ]  구독 취소 시 데이터 보존 정책이 있는가?
- [ ]  결제 오류 처리가 적절한가?

---

# M5.9: 알림 시스템

## [] M5.9.1: 푸시 알림 (FCM)

### 컨텍스트 및 목표

Firebase Cloud Messaging을 통한 푸시 알림 시스템을 구현합니다.

**참조 문서**: TRD 섹션 8.4 (알림 서비스)

### 사용자 스토리

`사용자로서,
중요한 이벤트가 발생하면 즉시 알림을 받고 싶습니다.
그래서 놓치지 않고 확인할 수 있습니다.`

### 기술 명세

- FCM 토큰 등록
- 알림 유형:
  - 새 친구 요청
  - 새 메시지
  - AI 처리 완료
  - 영상 편지 전달
  - 구독 갱신 알림
- 알림 권한 요청

### 인수 조건 (Acceptance Criteria)

- [ ]  FCM 프로젝트 설정
- [ ]  토큰 등록 및 저장
- [ ]  알림 전송 함수 구현
- [ ]  알림 클릭 시 해당 페이지로 이동
- [ ]  알림 설정 페이지
- [ ]  알림 ON/OFF 토글

### 자가 수정 지침

- [ ]  알림 권한이 거부된 경우 처리되는가?
- [ ]  알림 전송이 안정적인가?
- [ ]  알림 내용이 명확한가?

---

## [] M5.9.2: 이메일 알림 (SendGrid)

### 컨텍스트 및 목표

중요한 이벤트에 대한 이메일 알림을 발송합니다.

**참조 문서**: TRD 섹션 8.4 (SendGrid)

### 사용자 스토리

`사용자로서,
중요한 정보를 이메일로도 받고 싶습니다.
그래서 앱을 열지 않아도 확인할 수 있습니다.`

### 기술 명세

- SendGrid API 통합
- 이메일 템플릿:
  - 회원가입 환영
  - 비밀번호 재설정
  - 영상 편지 전달
  - 구독 갱신 알림
  - 결제 영수증
- 발신자 인증 (SPF, DKIM)

### 인수 조건 (Acceptance Criteria)

- [ ]  SendGrid 계정 설정
- [ ]  이메일 템플릿 생성
- [ ]  발송 함수 구현
- [ ]  발송 성공/실패 로그
- [ ]  수신 거부 처리
- [ ]  발송 속도 제한

### 자가 수정 지침

- [ ]  이메일이 스팸으로 분류되지 않는가?
- [ ]  템플릿이 반응형인가?
- [ ]  개인정보가 안전하게 처리되는가?

---

# M6: UI/UX 개선 및 최적화

## [] M6.1: 반응형 디자인 완성

### 컨텍스트 및 목표

모든 페이지가 모바일, 태블릿, 데스크톱에서 잘 작동하도록 합니다.

**참조 문서**: TRD 섹션 5 (UI/UX 디자인)

### 인수 조건 (Acceptance Criteria)

- [ ]  모바일(320px~)에서 정상 작동
- [ ]  태블릿(768px~)에서 정상 작동
- [ ]  데스크톱(1024px~)에서 정상 작동
- [ ]  터치 인터페이스 지원
- [ ]  폰트 크기가 시니어 친화적 (최소 16px)

---

## [] M6.2: 접근성(A11y) 개선

### 컨텍스트 및 목표

WCAG 2.1 AA 기준을 충족하는 접근성을 구현합니다.

### 인수 조건 (Acceptance Criteria)

- [ ]  키보드 내비게이션 지원
- [ ]  스크린 리더 호환
- [ ]  색상 대비 4.5:1 이상
- [ ]  ARIA 레이블 적용
- [ ]  포커스 인디케이터 명확

---

## [] M6.3: 성능 최적화

### 컨텍스트 및 목표

빠른 로딩과 부드러운 사용자 경험을 제공합니다.

### 인수 조건 (Acceptance Criteria)

- [ ]  Lighthouse 성능 점수 90+
- [ ]  이미지 최적화 (WebP, lazy loading)
- [ ]  코드 스플리팅 적용
- [ ]  캐싱 전략 구현
- [ ]  번들 크기 최적화

---

# M6.5: 테스트 및 품질 보증

## [] M6.5.1: Unit 테스트 작성

### 컨텍스트 및 목표

핵심 비즈니스 로직과 유틸리티 함수에 대한 단위 테스트를 작성합니다.

**참조 문서**: TRD 섹션 10.4 (테스트 전략)

### 사용자 스토리

`개발자로서,
코드 변경 시 기존 기능이 정상 작동하는지 확인하고 싶습니다.
그래서 안정적인 서비스를 유지할 수 있습니다.`

### 기술 명세

- Vitest 사용
- 테스트 대상:
  - 유틸리티 함수 (날짜 포맷, 문자열 처리 등)
  - 검증 로직
  - 계산 함수
  - 커스텀 훅
- Coverage 목표: 70% 이상

### 인수 조건 (Acceptance Criteria)

- [ ]  Vitest 설정 완료
- [ ]  주요 유틸리티 함수 테스트
- [ ]  검증 로직 테스트
- [ ]  커스텀 훅 테스트
- [ ]  테스트 커버리지 리포트
- [ ]  CI에서 테스트 자동 실행

### 자가 수정 지침

- [ ]  테스트가 의미 있는가?
- [ ]  엣지 케이스를 커버하는가?
- [ ]  테스트가 빠르게 실행되는가?

---

## [] M6.5.2: Integration 테스트

### 컨텍스트 및 목표

API 엔드포인트와 데이터베이스 작업에 대한 통합 테스트를 작성합니다.

**참조 문서**: TRD 섹션 10.4 (테스트 전략)

### 사용자 스토리

`개발자로서,
API와 DB가 올바르게 통합되어 작동하는지 확인하고 싶습니다.
그래서 전체 시스템이 안정적으로 작동합니다.`

### 기술 명세

- Playwright 또는 Vitest 사용
- 테스트 대상:
  - 회원가입/로그인 플로우
  - 프로젝트 CRUD
  - 챕터 생성 및 조회
  - 파일 업로드
  - 결제 플로우

### 인수 조건 (Acceptance Criteria)

- [ ]  테스트 데이터베이스 설정
- [ ]  주요 API 엔드포인트 테스트
- [ ]  인증 플로우 테스트
- [ ]  파일 업로드 테스트
- [ ]  에러 시나리오 테스트
- [ ]  테스트 후 데이터 정리

### 자가 수정 지침

- [ ]  테스트가 독립적으로 실행되는가?
- [ ]  테스트 데이터가 프로덕션에 영향을 주지 않는가?
- [ ]  실패 시 명확한 에러 메시지가 나오는가?

---

## [] M6.5.3: E2E 테스트

### 컨텍스트 및 목표

실제 사용자 시나리오를 재현하는 E2E 테스트를 작성합니다.

**참조 문서**: TRD 섹션 10.4 (테스트 전략)

### 사용자 스토리

`개발자로서,
사용자의 전체 여정이 정상 작동하는지 확인하고 싶습니다.
그래서 배포 전 신뢰성을 보장할 수 있습니다.`

### 기술 명세

- Playwright 사용
- 테스트 시나리오:
  1. 회원가입 → 온보딩 → 첫 프로젝트 생성 → 첫 녹음
  2. 로그인 → 영상 편지 생성 → 전달 조건 설정
  3. 로그인 → 구독 플랜 선택 → 결제

### 인수 조건 (Acceptance Criteria)

- [ ]  Playwright 설정 완료
- [ ]  핵심 사용자 플로우 3개 테스트
- [ ]  모바일 반응형 테스트
- [ ]  크로스 브라우저 테스트 (Chrome, Safari, Firefox)
- [ ]  스크린샷 비교 (선택)
- [ ]  성공/실패 리포트

### 자가 수정 지침

- [ ]  테스트가 안정적인가? (Flaky test 없음)
- [ ]  실행 시간이 적절한가?
- [ ]  테스트가 실제 사용자 행동을 반영하는가?

---

# M6.6: 관리자 기능

## [] M6.6.1: 관리자 대시보드

### 컨텍스트 및 목표

서비스 전체 통계와 사용자 관리를 위한 관리자 대시보드를 구현합니다.

**참조 문서**: TRD 섹션 1.2 (핵심 기능 - 관리자 대시보드)

### 사용자 스토리

`관리자로서,
서비스 전체 현황과 사용자 활동을 한눈에 보고 싶습니다.
그래서 서비스를 효과적으로 운영할 수 있습니다.`

### 기술 명세

- 관리자 전용 라우트: `/admin`
- 통계:
  - 총 사용자 수 (신규 가입, 활성 사용자)
  - 총 프로젝트 수, 챕터 수
  - 구독 현황 (무료/유료)
  - 일별/주별/월별 트렌드
  - API 사용량 (Whisper, GPT-4)
- 차트: Recharts 또는 Chart.js 사용

### 인수 조건 (Acceptance Criteria)

- [ ]  관리자 권한 확인 (admin role)
- [ ]  주요 지표 대시보드
- [ ]  사용자 수 그래프 (일별/주별)
- [ ]  구독 현황 파이 차트
- [ ]  API 사용량 모니터링
- [ ]  실시간 활성 사용자 수
- [ ]  날짜 범위 필터

### 자가 수정 지침

- [ ]  통계 쿼리가 최적화되었는가?
- [ ]  실시간 데이터 업데이트가 필요한가?
- [ ]  UI가 직관적인가?

---

## [] M6.6.2: 사용자 관리

### 컨텍스트 및 목표

관리자가 사용자를 조회, 검색, 관리할 수 있는 기능을 구현합니다.

**참조 문서**: TRD 섹션 1.2 (관리자 기능)

### 사용자 스토리

`관리자로서,
사용자 정보를 조회하고 필요시 계정을 관리하고 싶습니다.
그래서 고객 지원과 서비스 운영을 할 수 있습니다.`

### 기술 명세

- 사용자 목록 (페이지네이션)
- 검색 (이름, 이메일)
- 필터 (사용자 유형, 구독 상태, 가입일)
- 상세 정보 조회
- 계정 상태 변경 (활성/비활성/정지)

### 인수 조건 (Acceptance Criteria)

- [ ]  사용자 목록 테이블
- [ ]  검색 기능
- [ ]  필터 기능
- [ ]  사용자 상세 정보 모달
- [ ]  계정 상태 변경
- [ ]  활동 로그 조회
- [ ]  페이지네이션

### 자가 수정 지침

- [ ]  개인정보가 안전하게 처리되는가?
- [ ]  검색 성능이 좋은가?
- [ ]  변경 내역이 로그로 남는가?

---

## [] M6.6.3: 콘텐츠 관리 및 모더레이션

### 컨텍스트 및 목표

부적절한 콘텐츠를 모니터링하고 관리합니다.

**참조 문서**: TRD 섹션 5 (보안 요구사항)

### 사용자 스토리

`관리자로서,
신고된 콘텐츠나 부적절한 콘텐츠를 검토하고 조치하고 싶습니다.
그래서 안전한 서비스 환경을 유지할 수 있습니다.`

### 기술 명세

- 신고 시스템
- 콘텐츠 리스트 (자서전, 영상 편지, 채팅)
- 콘텐츠 상태 관리 (승인, 거부, 숨김)
- 신고 처리 워크플로우

### 인수 조건 (Acceptance Criteria)

- [ ]  신고 목록 조회
- [ ]  콘텐츠 미리보기
- [ ]  콘텐츠 상태 변경
- [ ]  신고자/피신고자 정보 조회
- [ ]  조치 내역 기록
- [ ]  자동 필터링 (욕설, 선정적 내용)

### 자가 수정 지침

- [ ]  신고 처리 프로세스가 명확한가?
- [ ]  오판 시 복구가 가능한가?
- [ ]  사용자에게 알림이 가는가?

---

# M7: 배포 및 운영

## [] M7.1: 프로덕션 배포

### 컨텍스트 및 목표

Vercel에 프로덕션 환경을 배포합니다.

### 인수 조건 (Acceptance Criteria)

- [ ]  환경 변수 설정
- [ ]  도메인 연결
- [ ]  HTTPS 적용
- [ ]  CI/CD 파이프라인 구성
- [ ]  에러 모니터링 설정 (Sentry 등)

---

## [] M7.2: 데이터베이스 백업 및 보안

### 컨텍스트 및 목표

데이터 손실 방지 및 보안을 강화합니다.

### 인수 조건 (Acceptance Criteria)

- [ ]  자동 백업 설정
- [ ]  RLS 정책 재검토
- [ ]  SQL Injection 방어
- [ ]  XSS 방어
- [ ]  CSRF 방어
- [ ]  Rate Limiting 적용

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

**문서 버전**: v1.2

**최종 업데이트**: 2025년 12월 29일

**문서 상태**: ✅ 전체 마일스톤 및 세부 작업 완료

**변경 사항 (v1.2)**:
- M2.5: 온보딩 및 대시보드 추가
- M3.4: 챕터 목록/상세 조회를 PRD 기준으로 세분화 (녹음 목록 화면, 녹음 상세 화면, AI 처리 진행 표시, 가족 공유)
- M5.5: 영상 편지 타임캡슐 추가 (녹화, 전달 조건, 자동 전달 시스템)
- M5.7: 커뮤니티 기능 추가 (동네 친구 프로필, 매칭, 1:1 채팅)
- M5.8: 구독 및 결제 시스템 추가 (플랜 페이지, 토스페이먼츠 연동, 결제 관리)
- M5.9: 알림 시스템 추가 (FCM 푸시, SendGrid 이메일)
- M6.5: 테스트 및 품질 보증 추가 (Unit, Integration, E2E)
- M6.6: 관리자 기능 추가 (대시보드, 사용자 관리, 콘텐츠 모더레이션)

**커버된 기능**:
- ✅ 프로젝트 초기화 및 환경 설정
- ✅ UI 컴포넌트 시스템 (Button, Input, Card, Dialog 등)
- ✅ 인증 시스템 (회원가입, 로그인, 프로필 관리)
- ✅ 온보딩 프로세스 (3단계)
- ✅ 메인 대시보드 (홈 화면)
- ✅ AI 음성 자서전
  - 프로젝트 생성 및 목록
  - 챕터 녹음 (WebRTC, MediaRecorder)
  - 챕터 목록 조회 (필터, 통계, PDF 다운로드)
  - 챕터 상세 조회 (오디오 플레이어, 텍스트 표시)
  - AI 처리 진행 상황 표시 (Realtime)
  - 가족 공유 (카카오톡, SMS, 링크)
  - 챕터 수정 및 삭제
- ✅ AI 처리
  - OpenAI Whisper API (음성→텍스트)
  - GPT-4 API (텍스트 편집 및 개선)
  - 감정 분석 및 키워드 추출
  - 대화 패턴 분석 (치매 조기 신호 감지)
- ✅ 디지털 금고
  - 금고 생성 및 관리
  - 아이템 추가/조회/수정/삭제
  - 자동 전달 시스템
- ✅ 영상 편지 타임캡슐
  - 영상 녹화 및 업로드 (WebRTC)
  - 전달 조건 설정
  - 자동 전달 시스템 (Cron Job)
- ✅ 커뮤니티 기능
  - 동네 친구 프로필 생성
  - AI 기반 친구 추천 및 매칭
  - 1:1 실시간 채팅 (Supabase Realtime)
- ✅ 구독 및 결제
  - 구독 플랜 페이지 (무료/베이직/프리미엄)
  - 토스페이먼츠 결제 연동
  - 결제 내역 및 관리
- ✅ 알림 시스템
  - FCM 푸시 알림
  - SendGrid 이메일 알림
- ✅ 테스트
  - Unit 테스트 (Vitest)
  - Integration 테스트
  - E2E 테스트 (Playwright)
- ✅ 관리자 기능
  - 관리자 대시보드 (통계, 차트)
  - 사용자 관리
  - 콘텐츠 모더레이션
- ✅ UI/UX 최적화
  - 반응형 디자인
  - 접근성 (WCAG 2.1 AA)
  - 성능 최적화
- ✅ 배포 및 보안
  - Vercel 프로덕션 배포
  - 데이터베이스 백업 및 보안

**PRD 기반 추가 세부 작업**:
- 녹음 준비 화면 (오늘의 질문 제안)
- 녹음 중 화면 (실시간 파형, 타이머)
- AI 처리 중 화면 (단계별 진행 표시, Realtime)
- 녹음 목록 화면 (필터, 통계, PDF 다운로드)
- 녹음 상세 화면 (오디오 플레이어, 편집 기능)
- 가족 초대 및 공유 (카카오톡, SMS, 링크 복사)

**참조 문서**:
- PRD (프로젝트 요구사항 정의서)
- TRD (기술 요구사항 정의서)
- Database Design (데이터베이스 스키마)
- Design System (디자인 시스템)
- User Flow (사용자 흐름도)

**총 태스크 수**: 약 60개 (M0~M7)

**구현 우선순위**:
1. **M0-M2**: 기본 인프라 및 인증 (완료 ✓)
2. **M3**: 핵심 기능 - AI 음성 자서전 (진행 중)
3. **M4**: AI 처리 (Whisper, GPT-4, 분석)
4. **M5**: 추가 기능 (금고, 영상편지, 커뮤니티, 결제, 알림)
5. **M6**: UI/UX 개선, 테스트, 관리자 기능
6. **M7**: 배포 및 운영

**참고**: 이 문서는 PRD, TRD, Database Design의 모든 요구사항을 기반으로 작성되었습니다. 실제 개발 진행에 따라 지속적으로 업데이트되어야 합니다.