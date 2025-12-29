코딩 규칙 및 AI 협업 가이드
프로젝트: 기억책방 (Memory Bookstore)
작성일: 2025년 12월 29일
버전: v1.0
목적: AI 코딩 파트너가 고품질의 유지보수 가능하며 안전한 코드를 일관되게 생성하도록 돕는 가이드

목차

핵심 원칙
프로젝트 설정 및 기술 스택
아키텍처 및 모듈성
AI 소통 원칙
코드 품질 및 보안
테스트 및 디버깅
Git 워크플로우
코드 리뷰 체크리스트


1. 핵심 원칙
1.1 "신뢰하되, 검증하라" (Trust, but Verify)
AI는 강력한 도구이지만, 최종 책임은 개발자에게 있습니다.

✅ DO:
- AI가 생성한 코드를 항상 검토하고 이해하기
- 보안에 민감한 코드는 수동으로 검증하기
- 프로덕션 배포 전 충분한 테스트 수행
- AI의 제안을 비판적으로 평가하기

❌ DON'T:
- AI 코드를 맹목적으로 복사-붙여넣기
- 이해하지 못하는 코드를 프로덕션에 배포
- 보안 체크 없이 외부 라이브러리 추가
- 테스트 없이 "잘 작동할 것"이라 가정
1.2 기본 가치
1. 가독성 > 영리함
   - 복잡한 한 줄 코드보다 명확한 여러 줄 코드 선호

2. 명시성 > 암시성
   - 타입, 변수명, 함수명을 명확하게 작성

3. 일관성 > 개인 선호
   - 프로젝트 전체에서 동일한 패턴 유지

4. 안전성 > 편의성
   - 보안과 안정성을 최우선으로

5. 단순성 > 과도한 추상화
   - 필요한 만큼만 추상화
1.3 시니어 친화적 개발 원칙
기억책방은 시니어 사용자를 위한 서비스입니다.

✓ 큰 글자, 높은 대비
✓ 명확한 액션 버튼
✓ 충분한 터치 영역 (최소 44px)
✓ 단순하고 직관적인 UI
✓ 로딩/에러 상태를 명확하게 표시
✓ 실수를 쉽게 되돌릴 수 있도록

2. 프로젝트 설정 및 기술 스택
2.1 기술 스택 버전 (고정)
JSON{
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.40.0",
    "@supabase/ssr": "^0.1.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0"
  }
}
중요:

메이저 버전 업그레이드 전 충분한 테스트 필요
package-lock.json을 Git에 커밋하여 일관성 보장
의존성 업데이트 시 CHANGELOG 확인

2.2 필수 개발 도구
세게 때리다# ESLint
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Prettier
npm install -D prettier prettier-plugin-tailwindcss

# Husky (Git Hooks)
npm install -D husky lint-staged

