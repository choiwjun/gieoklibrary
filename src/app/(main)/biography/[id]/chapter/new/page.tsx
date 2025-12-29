import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ChapterRecorder } from '@/components/features/biography/ChapterRecorder'

interface NewChapterPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NewChapterPage({ params }: NewChapterPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 프로젝트 존재 확인
  const { data: project } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!project) redirect('/biography')

  // 다음 챕터 번호 계산
  const { count } = await supabase
    .from('biography_chapters')
    .select('*', { count: 'exact', head: true })
    .eq('project_id', id)

  const nextChapterNumber = (count || 0) + 1

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-2 text-3xl font-bold text-secondary-900">
        챕터 {nextChapterNumber} 녹음하기
      </h1>
      <p className="mb-8 text-lg text-secondary-600">AI의 질문에 답하며 이야기를 녹음해보세요</p>

      <ChapterRecorder projectId={id} userId={user.id} chapterNumber={nextChapterNumber} />
    </div>
  )
}
