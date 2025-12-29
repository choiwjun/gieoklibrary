import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface BiographyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BiographyDetailPage({ params }: BiographyDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  // 프로젝트 조회
  const { data: project, error: projectError } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (projectError || !project) {
    redirect('/biography')
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-secondary-900">{project.title}</h1>
        {project.subtitle && <p className="text-lg text-secondary-600">{project.subtitle}</p>}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>프로젝트 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-secondary-600">상태</dt>
                <dd className="mt-1 text-base text-secondary-900">
                  {project.status === 'draft' && '초안'}
                  {project.status === 'in_progress' && '진행중'}
                  {project.status === 'completed' && '완료'}
                  {project.status === 'published' && '출판됨'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-secondary-600">진행률</dt>
                <dd className="mt-1 text-base text-secondary-900">
                  {project.completion_percentage}%
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-secondary-600">챕터 수</dt>
                <dd className="mt-1 text-base text-secondary-900">{project.total_chapters}개</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-secondary-600">총 단어 수</dt>
                <dd className="mt-1 text-base text-secondary-900">
                  {project.total_words.toLocaleString()}자
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-secondary-600">생성일</dt>
                <dd className="mt-1 text-base text-secondary-900">
                  {new Date(project.created_at).toLocaleDateString('ko-KR')}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>다음 단계</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-secondary-600">
              이제 자서전 작성을 시작할 수 있습니다. 챕터를 추가하여 나의 이야기를 기록해보세요.
            </p>
            <div className="flex gap-3">
              <Link href="/biography">
                <Button variant="secondary">목록으로</Button>
              </Link>
              <Link href={`/biography/${id}/chapter/new`}>
                <Button>챕터 추가</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
