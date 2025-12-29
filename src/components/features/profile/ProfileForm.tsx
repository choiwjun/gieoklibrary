'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface ProfileData {
  full_name: string
  phone_number: string | null
  birth_date: string | null
  address_sido: string | null
  address_sigungu: string | null
  address_detail: string | null
}

interface ProfileFormProps {
  initialData: ProfileData | null
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
          full_name: formData.full_name,
          phone_number: formData.phone_number || null,
          birth_date: formData.birth_date || null,
          address_sido: formData.address_sido || null,
          address_sigungu: formData.address_sigungu || null,
          address_detail: formData.address_detail || null,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)

      if (error) throw error

      setMessage('프로필이 성공적으로 업데이트되었습니다.')
    } catch (error: unknown) {
      const err = error as Error
      setMessage('오류: ' + err.message)
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
            <div
              className={`rounded-lg p-4 text-sm ${
                message.includes('성공')
                  ? 'bg-green-50 text-green-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {message}
            </div>
          )}

          <Button type="submit" size="lg" isLoading={isLoading}>
            저장하기
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
