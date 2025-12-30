import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-2xl text-center">
        {/* 로고 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-600 mb-4">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-primary-600 mb-2">기억책방</h1>
          <p className="text-lg text-secondary-500">AI 기반 시니어 라이프 케어</p>
        </div>

        {/* 메인 헤드라인 */}
        <h2 className="text-4xl font-bold text-secondary-900 mb-6 leading-tight">
          당신의 소중한 이야기를
          <br />
          <span className="text-primary-600">기억합니다</span>
        </h2>

        <p className="text-xl text-secondary-600 mb-12 leading-relaxed">
          AI로 기록하는 생애 자서전 플랫폼.
          <br />
          지매 예방부터 가족과의 소통까지, 기억책방이 함께합니다.
        </p>

        {/* 핵심 가치 제안 */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center justify-center space-x-3 text-lg text-secondary-700">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-2xl">
              🎤
            </div>
            <p className="flex-1 text-left max-w-md">
              <strong className="text-secondary-900">AI 음성 자서전</strong> - 당신의 소중한 이야기를
              기록합니다
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 text-lg text-secondary-700">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-2xl">
              👨‍👩‍👧‍👦
            </div>
            <p className="flex-1 text-left max-w-md">
              <strong className="text-secondary-900">가족 소통 강화</strong> - 가족과 함께 추억을 나눕니다
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 text-lg text-secondary-700">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-2xl">
              🤝
            </div>
            <p className="flex-1 text-left max-w-md">
              <strong className="text-secondary-900">동네 친구 연결</strong> - 새로운 친구와 기회를
              연결합니다
            </p>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding/info">
            <Button size="xl" className="min-w-[200px]">
              회원가입 시작하기 →
            </Button>
          </Link>
          <Link href="/login">
            <Button size="xl" variant="secondary" className="min-w-[200px]">
              로그인
            </Button>
          </Link>
        </div>

        {/* 하단 진행 표시 */}
        <div className="mt-16 flex items-center justify-center space-x-2">
          <div className="w-8 h-1 rounded-full bg-primary-600"></div>
          <div className="w-8 h-1 rounded-full bg-secondary-200"></div>
          <div className="w-8 h-1 rounded-full bg-secondary-200"></div>
          <span className="ml-3 text-sm text-secondary-500">1 / 3</span>
        </div>
      </div>
    </div>
  )
}
