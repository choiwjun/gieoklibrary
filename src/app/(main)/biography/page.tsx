import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ProjectCard } from '@/components/features/biography/ProjectCard'

export default async function BiographyPage() {
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 프로젝트 목록 조회
  const { data: projects, error } = await supabase
    .from('biography_projects')
    .select('*')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('프로젝트 목록 조회 오류:', error)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-secondary-900">나의 자서전</h1>
          <p className="text-lg text-secondary-600">소중한 추억을 기록하세요</p>
        </div>

        <Link href="/biography/new">
          <Button size="lg">
            <svg
              className="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            새 프로젝트 만들기
          </Button>
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="mb-6 text-xl text-secondary-500">아직 작성한 자서전이 없습니다</p>
          <Link href="/biography/new">
            <Button size="lg">첫 자서전 시작하기</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