# Type Checking
npm install -D @types/node @types/react @types/react-dom
2.3 설정 파일
.eslintrc.json
JSON{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error"
  }
}
.prettierrc
JSON{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
tsconfig.json
JSON{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

3. 아키텍처 및 모듈성
3.1 폴더 구조 (표준)
src/
├── app/                        # Next.js 15 App Router
│   ├── (auth)/                 # 인증 라우트 그룹
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── (main)/                 # 메인 앱 라우트 그룹
│   │   ├── biography/
│   │   ├── vault/
│   │   ├── community/
│   │   └── layout.tsx
│   ├── api/                    # API Routes
│   │   └── webhooks/
│   ├── layout.tsx              # 루트 레이아웃
│   └── globals.css
│
├── components/                 # React 컴포넌트
│   ├── ui/                     # 기본 UI 컴포넌트 (재사용 가능)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts            # 배럴 익스포트
│   ├── features/               # 기능별 컴포넌트
│   │   ├── biography/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ChapterRecorder.tsx
│   │   │   └── index.ts
│   │   ├── vault/
│   │   └── community/
│   └── layout/                 # 레이아웃 컴포넌트
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── BottomNav.tsx
│
├── lib/                        # 유틸리티 및 라이브러리
│   ├── supabase/
│   │   ├── client.ts           # 브라우저 클라이언트
│   │   ├── server.ts           # 서버 클라이언트
│   │   └── middleware.ts       # 인증 미들웨어
│   ├── openai/
│   │   └── client.ts
│   ├── utils.ts                # 공통 유틸리티
│   └── constants.ts            # 상수 정의
│
├── types/                      # TypeScript 타입 정의
│   ├── database.types.ts       # Supabase 자동 생성
│   ├── index.ts                # 커스텀 타입
│   └── api.types.ts
│
├── hooks/                      # 커스텀 React Hooks
│   ├── useAuth.ts
│   ├── useBiography.ts
│   └── useSupabase.ts
│
└── styles/                     # 추가 스타일
    └── globals.css
3.2 파일 명명 규칙
타입스크립트// 컴포넌트: PascalCase
Button.tsx
UserProfile.tsx
BiographyProjectCard.tsx

// Hooks: camelCase with 'use' prefix
useAuth.ts
useDebounce.ts
useBiographyProject.ts

// 유틸리티: camelCase
formatDate.ts
validateEmail.ts
supabaseClient.ts

// 상수: UPPER_SNAKE_CASE (파일명은 camelCase)
// constants.ts 내부:
export const MAX_FILE_SIZE = 5 * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']

// 타입/인터페이스: PascalCase
interface UserProfile { }
type BiographyStatus = 'draft' | 'published'
3.3 컴포넌트 구조 원칙
서버 컴포넌트 vs 클라이언트 컴포넌트
타입스크립트// ✅ 서버 컴포넌트 (기본) - 'use client' 없음
// - 데이터 페칭
// - 인증 확인
// - SEO가 중요한 페이지

// src/app/(main)/biography/page.tsx
import { createClient } from '@/lib/supabase/server'
import { ProjectCard } from '@/components/features/biography/ProjectCard'

export default async function BiographyPage() {
  const supabase = createClient()
  const { data: projects } = await supabase
    .from('biography_projects')
    .select('*')
  
  return (
    <div>
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
타입스크립트// ✅ 클라이언트 컴포넌트 - 'use client' 필수
// - useState, useEffect 등 React Hooks 사용
// - 이벤트 핸들러
// - 브라우저 전용 API (localStorage, window)

// src/components/ui/Button.tsx
'use client'

import { useState } from 'react'

export function Button({ onClick, children }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {
    setIsLoading(true)
    await onClick?.()
    setIsLoading(false)
  }
  
  return <button onClick={handleClick}>{children}</button>
}
컴포넌트 분리 원칙
타입스크립트// ❌ BAD: 하나의 거대한 컴포넌트
function BiographyPage() {
  // 500줄의 코드...
  return (
    <div>
      {/* 복잡한 UI */}
    </div>
  )
}

// ✅ GOOD: 작고 명확한 책임을 가진 컴포넌트들
function BiographyPage() {
  return (
    <div>
      <BiographyHeader />
      <BiographyProjectList />
      <BiographyFooter />
    </div>
  )
}

// 각 컴포넌트는 별도 파일로
단일 책임 원칙:

하나의 컴포넌트는 하나의 기능만
200줄 이상이면 분리 고려
재사용 가능한 부분은 추출

3.4 Import 순서
타입스크립트// 1. React 및 Next.js
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// 2. 외부 라이브러리
import { createClient } from '@supabase/supabase-js'
import { Mic, Play, Stop } from 'lucide-react'

// 3. 내부 라이브러리/유틸리티
import { createClient as createSupabaseClient } from '@/lib/supabase/client'
import { cn, formatDate } from '@/lib/utils'

// 4. 컴포넌트
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProjectCard } from '@/components/features/biography/ProjectCard'

// 5. 타입
import type { BiographyProject, User } from '@/types'

// 6. 스타일 (필요 시)
import styles from './styles.module.css'

4. AI 소통 원칙 (프롬프트 엔지니어링)
4.1 효과적인 AI 협업 패턴
패턴 1: 컨텍스트 먼저 제공
❌ BAD:
"버튼 컴포넌트 만들어줘"

✅ GOOD:
"기억책방 프로젝트의 Design System 문서를 참고해서
시니어 친화적인 버튼 컴포넌트를 만들어줘.

요구사항:
- Primary, Secondary, Ghost 변형 지원
- 기본 높이 48px (시니어용)
- 로딩 상태 표시 기능
- TypeScript로 작성
- Tailwind CSS 사용
- forwardRef 지원

Design System 섹션 6.1을 참고해."
패턴 2: 단계별로 요청
❌ BAD:
"자서전 기능 전체를 만들어줘"

✅ GOOD:
"자서전 기능을 단계별로 구현하자.

1단계: 프로젝트 생성 페이지 먼저 만들어줘
- DB Schema 섹션 4.2.1 참고
- TASKS 문서 M3.1 참고
- 폼 검증 포함

완료하면 2단계로 넘어갈게."
패턴 3: 예시 제공
✅ GOOD:
"Button 컴포넌트처럼 Input 컴포넌트도 만들어줘.

참고할 기존 코드:
[Button 컴포넌트 코드 붙여넣기]

동일한 패턴으로:
- variant 대신 size prop 사용
- error prop으로 에러 상태 표시
- helperText prop 추가"
4.2 AI에게 명확한 제약사항 전달
타입스크립트// ✅ 프롬프트 예시:
/*
"사용자 프로필 조회 함수를 만들어줘.

제약사항:
1. 반드시 서버 컴포넌트에서만 사용
2. Supabase RLS 정책 활용
3. 에러 핸들링 필수
4. TypeScript 타입 명시
5. try-catch로 감싸기
6. null 체크 필수

함수 시그니처:
async function getUserProfile(userId: string): Promise<UserProfile | null>
"
*/

// AI가 생성한 코드:
import { createClient } from '@/lib/supabase/server'
import type { UserProfile } from '@/types'

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('프로필 조회 오류:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('예상치 못한 오류:', error)
    return null
  }
}
4.3 AI 협업 시 체크리스트
코드 생성 요청 시:

 관련 문서 섹션 명시했는가?
 기술 스택 명시했는가? (Next.js 15, TypeScript 등)
 제약사항을 명확히 전달했는가?
 예상 입출력을 설명했는가?

코드 검토 시:

 TypeScript 타입이 올바른가?
 에러 핸들링이 있는가?
 보안 이슈가 없는가?
 성능 문제가 없는가?
 접근성을 고려했는가?

4.4 AI에게 코드 리뷰 요청하기
"다음 코드를 리뷰해줘. 특히 다음 항목을 중점적으로 확인해줘:

1. 보안 취약점 (SQL Injection, XSS 등)
2. 성능 이슈 (불필요한 리렌더링, 메모리 누수)
3. 접근성 (ARIA 속성, 키보드 네비게이션)
4. 에러 핸들링 누락
5. TypeScript 타입 안정성

[코드 붙여넣기]

각 항목에 대해 구체적인 개선 제안과 수정된 코드를 제공해줘."

5. 코드 품질 및 보안
5.1 TypeScript 사용 원칙
타입 정의
타입스크립트// ❌ BAD: any 사용
function processData(data: any) {
  return data.name
}

// ✅ GOOD: 명확한 타입
interface UserData {
  name: string
  age: number
  email: string
}

function processData(data: UserData): string {
  return data.name
}

// ✅ GOOD: 제네릭 활용
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}

const user = await fetchData<UserData>('/api/user')
// user는 UserData 타입으로 추론됨
널 세이프티
타입스크립트// ❌ BAD: null 체크 없음
function getUserName(user: User) {
  return user.profile.name.toUpperCase() // 오류 가능성
}

// ✅ GOOD: Optional chaining
function getUserName(user: User | null): string {
  return user?.profile?.name?.toUpperCase() ?? '이름 없음'
}

// ✅ GOOD: 타입 가드
function isValidUser(user: User | null): user is User {
  return user !== null && user.id !== undefined
}

if (isValidUser(user)) {
  // 여기서 user는 User 타입으로 좁혀짐
  console.log(user.id)
}
5.2 보안 체크리스트
5.2.1 환경 변수 관리
타입스크립트// ❌ BAD: 하드코딩
const apiKey = 'sk-1234567890abcdef'

// ✅ GOOD: 환경 변수 사용
const apiKey = process.env.OPENAI_API_KEY

// ✅ GOOD: 타입 안전한 환경 변수
// src/lib/env.ts
function getEnvVar(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(`환경 변수 ${key}가 설정되지 않았습니다.`)
  }
  return value
}

