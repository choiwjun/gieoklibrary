import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { AudioPlayer } from '@/components/ui/AudioPlayer'
import { Card, CardContent } from '@/components/ui/Card'

interface ChapterDetailPageProps {
  params: Promise<{
    id: string
    chapterId: string
  }>
}

export default async function ChapterDetailPage({ params }: ChapterDetailPageProps) {
  const { id, chapterId } = await params
  const supabase = await createClient()

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 챕터 및 오디오 정보 조회
  const { data: chapter, error } = await supabase
    .from('biography_chapters')
    .select(
      `
      *,
      audio_recordings (
        id,
        file_url,
        duration_seconds,
        transcription_status,
        transcription_text
      )
    `
    )
    .eq('id', chapterId)
    .eq('user_id', user.id)
    .single()

  if (error || !chapter) {
    redirect(`/biography/${id}/chapters`)
  }

  const audioRecording = chapter.audio_recordings?.[0]

  // Supabase Storage URL 생성
  const getAudioUrl = (fileUrl: string) => {
    if (!fileUrl) return ''

    // 이미 전체 URL인 경우
    if (fileUrl.startsWith('http')) return fileUrl

    // Storage 경로만 있는 경우
    const { data } = supabase.storage.from('audio-recordings').getPublicUrl(fileUrl)
    return data.publicUrl
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <Link href={`/biography/${id}/chapters`}>
          <Button variant="ghost" className="mb-4">
            ← 목록으로 돌아가기
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-medium text-secondary-500">
            챕터 {chapter.chapter_number}
          </span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              chapter.status === 'completed'
                ? 'bg-success-100 text-success-700'
                : chapter.status === 'processing'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-secondary-100 text-secondary-700'
            }`}
          >
            {chapter.status === 'completed'
              ? '완료'
              : chapter.status === 'processing'
                ? 'AI 처리 중'
                : '초안'}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-secondary-900 mb-3">
          {chapter.title || '제목 없음'}
        </h1>

        <p className="text-lg text-secondary-600">{formatDate(chapter.created_at)}</p>
      </div>

      {/* 오디오 플레이어 */}
      {audioRecording && audioRecording.file_url && (
        <AudioPlayer
          src={getAudioUrl(audioRecording.file_url)}
          className="sticky top-20 mb-8 z-10"
        />
      )}

      {/* 본문 콘텐츠 */}
      {chapter.status === 'processing' && (
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600 animate-spin"
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
            <h3 className="text-xl font-bold text-secondary-900 mb-2">AI가 이야기를 정리하고 있습니다</h3>
            <p className="text-secondary-600">
              잠시만 기다려주세요. 곧 완성된 이야기를 보실 수 있습니다.
            </p>
          </CardContent>
        </Card>
      )}

      {chapter.status === 'completed' && (
        <div className="prose prose-lg max-w-none mb-8">
          {/* AI 생성 요약 */}
          {chapter.ai_generated_summary && (
            <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-primary-900 mb-2">요약</h3>
              <p className="text-primary-800 leading-relaxed text-lg">
                {chapter.ai_generated_summary}
              </p>
            </div>
          )}

          {/* 본문 텍스트 */}
          <div className="text-secondary-900 leading-relaxed">
            {chapter.content_html ? (
              <div dangerouslySetInnerHTML={{ __html: chapter.content_html }} />
            ) : chapter.ai_generated_content ? (
              <div className="whitespace-pre-wrap text-xl leading-loose">
                {chapter.ai_generated_content}
              </div>
            ) : audioRecording?.transcription_text ? (
              <div className="whitespace-pre-wrap text-xl leading-loose">
                <h3 className="text-2xl font-bold mb-4">원본 텍스트</h3>
                {audioRecording.transcription_text}
              </div>
            ) : (
              <p className="text-secondary-500 text-center py-12">
                아직 처리된 텍스트가 없습니다.
              </p>
            )}
          </div>

          {/* 감정 분석 */}
          {chapter.emotions && chapter.emotions.length > 0 && (
            <div className="mt-8 pt-8 border-t border-secondary-200">
              <h3 className="text-lg font-bold text-secondary-900 mb-4">이야기 속 감정</h3>
              <div className="flex flex-wrap gap-3">
                {chapter.emotions.map((emotion: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold border border-primary-200"
                  >
                    {emotion}
                  </span>
                ))}
              </div>

              {/* 감정 점수 시각화 */}
              {chapter.emotion_scores && (
                <div className="mt-6 space-y-3">
                  {Object.entries(chapter.emotion_scores as Record<string, number>).map(
                    ([emotion, score]) => {
                      const emotionLabels: Record<string, string> = {
                        joy: '기쁨',
                        sadness: '슬픔',
                        nostalgia: '그리움',
                        pride: '자부심',
                        gratitude: '감사',
                      }
                      return (
                        <div key={emotion} className="flex items-center gap-3">
                          <span className="text-sm font-medium text-secondary-700 w-16">
                            {emotionLabels[emotion] || emotion}
                          </span>
                          <div className="flex-1 h-2 bg-secondary-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-secondary-600 w-10 text-right">
                            {score}
                          </span>
                        </div>
                      )
                    }
                  )}
                </div>
              )}
            </div>
          )}

          {/* 키워드 */}
          {chapter.keywords && chapter.keywords.length > 0 && (
            <div className="mt-8 pt-8 border-t border-secondary-200">
              <h3 className="text-lg font-bold text-secondary-900 mb-4">키워드</h3>
              <div className="flex flex-wrap gap-2">
                {chapter.keywords.map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 액션 버튼 */}
      <div className="flex flex-wrap gap-3 pt-8 border-t border-secondary-200">
        <Button variant="secondary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          가족과 공유
        </Button>

        <Button variant="secondary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          수정
        </Button>

        {audioRecording?.transcription_text && (
          <Button variant="secondary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            원본 보기
          </Button>
        )}

        <Button variant="ghost" className="text-error-600 hover:bg-error-50 ml-auto">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          삭제
        </Button>
      </div>
    </div>
  )
}
