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
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // 현재 사용자 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('인증되지 않은 사용자입니다.')

      // 자서전 프로젝트 생성
      const { data, error: insertError } = await supabase
        .from('biography_projects')
        .insert({
          user_id: user.id,
          title: formData.title,
          subtitle: formData.subtitle || null,
          status: 'draft',
          completion_percentage: 0,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // 프로젝트 상세 페이지로 이동
      router.push(`/biography/${data.id}`)
    } catch (error: unknown) {
      const err = error as Error
      setError(err.message || '프로젝트 생성 중 오류가 발생했습니다.')
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

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">{error}</div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" size="lg" onClick={() => router.back()}>
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
}
