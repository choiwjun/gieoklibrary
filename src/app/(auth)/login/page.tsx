'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // 유효성 검사
    if (!formData.email.trim()) {
      setErrors({ email: '이메일을 입력해주세요.' })
      return
    }

    if (!formData.password) {
      setErrors({ password: '비밀번호를 입력해주세요.' })
      return
    }

    setIsLoading(true)

    try {
      // 1. 로그인
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        // 보안을 위해 구체적인 에러를 노출하지 않음
        setErrors({ general: '이메일 또는 비밀번호가 올바르지 않습니다.' })
        return
      }

      // 2. 프로필 업데이트 (last_login_at, login_count)
      if (data.user) {
        try {
          // 현재 login_count 조회
          const { data: profile, error: fetchError } = await supabase
            .from('user_profiles')
            .select('login_count')
            .eq('user_id', data.user.id)
            .single()

          if (fetchError) {
            console.error('프로필 조회 오류:', fetchError)
          }

          // last_login_at과 login_count 업데이트
          const { error: updateError } = await supabase
            .from('user_profiles')
            .update({
              last_login_at: new Date().toISOString(),
              login_count: (profile?.login_count || 0) + 1,
            })
            .eq('user_id', data.user.id)

          if (updateError) {
            console.error('프로필 업데이트 오류:', updateError)
          }
        } catch (profileError) {
          // 프로필 업데이트 실패해도 로그인은 성공으로 처리
          console.error('프로필 처리 중 오류:', profileError)
        }
      }

      // 3. 성공 시 대시보드로 이동
      router.push('/dashboard')
      router.refresh()
    } catch (error: unknown) {
      const err = error as Error
      setErrors({ general: err.message || '로그인 중 오류가 발생했습니다.' })
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

        {/* 로그인 폼 */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-secondary-900">로그인</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              required
              autoComplete="current-password"
            />

            {errors.general && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <p className="mt-6 text-center text-secondary-600">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="font-medium text-primary-600 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
