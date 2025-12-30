import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // 인증 확인
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { chapterId, audioRecordingId } = body

    if (!chapterId || !audioRecordingId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 챕터 및 오디오 정보 조회
    const { data: audioRecording, error: fetchError } = await supabase
      .from('audio_recordings')
      .select('*, biography_chapters!inner(*)')
      .eq('id', audioRecordingId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !audioRecording) {
      return NextResponse.json({ error: 'Audio recording not found' }, { status: 404 })
    }

    // 오디오 파일 URL 가져오기
    const { data: fileData } = supabase.storage
      .from('audio-recordings')
      .getPublicUrl(audioRecording.file_url)

    if (!fileData.publicUrl) {
      return NextResponse.json({ error: 'Audio file not found' }, { status: 404 })
    }

    // 상태 업데이트: processing
    await supabase
      .from('audio_recordings')
      .update({ transcription_status: 'processing' })
      .eq('id', audioRecordingId)

    await supabase
      .from('biography_chapters')
      .update({ status: 'processing' })
      .eq('id', chapterId)

    // 오디오 파일 다운로드
    const audioResponse = await fetch(fileData.publicUrl)
    const audioBlob = await audioResponse.blob()

    // File 객체로 변환
    const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' })

    // OpenAI Whisper API 호출
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'ko', // 한국어
      response_format: 'verbose_json', // 신뢰도 점수 포함
    })

    // 텍스트 및 신뢰도 저장
    const { error: updateError } = await supabase
      .from('audio_recordings')
      .update({
        transcription_text: transcription.text,
        transcription_status: 'completed',
        transcription_confidence: 0.95, // Whisper는 confidence를 제공하지 않으므로 기본값
      })
      .eq('id', audioRecordingId)

    if (updateError) {
      throw updateError
    }

    // GPT-4로 텍스트 편집 호출
    try {
      const editResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/edit-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chapterId: chapterId,
            audioRecordingId: audioRecordingId,
          }),
        }
      )

      if (!editResponse.ok) {
        console.error('Content editing failed:', await editResponse.text())
        // 편집 실패해도 transcription은 저장됨
        await supabase
          .from('biography_chapters')
          .update({
            ai_generated_content: transcription.text,
            word_count: transcription.text.length,
            status: 'completed',
          })
          .eq('id', chapterId)
      }
    } catch (editError) {
      console.error('Content editing request failed:', editError)
      // 편집 실패 시 원본 텍스트라도 저장
      await supabase
        .from('biography_chapters')
        .update({
          ai_generated_content: transcription.text,
          word_count: transcription.text.length,
          status: 'completed',
        })
        .eq('id', chapterId)
    }

    return NextResponse.json({
      success: true,
      text: transcription.text,
      duration: transcription.duration,
    })
  } catch (error: any) {
    console.error('Transcription error:', error)

    // 에러 발생 시 상태 업데이트
    const body = await request.json().catch(() => ({}))
    if (body.audioRecordingId) {
      const supabase = await createClient()
      await supabase
        .from('audio_recordings')
        .update({ transcription_status: 'failed' })
        .eq('id', body.audioRecordingId)

      if (body.chapterId) {
        await supabase
          .from('biography_chapters')
          .update({ status: 'failed' })
          .eq('id', body.chapterId)
      }
    }

    return NextResponse.json(
      {
        error: error.message || 'Transcription failed',
      },
      { status: 500 }
    )
  }
}
