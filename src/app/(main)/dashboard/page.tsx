import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FeatureCard } from '@/components/features/dashboard/FeatureCard'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 사용자 프로필 조회
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

  // 온보딩 체크 - 완료하지 않았으면 온보딩으로 리다이렉트
  if (!profile?.onboarding_completed) {
    redirect('/onboarding/welcome')
  }

  // 사용자 관심사 배열
  const userInterests = profile?.interests || []

  // 모든 기능 카드 정의
  const allFeatures = [
    {
      id: 'biography',
      icon: '🎤',
      title: 'AI 음성 자서전',
      description: '오늘은 어떤 이야기를 들려주실까요?',
      status: biographyCount ? `프로젝트 ${biographyCount}개` : '첫 프로젝트를 시작해보세요',
      action: '녹음 시작',
      href: '/biography',
    },
    {
      id: 'video_letter',
      icon: '📹',
      title: '영상 편지',
      description: '소중한 사람에게 영상 메시지를 남겨보세요',
      status: '준비 중입니다',
      action: '영상 녹화',
      href: '/video-letters',
    },
    {
      id: 'community',
      icon: '👥',
      title: '동네 친구',
      description: '가까운 곳에서 새로운 친구를 만나보세요',
      status: '준비 중입니다',
      action: '친구 찾기',
      href: '/community',
    },
    {
      id: 'career',
      icon: '💼',
      title: '내 경력 활용',
      description: '당신의 경험을 나누고 새로운 기회를 찾아보세요',
      status: '준비 중입니다',
      action: '시작하기',
      href: '/career',
    },
    {
      id: 'vault',
      icon: '🔐',
      title: '디지털 금고',
      description: '가족에게 전할 중요한 정보를 안전하게 보관하세요',
      status: '준비 중입니다',
      action: '금고 열기',
      href: '/vault',
    },
  ]

  // 관심 기능 우선 정렬
  const sortedFeatures = [
    ...allFeatures.filter((f) => userInterests.includes(f.id)),
    ...allFeatures.filter((f) => !userInterests.includes(f.id)),
  ]

  // 오늘 날짜
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })

  return (
    <div>
      {/* 상단 인사말 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-2">
          안녕하세요, {profile?.full_name || '회원'}님 👋
        </h1>
        <p className="text-lg text-secondary-600">{today}</p>
      </div>

      {/* 빠른 시작 섹션 */}
      {biographyCount === 0 && userInterests.includes('biography') && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="text-4xl">🎉</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-secondary-900 mb-2">
                첫 자서전을 시작해보세요!
              </h2>
              <p className="text-secondary-700 mb-4">
                AI가 당신의 이야기를 자서전으로 만들어드립니다. 지금 시작해보세요.
              </p>
              <a
                href="/biography/new"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
              >
                첫 프로젝트 만들기 →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 기능 카드 그리드 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">나의 활동</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeatures.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              status={feature.status}
              action={feature.action}
              href={feature.href}
              isPriority={userInterests.includes(feature.id)}
            />
          ))}
        </div>
      </div>

      {/* 최근 활동 (추후 구현) */}
      {biographyCount && biographyCount > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">최근 활동</h2>
          <div className="rounded-2xl border border-secondary-200 bg-white p-8 text-center">
            <p className="text-secondary-500">최근 활동 내역이 여기 표시됩니다</p>
          </div>
        </div>
      )}
    </div>
  )
}