export const env = {
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  openaiApiKey: getEnvVar('OPENAI_API_KEY'), // 서버 전용
} as const
환경 변수 규칙:

NEXT_PUBLIC_*: 클라이언트에서 접근 가능 (공개 가능한 정보만)
그 외: 서버 전용 (비밀 키, API 키)

5.2.2 SQL Injection 방지
타입스크립트// ❌ BAD: 문자열 보간
const userId = req.query.id
const { data } = await supabase
  .rpc('get_user', { query: `SELECT * FROM users WHERE id = ${userId}` })

// ✅ GOOD: Parameterized queries (Supabase는 기본적으로 안전)
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
5.2.3 XSS 방지
타입스크립트// ❌ BAD: dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD: 텍스트로 렌더링 (React가 자동 이스케이프)
<div>{userInput}</div>

// ✅ GOOD: 필요시 sanitize 라이브러리 사용
import DOMPurify from 'isomorphic-dompurify'

const sanitizedHtml = DOMPurify.sanitize(userInput)
<div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
5.2.4 인증 및 권한 확인
타입스크립트// ✅ 서버 컴포넌트에서 인증 확인
// src/app/(main)/biography/[id]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function BiographyDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = createClient()
  
  // 1. 인증 확인
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    redirect('/login')
  }
  
  // 2. 권한 확인 - 본인의 프로젝트인지
  const { data: project, error } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id) // RLS 정책으로도 보호되지만 명시적 확인
    .single()
  
  if (error || !project) {
    redirect('/biography') // 권한 없음
  }
  
  return <div>{/* 프로젝트 상세 */}</div>
}
5.2.5 속도 제한
타입스크립트// src/app/api/ai/transcribe/route.ts
import { ratelimit } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  
  // IP당 분당 5회 제한
  const { success, remaining } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response('Too Many Requests', { 
      status: 429,
      headers: { 'X-RateLimit-Remaining': remaining.toString() }
    })
  }
  
  // 실제 로직...
}
5.3 코드 품질 원칙
5.3.1 함수는 한 가지 일만
타입스크립트// ❌ BAD: 여러 책임
async function handleSubmit() {
  const isValid = validateForm()
  if (!isValid) return
  
  const data = await saveToDatabase()
  if (!data) return
  
  sendEmail()
  updateUI()
  trackAnalytics()
  showNotification()
}

