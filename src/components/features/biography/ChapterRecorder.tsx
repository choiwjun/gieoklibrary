'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface ChapterRecorderProps {
  projectId: string
  userId: string
  chapterNumber: number
}

export function ChapterRecorder({ projectId, userId, chapterNumber }: ChapterRecorderProps) {
  const router = useRouter()
  const supabase = createClient()

  const [chapterTitle, setChapterTitle] = useState('')
  const [theme, setTheme] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)

        // 이전 URL 정리
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl)
        }

        const newUrl = URL.createObjectURL(blob)
        setAudioUrl(newUrl)

        // 스트림 정지
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('녹음 시작 오류:', error)
      alert('마이크 접근 권한이 필요합니다.')
    }
  }

  // 녹음 중지
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  // 저장 및 AI 처리
  const handleSave = async () => {
    if (!audioBlob || !chapterTitle.trim()) {
      alert('챕터 제목과 녹음이 필요합니다.')
      return
    }

    setIsProcessing(true)

    try {
      // 1. 오디오 파일 업로드 (userId 기반 폴더 구조)
      const fileName = `${userId}/${projectId}_${Date.now()}.webm`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio-recordings')
        .upload(fileName, audioBlob)

      if (uploadError) throw uploadError

      // 2. 챕터 생성
      const { data: chapter, error: chapterError } = await supabase
        .from('biography_chapters')
        .insert({
          project_id: projectId,
          user_id: userId,
          chapter_number: chapterNumber,
          title: chapterTitle,
          theme: theme || null,
          status: 'ai_processing',
        })
        .select()
        .single()

      if (chapterError) throw chapterError

      // 3. 오디오 레코드 생성
      const { error: audioError } = await supabase.from('audio_recordings').insert({
        chapter_id: chapter.id,
        user_id: userId,
        file_url: uploadData.path,
        transcription_status: 'pending',
      })

      if (audioError) throw audioError

      // 4. AI 처리 큐에 추가 (실제 구현은 M4에서)
      // TODO: OpenAI Whisper API로 음성→텍스트 변환

      alert('녹음이 저장되었습니다. AI가 처리 중입니다.')
      router.push(`/biography/${projectId}`)
    } catch (error: unknown) {
      const err = error as Error
      console.error('저장 오류:', error)
      alert('오류: ' + err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* 챕터 정보 입력 */}
      <Card>
        <CardHeader>
          <CardTitle>챕터 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            label="챕터 제목"
            placeholder="예: 어린 시절 추억"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            required
          />

          <Input
            type="text"
            label="주제 (선택사항)"
            placeholder="예: 1960년대, 고향 마을"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* 녹음 컨트롤 */}
      <Card>
        <CardHeader>
          <CardTitle>음성 녹음</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            {!isRecording && !audioUrl && (
              <Button onClick={startRecording} size="lg" className="h-32 w-32 rounded-full">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </Button>
            )}

            {isRecording && (
              <>
                <div className="mb-4 flex h-32 w-32 animate-pulse items-center justify-center rounded-full bg-red-500">
                  <svg
                    className="text-white"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </div>
                <p className="mb-4 text-lg text-secondary-600">녹음 중...</p>
                <Button onClick={stopRecording} variant="secondary" size="lg">
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  </svg>
                  녹음 중지
                </Button>
              </>
            )}

            {audioUrl && !isRecording && (
              <>
                <audio src={audioUrl} controls className="mb-6 w-full max-w-md" />

                <div className="flex gap-3">
                  <Button onClick={startRecording} variant="secondary" size="lg">
                    다시 녹음
                  </Button>
                  <Button onClick={handleSave} size="lg" isLoading={isProcessing}>
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
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    저장하기
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
