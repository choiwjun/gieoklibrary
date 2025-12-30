import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ChapterListCard } from '@/components/features/biography/ChapterListCard'

interface ChaptersListPageProps {
  params: Promise<{
    id: string
  }>
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`
  } else if (minutes > 0) {
    return `${minutes}분 ${secs}초`
  } else {
    return `${secs}초`
  }
}

export default async function ChaptersListPage({ params }: ChaptersListPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 프로젝트 정보 조회
  const { data: project } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!project) redirect('/biography')

  // 챕터 목록 조회
  const { data: chapters } = await supabase
    .from('biography_chapters')
    .select(`
      *,
      audio_recordings (
        id,
        file_url,
        duration_seconds,
        transcription_status
      )
    `)
    .eq('project_id', id)
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('chapter_number', { ascending: true })

  // 통계 계산
  const totalChapters = chapters?.length || 0
  const totalDuration =
    chapters?.reduce((sum, ch) => sum + (ch.duration_seconds || 0), 0) || 0
  const completedChapters =
    chapters?.filter((ch) => ch.status === 'completed').length || 0

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <Link href={`/biography/${id}`}>
          <Button variant="ghost" className="mb-4">
            ← 프로젝트로 돌아가기
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-secondary-900 mb-2">{project.title}</h1>
        <p className="text-lg text-secondary-600">녹음한 이야기 목록</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">총 이야기</p>
                <p className="text-3xl font-bold text-secondary-900">{totalChapters}개</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary-600"
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">총 녹음 시간</p>
                <p className="text-3xl font-bold text-secondary-900">
                  {formatDuration(totalDuration)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-success-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-success-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-600 mb-1">완료된 이야기</p>
                <p className="text-3xl font-bold text-secondary-900">{completedChapters}개</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 액션 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-secondary-900">이야기 목록</h2>
        <div className="flex gap-3">
          <Link href={`/biography/${id}/chapter/new`}>
            <Button>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              새 이야기 녹음
            </Button>
          </Link>
          {totalChapters > 0 && (
            <Button variant="secondary">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              PDF 다운로드
            </Button>
          )}
        </div>
      </div>

      {/* 챕터 목록 */}
      {chapters && chapters.length > 0 ? (
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <ChapterListCard key={chapter.id} chapter={chapter} projectId={id} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-secondary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-secondary-900 mb-2">
              아직 녹음한 이야기가 없습니다
            </h3>
            <p className="text-secondary-600 mb-6">
              첫 이야기를 녹음하고 AI가 자서전으로 만들어드립니다
            </p>
            <Link href={`/biography/${id}/chapter/new`}>
              <Button size="lg">첫 이야기 녹음하기</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