// ✅ GOOD: 단일 책임
async function handleSubmit() {
  if (!validateForm()) return
  
  const data = await saveData()
  if (!data) return
  
  await handlePostSave(data)
}

async function handlePostSave(data: SavedData) {
  await Promise.all([
    sendConfirmationEmail(data),
    trackSaveEvent(data),
  ])
  
  showSuccessNotification()
}
5.3.2 조기 복귀
타입스크립트// ❌ BAD: 중첩된 if
function processUser(user: User | null) {
  if (user) {
    if (user.isActive) {
      if (user.email) {
        return sendEmail(user.email)
      }
    }
  }
  return null
}

// ✅ GOOD: Early return
function processUser(user: User | null) {
  if (!user) return null
  if (!user.isActive) return null
  if (!user.email) return null
  
  return sendEmail(user.email)
}
5.3.3 매직 넘버 제거
타입스크립트// ❌ BAD: 매직 넘버
if (file.size > 5242880) {
  throw new Error('파일이 너무 큽니다')
}

setTimeout(() => {}, 300000)

// ✅ GOOD: 상수로 정의
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const FIVE_MINUTES = 5 * 60 * 1000

if (file.size > MAX_FILE_SIZE) {
  throw new Error(`파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB 이하여야 합니다`)
}

setTimeout(() => {}, FIVE_MINUTES)
5.3.4 주석 작성 가이드
타입스크립트// ❌ BAD: 코드를 그대로 설명
// i를 1 증가시킴
i++

// ❌ BAD: 불필요한 주석
// 사용자 이름을 반환하는 함수
function getUserName() { }

