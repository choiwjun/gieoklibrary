'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
    if (!formData.fullName.trim()) {
      setErrors({ fullName: '이름을 입력해주세요.' })
      return
    }

    if (!formData.email.trim()) {
      setErrors({ email: '이메일을 입력해주세요.' })
      return
    }

    if (formData.password.length < 8) {
      setErrors({ password: '비밀번호는 최소 8자 이상이어야 합니다.' })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' })
      return
    }

    setIsLoading(true)

    try {
      // 1. Supabase Auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (authError) {
        // 중복 이메일 에러 처리
        if (authError.message.includes('already registered')) {
          setErrors({ email: '이미 가입된 이메일입니다.' })
        } else {
          setErrors({ general: authError.message })
        }
        return
      }

      // Supabase는 이메일 확인 활성화 시 중복 이메일도 성공으로 반환할 수 있음
      // 사용자 객체가 있지만 세션이 없고, identities가 비어있으면 이미 가입된 이메일
      if (authData.user && !authData.session && authData.user.identities?.length === 0) {
        setErrors({ email: '이미 가입된 이메일입니다. 로그인해주세요.' })
        return
      }

      console.warn('회원가입 성공:', authData.user?.id)

      // 2. 세션 확인
      const { data: sessionData } = await supabase.auth.getSession()
      console.warn('세션 확인:', sessionData.session?.user.id)

      // 이메일 확인이 필요한 경우
      if (!authData.session) {
        setErrors({
          general:
            '회원가입이 완료되었습니다! 이메일로 전송된 확인 링크를 클릭해주세요. (개발 중에는 이메일 확인이 비활성화되어야 합니다)',
        })
        setIsLoading(false)
        return
      }

      // 3. 프로필 생성
      if (authData.user && authData.session) {
        const { error: profileError } = await supabase.from('user_profiles').insert({
          user_id: authData.user.id,
          full_name: formData.fullName,
          user_type: 'senior', // 기본값
        })

        if (profileError) {
          console.error('프로필 생성 오류:', {
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
            code: profileError.code,
          })
          setErrors({ general: '프로필 생성 중 오류가 발생했습니다. 관리자에게 문의하세요.' })
          setIsLoading(false)
          return
        } else {
          console.warn('프로필 생성 성공!')
        }
      }

      // 4. 성공 시 대시보드로 이동
      router.push('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      const err = error as Error
      setErrors({ general: err.message || '회원가입 중 오류가 발생했습니다.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-8 text-center">
          <Link href="/">
            <h1 className="mb-2 text-4xl font-bold text-primary-600">기억책방</h1>
          </Link>
          <p className="text-lg text-secondary-600">나의 이야기를 기록하다</p>
        </div>

        {/* 회원가입 폼 */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-secondary-900">회원가입</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              label="이름"
              placeholder="홍길동"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <Input
              type="email"
              label="이메일"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              required
              autoComplete="email"
            />

            <Input
              type="password"
              label="비밀번호"
              placeholder="최소 8자 이상"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              helperText="영문, 숫자를 포함하여 8자 이상 입력해주세요."
              required
              autoComplete="new-password"
            />

            <Input
              type="password"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />

            {errors.general && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              가입하기
            </Button>
          </form>

          <p className="mt-6 text-center text-secondary-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
