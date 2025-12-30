'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingInfoPage() {
  const router = useRouter()
  const supabase = createClient()
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    address_sido: '',
    address_sigungu: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 이름 검증 (2자 이상)
    if (!formData.full_name.trim()) {
      newErrors.full_name = '이름을 입력해주세요.'
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = '이름은 2자 이상이어야 합니다.'
    }

    // 생년월일 검증 (18세 이상)
    if (!formData.birth_date) {
      newErrors.birth_date = '생년월일을 선택해주세요.'
    } else {
      const birthDate = new Date(formData.birth_date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      const dayDiff = today.getDate() - birthDate.getDate()

      const calculatedAge =
        monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age

      if (calculatedAge < 18) {
        newErrors.birth_date = '만 18세 이상만 가입 가능합니다.'
      }
    }

    // 지역 검증
    if (!formData.address_sido.trim()) {
      newErrors.address_sido = '시/도를 입력해주세요.'
    }
    if (!formData.address_sigungu.trim()) {
      newErrors.address_sigungu = '시/군/구를 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
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

      // 프로필 정보 저장 (세션 스토리지에 임시 저장)
      sessionStorage.setItem('onboarding_info', JSON.stringify(formData))

      // Step 3으로 이동
      router.push('/onboarding/interests')
    } catch (error) {
      console.error('정보 저장 오류:', error)
      setErrors({ general: '정보 저장 중 오류가 발생했습니다.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="w-full max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary-600 mb-2">기억책방</h1>
          </Link>
          <p className="text-lg text-secondary-600">기본 정보를 입력해주세요</p>
        </div>

        {/* 폼 카드 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">기본 정보</h2>
            <p className="text-secondary-600">서비스 이용을 위한 기본 정보를 입력해주세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 */}
            <Input
              type="text"
              label="이름"
              placeholder="홍길동"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name: e.target.value,
                })
              }
              error={errors.full_name}
              required
              autoComplete="name"
            />

            {/* 생년월일 */}
            <div>
              <Input
                type="date"
                label="생년월일"
                value={formData.birth_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    birth_date: e.target.value,
                  })
                }
                error={errors.birth_date}
                required
                max={new Date().toISOString().split('T')[0]}
              />
              <p className="mt-1 text-sm text-secondary-500">만 18세 이상만 가입 가능합니다</p>
            </div>

            {/* 거주 지역 */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-secondary-700">
                거주 지역 <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="시/도"
                  placeholder="서울특별시"
                  value={formData.address_sido}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address_sido: e.target.value,
                    })
                  }
                  error={errors.address_sido}
                  required
                />

                <Input
                  type="text"
                  label="시/군/구"
                  placeholder="강남구"
                  value={formData.address_sigungu}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address_sigungu: e.target.value,
                    })
                  }
                  error={errors.address_sigungu}
                  required
                />
              </div>
              <p className="text-sm text-secondary-500">
                동네 친구 찾기 기능에 활용됩니다
              </p>
            </div>

            {/* 에러 메시지 */}
            {errors.general && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            {/* 버튼 그룹 */}
            <div className="flex gap-3 pt-4">
              <Link href="/onboarding/welcome" className="flex-1">
                <Button type="button" variant="secondary" size="lg" fullWidth>
                  이전
                </Button>
              </Link>
              <Button type="submit" size="lg" fullWidth isLoading={isLoading} className="flex-1">
                다음 →
              </Button>
            </div>
          </form>
        </div>

        {/* 진행 표시 */}
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="w-8 h-1 rounded-full bg-primary-400"></div>
          <div className="w-8 h-1 rounded-full bg-primary-600"></div>
          <div className="w-8 h-1 rounded-full bg-secondary-200"></div>
          <span className="ml-3 text-sm text-secondary-600 font-medium">2 / 3</span>
        </div>
      </div>
    </div>
  )
}