// ✅ GOOD: Why를 설명
// 한글 이름은 2글자씩 띄어쓰기를 추가 (가독성 향상)
const formattedName = name.split('').join(' ')

// ✅ GOOD: 복잡한 로직 설명
// Supabase RLS는 첫 번째 쿼리에서만 적용되므로,
// 관련된 데이터를 단일 쿼리로 가져와야 함
const { data } = await supabase
  .from('projects')
  .select('*, chapters(*)')

// ✅ GOOD: TODO, FIXME, HACK 활용
// TODO: 나중에 Redis 캐싱 추가
// FIXME: 가끔 타임아웃 발생 - 원인 파악 필요
// HACK: 임시 해결책, 나중에 리팩토링 필요

6. 테스트 및 디버깅
6.1 테스트 전략
6.1.1 테스트 피라미드
         /\        E2E Tests (소수)
        /  \       - 주요 사용자 플로우
       /____\      - 결제, 회원가입 등
      /      \     
     / Unit & \    Integration Tests (다수)
    / Component \  - 개별 함수, 컴포넌트
   /_____________\ - API 엔드포인트
6.1.2 수동 테스트 체크리스트
새 기능 개발 후 필수 확인:

 해피 패스가 작동하는가?
 에러 케이스를 처리하는가?
 빈 값/null/undefined 처리되는가?
 로딩 상태가 표시되는가?
 에러 메시지가 사용자 친화적인가?
 모바일에서 작동하는가?
 키보드로 네비게이션 가능한가?
 스크린 리더에서 읽히는가?

6.2 디버깅 전략
6.2.1 로깅 규칙
타입스크립트// ❌ BAD: console.log 남발
console.log('data', data)
console.log('error', error)
console.log('test')

// ✅ GOOD: 의미 있는 로깅
console.error('[UserProfile] 프로필 조회 실패:', {
  userId,
  error: error.message,
  timestamp: new Date().toISOString(),
})

// ✅ GOOD: 개발 환경에서만
if (process.env.NODE_ENV === 'development') {
  console.log('[DEBUG] API Response:', data)
}

// ✅ GOOD: 구조화된 로깅 (프로덕션)
import { logger } from '@/lib/logger'

logger.error('프로필 조회 실패', {
  userId,
  error: error.message,
  stack: error.stack,
})
6.2.2 에러 핸들링 패턴
타입스크립트// ✅ API Route 에러 핸들링
// src/app/api/biography/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // 입력 검증
    if (!body.title) {
      return NextResponse.json(
        { error: '제목은 필수입니다' },
        { status: 400 }
      )
    }
    
    // 비즈니스 로직
    const result = await createProject(body)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('[API] 프로젝트 생성 실패:', error)
    
    // 사용자에게는 일반적인 메시지
    return NextResponse.json(
      { error: '프로젝트 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}
타입스크립트// ✅ 클라이언트 컴포넌트 에러 핸들링
'use client'

import { useState } from 'react'

export function CreateProjectForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/biography', {
        method: 'POST',
        body: JSON.stringify({ title }),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '오류가 발생했습니다')
      }
      
      // 성공 처리
      router.push('/biography')
      
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-lg">
          {error}
        </div>
      )}
      {/* 폼 필드들 */}
    </form>
  )
}
6.2.3 React DevTools 활용
타입스크립트// 컴포넌트 디버깅용 displayName
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />
  }
)
Button.displayName = 'Button' // DevTools에서 식별 용이

// 성능 측정
import { Profiler } from 'react'

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number,
) {
  console.log(`${id} ${phase}: ${actualDuration}ms`)
}

<Profiler id="BiographyList" onRender={onRenderCallback}>
  <BiographyList />
</Profiler>
6.3 성능 모니터링
타입스크립트// 로딩 성능 측정
export default function Page() {
  useEffect(() => {
    const perfData = performance.getEntriesByType('navigation')[0]
    console.log('페이지 로드 시간:', perfData.duration)
  }, [])
  
  return <div>...</div>
}

// API 응답 시간 측정
async function fetchData() {
  const start = Date.now()
  const data = await fetch('/api/data')
  const duration = Date.now() - start
  
  if (duration > 1000) {
    console.warn(`느린 API 응답: ${duration}ms`)
  }
  
  return data
}

