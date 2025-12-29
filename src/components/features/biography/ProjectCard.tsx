import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface BiographyProject {
  id: string
  title: string
  subtitle: string | null
  status: 'draft' | 'in_progress' | 'completed' | 'published'
  completion_percentage: number
  created_at: string
}

interface ProjectCardProps {
  project: BiographyProject
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusLabels = {
    draft: '초안',
    in_progress: '진행 중',
    completed: '완료',
    published: '출판됨',
  }

  return (
    <Link href={`/biography/${project.id}`}>
      <Card clickable>
        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <svg
              className="text-primary-500"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700">
              {statusLabels[project.status]}
            </span>
          </div>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>

        <CardContent>
          {project.subtitle && <p className="mb-4 text-secondary-600">{project.subtitle}</p>}

          <div className="flex items-center gap-4 text-sm text-secondary-500">
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>
                {new Date(project.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* 진행률 표시 */}
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-secondary-600">진행률</span>
              <span className="font-medium text-primary-600">{project.completion_percentage}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary-200">
              <div
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${project.completion_percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
