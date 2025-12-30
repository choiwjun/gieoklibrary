import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  status: string
  action: string
  href: string
  isPriority?: boolean
}

export function FeatureCard({
  icon,
  title,
  description,
  status,
  action,
  href,
  isPriority = false,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block group">
      <Card
        className={`
          h-full transition-all duration-200 hover:shadow-xl hover:scale-105
          ${isPriority ? 'border-2 border-primary-300 bg-primary-50/30' : ''}
        `}
      >
        <CardContent className="p-6">
          {/* 우선순위 뱃지 */}
          {isPriority && (
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                관심 기능
              </span>
            </div>
          )}

          {/* 아이콘 */}
          <div className="text-5xl mb-4">{icon}</div>

          {/* 제목 */}
          <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>

          {/* 설명 */}
          <p className="text-secondary-600 mb-4 leading-relaxed">{description}</p>

          {/* 상태 */}
          <div className="mb-4 flex items-center text-sm text-secondary-500">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {status}
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
            <span>{action}</span>
            <svg
              className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