7. Git 워크플로우
7.1 브랜치 전략
main (프로덕션)
  └── develop (개발)
       ├── feature/auth-system
       ├── feature/biography-recorder
       └── feature/community-matching

hotfix/critical-bug → main
7.2 커밋 메시지 규칙
세게 때리다# 형식: <type>(<scope>): <subject>

# Type:
# feat: 새로운 기능
# fix: 버그 수정
# docs: 문서 변경
# style: 코드 포맷팅 (기능 변경 없음)
# refactor: 리팩토링
# test: 테스트 추가
# chore: 빌드, 설정 변경

# 좋은 예시:
feat(auth): 카카오 소셜 로그인 추가
fix(biography): 녹음 중단 시 오류 수정
docs(readme): 설치 가이드 업데이트
refactor(api): Supabase 클라이언트 모듈화
style(button): Tailwind 클래스 정리
test(profile): 프로필 업데이트 테스트 추가
chore(deps): Next.js 15.1.0 업데이트

# 나쁜 예시:
"버그 수정"
"작업 완료"
"업데이트"
7.3 PR (Pull Request) 체크리스트
PR 생성 전:

 코드가 린트 규칙을 통과하는가? (npm run lint)
 타입 체크가 통과하는가? (npm run type-check)
 주요 기능을 수동 테스트했는가?
 불필요한 console.log를 제거했는가?
 커밋 메시지가 규칙에 맞는가?

PR 템플릿:
가격 인하## 변경 사항
- 자서전 음성 녹음 기능 추가
- 챕터 생성 API 구현

## 관련 이슈
Closes #123

## 테스트 방법
1. `/biography/new` 접속
2. "챕터 녹음" 버튼 클릭
3. 마이크 권한 허용
4. 음성 녹음 후 저장

## 스크린샷
[스크린샷 첨부]

## 체크리스트
- [x] 코드 리뷰 준비 완료
- [x] 테스트 통과
- [x] 문서 업데이트
- [ ] 배포 승인 대기

8. 코드 리뷰 체크리스트
8.1 기능성

 요구사항을 충족하는가?
 모든 엣지 케이스를 처리하는가?
 에러 핸들링이 적절한가?

8.2 코드 품질

 코드가 읽기 쉬운가?
 함수가 한 가지 일만 하는가?
 변수/함수명이 명확한가?
 중복 코드가 없는가?
 불필요한 주석이 없는가?

8.3 성능

 불필요한 리렌더링이 없는가?
 데이터베이스 쿼리가 최적화되었는가?
 이미지가 최적화되었는가?
 번들 크기가 적절한가?

8.4 보안

 사용자 입력을 검증하는가?
 SQL Injection 위험이 없는가?
 XSS 위험이 없는가?
 민감한 정보가 노출되지 않는가?
 인증/권한이 올바르게 구현되었는가?

8.5 접근성

 키보드로 네비게이션 가능한가?
 ARIA 속성이 적절한가?
 색상 대비가 충분한가?
 alt 텍스트가 있는가?

8.6 테스트

 수동 테스트를 수행했는가?
 모바일에서 확인했는가?
 다양한 브라우저에서 확인했는가?


9. 일반적인 실수 및 해결책
9.1 서버/클라이언트 컴포넌트 혼동
타입스크립트// ❌ 문제: 서버 컴포넌트에서 useState 사용
export default function Page() {
  const [count, setCount] = useState(0) // 오류!
  return <div>{count}</div>
}

// ✅ 해결: 'use client' 추가
'use client'
export default function Page() {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}
9.2 비동기 상태 관리 실수
타입스크립트// ❌ 문제: 비동기 완료 전 상태 사용
const [data, setData] = useState(null)

async function fetchData() {
  const result = await fetch('/api/data')
  setData(result)
  console.log(data) // null! (이전 값)
}

// ✅ 해결: 반환값 사용 또는 useEffect
async function fetchData() {
  const result = await fetch('/api/data')
  setData(result)
  console.log(result) // 올바른 값
}
9.3 의존성 배열 누락
타입스크립트// ❌ 문제: 의존성 배열 누락
useEffect(() => {
  fetchData(userId)
}, []) // userId 변경 시 재실행 안됨!

