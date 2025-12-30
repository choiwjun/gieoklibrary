import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'

interface ChapterListCardProps {
  chapter: any
  projectId: string
}

export function ChapterListCard({ chapter, projectId }: ChapterListCardProps) {
  const statusLabels: Record<string, string> = {
    draft: '초안',
    processing: 'AI 처리 중',
    completed: '완료',
    failed: '처리 실패',
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-secondary-100 text-secondary-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-success-100 text-success-700',
    failed: 'bg-error-100 text-error-700',
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return '0초'
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (minutes > 0) {
      return `${minutes}분 ${secs}초`
    }
    return `${secs}초`
  }

  const audioRecording = chapter.audio_recordings?.[0]

  return (
    <Link href={`/biography/${projectId}/chapters/${chapter.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* 챕터 번호 */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-secondary-500">
                  챕터 {chapter.chapter_number}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[chapter.status] || statusColors.draft
                  }`}
                >
                  {statusLabels[chapter.status] || statusLabels.draft}
                </span>
              </div>

              {/* 제목 */}
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                {chapter.title || '제목 없음'}
              </h3>

              {/* 날짜 */}
              <p className="text-sm text-secondary-600 mb-3">{formatDate(chapter.created_at)}</p>

              {/* 미리보기 텍스트 */}
              {chapter.ai_generated_summary && (
                <p className="text-secondary-700 line-clamp-2 mb-4">
                  {chapter.ai_generated_summary}
                </p>
              )}

              {/* 메타 정보 */}
              <div className="flex items-center gap-4 text-sm text-secondary-500">
                {audioRecording && (
                  <>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
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
                      <span>{formatDuration(audioRecording.duration_seconds)}</span>
                    </div>

                    {chapter.word_count && chapter.word_count > 0 && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>{chapter.word_count.toLocaleString()}자</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* 재생 버튼 (나중에 구현) */}
            {audioRecording && chapter.status === 'completed' && (
              <button
                className="ml-4 w-12 h-12 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  // TODO: 인라인 오디오 재생
                }}
              >
                <svg
                  className="w-6 h-6 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}

            {/* AI 처리 중 표시 */}
            {chapter.status === 'processing' && (
              <div className="ml-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
