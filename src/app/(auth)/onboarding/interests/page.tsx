'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

interface Interest {
  id: string
  icon: string
  title: string
  description: string
}

const INTERESTS: Interest[] = [
  {
    id: 'biography',
    icon: '🎤',
    title: 'AI 음성 자서전',
    description: '당신의 인생 이야기를 AI가 자서전으로 만들어드립니다',
  },
  {
    id: 'video_letter',
    icon: '📹',
    title: '영상 편지',
    description: '소중한 사람에게 영상 메시지를 미래에 전달하세요',
  },
  {
    id: 'community',
    icon: '👥',
    title: '동네 친구 찾기',
    description: '가까운 곳에서 새로운 친구를 만나보세요',
  },
  {
    id: 'career',
    icon: '💼',
    title: '경력 활용',
    description: '당신의 경험을 나누고 새로운 기회를 찾아보세요',
  },
  {
    id: 'vault',
    icon: '🔐',
    title: '디지털 금고',
    description: '가족에게 전할 중요한 정보를 안전하게 보관하세요',
  },
]

export default function OnboardingInterestsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId]
    )
    setError('')
  }

  const handleSubmit = async () => {
    // 최소 1개 선택 검증
    if (selectedInterests.length === 0) {
      setError('최소 1개 이상의 관심 기능을 선택해주세요.')
      return
    }

    setIsLoading(true)

    try {
      // 현재 사용자 확인
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      // Step 2에서 저장한 정보 가져오기
      const savedInfo = sessionStorage.getItem('onboarding_info')
      if (!savedInfo) {
        router.push('/onboarding/info')
        return
      }

      const infoData = JSON.parse(savedInfo)

      // 프로필 정보 업데이트
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          full_name: infoData.full_name,
          birth_date: infoData.birth_date,
          address_sido: infoData.address_sido,
          address_sigungu: infoData.address_sigungu,
          interests: selectedInterests,
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)

      if (updateError) {
        throw updateError
      }

      // 세션 스토리지 정리
      sessionStorage.removeItem('onboarding_info')

      // 완료 후 대시보드로 이동
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('온보딩 완료 오류:', error)
      setError('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">기억책방</h1>
          </Link>
          <p className="text-lg text-secondary-600">관심 있는 기능을 선택해주세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">관심 기능</h2>
            <p className="text-secondary-600">
              관심 있는 기능을 선택하시면 홈 화면에 우선 표시됩니다
            </p>
          </div>

          {/* 관심 기능 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id)
              return (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    relative p-6 rounded-xl border-2 text-left transition-all duration-200
                    ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50 shadow-md'
                        : 'border-secondary-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
                    }
                  `}
                >
                  {/* 체크 표시 */}
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* 아이콘 */}
                  <div className="text-4xl mb-3">{interest.icon}</div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-secondary-900 mb-2">
                    {interest.title}
                  </h3>

                  {/* 설명 */}
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {interest.description}
                  </p>
                </button>
              )
            })}
          </div>

          {/* 안내 문구 */}
          <p className="text-sm text-secondary-500 mb-4">
            최소 1개 이상 선택해주세요. 나중에 설정에서 변경할 수 있습니다.
          </p>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
          )}

          {/* 버튼 그룹 */}
          <div className="flex gap-3 pt-4">
            <Link href="/onboarding/info" className="flex-1">
              <Button type="button" variant="secondary" size="lg" fullWidth>
                이전
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              size="lg"
              fullWidth
              isLoading={isLoading}
              className="flex-1"
            >
              완료하기 ✓
            </Button>
          </div>
        </div>

        {/* 진행 표시 */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-8 h-1 rounded-full bg-primary-400"></div>
          <div className="w-8 h-1 rounded-full bg-primary-400"></div>
          <div className="w-8 h-1 rounded-full bg-primary-600"></div>
          <span className="ml-3 text-sm text-secondary-600 font-medium">3 / 3</span>
        </div>
      </div>
    </div>
  )
}