// ✅ 해결: 모든 의존성 추가
useEffect(() => {
  fetchData(userId)
}, [userId])
9.4 메모리 누수
타입스크립트// ❌ 문제: 클린업 없음
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick')
  }, 1000)
}, [])

// ✅ 해결: 클린업 함수 반환
useEffect(() => {
  const interval = setInterval(() => {
    console.log('tick')
  }, 1000)
  
  return () => clearInterval(interval)
}, [])

10. AI 협업 Best Practices 요약
10.1 DO (해야 할 것)
✅ 명확한 컨텍스트 제공
"Design System 문서 섹션 6.1을 참고해서 
Next.js 15, TypeScript, Tailwind로 
시니어 친화적인 Button 컴포넌트를 만들어줘"
✅ 단계별 진행
1단계 완료 → 검증 → 2단계 진행
✅ 제약사항 명시
"반드시 서버 컴포넌트로 작성
RLS 정책 활용
에러 핸들링 필수"
✅ 코드 리뷰 요청
"보안, 성능, 접근성 측면에서 리뷰해줘"
✅ 예시 제공
"이 패턴과 동일하게: [기존 코드]"
10.2 DON'T (하지 말아야 할 것)
❌ 맹목적 복사-붙여넣기
이해하지 못한 코드는 사용하지 않기
❌ 한 번에 모든 것 요청
"전체 앱 만들어줘" → 분할 요청
❌ 테스트 없이 배포
AI 코드도 반드시 검증
❌ 보안 체크 생략
인증, 권한, 입력 검증은 필수

11. 빠른 참조 (Quick Reference)
명령어
세게 때리다# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 타입 체크
npm run type-check

# 린트
npm run lint

# 린트 자동 수정
npm run lint:fix

# Prettier 포맷팅
npm run format

# Supabase 타입 생성
npx supabase gen types typescript --project-id [ID] > src/types/database.types.ts
주요 파일 경로
설정: tsconfig.json, .eslintrc.json, .prettierrc
타입: src/types/
컴포넌트: src/components/ui/, src/components/features/
유틸: src/lib/
API: src/app/api/
페이지: src/app/(main)/, src/app/(auth)/
유용한 리소스
Next.js 문서: https://nextjs.org/docs
Supabase 문서: https://supabase.com/docs
Tailwind CSS: https://tailwindcss.com/docs
TypeScript: https://www.typescriptlang.org/docs

12. 체크리스트 요약
코드 작성 전

 관련 문서(PRD, TRD, Design System) 확인
 요구사항 명확히 이해
 기술 스택 확인 (Next.js 15, TypeScript 등)

코드 작성 중

 TypeScript 타입 정의
 에러 핸들링 추가
 접근성 고려
 보안 체크
 성능 고려

코드 작성 후

 수동 테스트
 타입 체크 (npm run type-check)
 린트 (npm run lint)
 코드 리뷰 (자가 또는 AI)
 Git 커밋

배포 전

 모든 테스트 통과
 프로덕션 빌드 성공
 환경 변수 확인
 보안 감사
 성능 측정


변경 이력
버전날짜변경 내용작성자1.02025년 12월 29일초안 작성

문서 버전: v1.0
최종 업데이트: 2025년 12월 29일
다음 검토 예정일: Phase 1 개발 시작 시
문서 상태: ✅ 검토 완료

부록: 코드 스니펫 모음
A. 자주 사용하는 패턴
A.1 인증이 필요한 서버 컴포넌트
타입스크립트import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  return <div>Protected Content</div>
}
A.2 데이터 페칭 with 로딩/에러
타입스크립트'use client'

import { useState, useEffect } from 'react'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (loading) return <div>로딩 중...</div>
  if (error) return <div>오류: {error}</div>
  if (!data) return <div>데이터 없음</div>
  
  return <div>{/* 데이터 렌더링 */}</div>
}
A.3 폼 제출 with 검증
타입스크립트'use client'

import { useState } from 'react'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다'),
})

export function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 검증
    const result = schema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }
    
    // 제출 로직
    // ...
  }
  
  return <form onSubmit={handleSubmit}>{/* 폼 필드 */}</form>
}