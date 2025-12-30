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
    const { data: chapter, error: chapterError } = await supabase
      .from('biography_chapters')
      .select('*, audio_recordings!inner(*)')
      .eq('id', chapterId)
      .eq('user_id', user.id)
      .single()

    if (chapterError || !chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    }

    // 오디오 레코딩 데이터 가져오기
    const audioRecording = chapter.audio_recordings.find(
      (ar: any) => ar.id === audioRecordingId
    )

    if (!audioRecording || !audioRecording.transcription_text) {
      return NextResponse.json(
        { error: 'Transcription text not found' },
        { status: 404 }
      )
    }

    // 챕터 상태 업데이트: ai_processing
    await supabase
      .from('biography_chapters')
      .update({ status: 'ai_processing' })
      .eq('id', chapterId)

    // GPT-4로 텍스트 편집
    const systemPrompt = `당신은 한국의 노년층 자서전 작가입니다.
음성으로 녹음된 이야기를 문학적이고 감동적인 자서전 형식으로 편집하는 역할을 합니다.

지침:
1. 구어체를 자연스러운 문어체로 변환하되, 화자의 목소리와 감정은 유지
2. 반복되거나 불필요한 부분 제거
3. 문맥에 맞게 문단 구분
4. 시간 순서가 명확하도록 정리
5. 존댓말을 적절히 사용하여 품위 있게 표현
6. 한국 문화와 정서에 맞는 표현 사용
7. 개인적 경험과 감정을 생생하게 전달

결과는 읽기 쉽고 감동적인 자서전 한 챕터가 되어야 합니다.`

    const userPrompt = `다음은 ${chapter.title || '어르신'}의 이야기입니다. 자서전 형식으로 편집해주세요.

주제: ${chapter.theme || '인생 이야기'}

원본 음성 텍스트:
${audioRecording.transcription_text}

위 내용을 자서전 한 챕터로 편집하되, 다음 형식으로 작성해주세요:
1. 자연스러운 문단 구분 (각 문단은 빈 줄로 구분)
2. 맞춤법과 문법 교정
3. 감정과 분위기를 살린 표현

편집된 텍스트만 출력하고, 다른 설명이나 주석은 포함하지 마세요.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const editedContent = completion.choices[0]?.message?.content?.trim()

    if (!editedContent) {
      throw new Error('No content generated from GPT-4')
    }

    // HTML 변환 (문단 구분)
    const contentHtml = editedContent
      .split('\n\n')
      .filter((p) => p.trim())
      .map((p) => `<p>${p.trim()}</p>`)
      .join('\n')

    // 요약 생성 (첫 2문장)
    const sentences = editedContent.split(/[.!?]\s+/)
    const summary = sentences.slice(0, 2).join('. ') + '.'

    // 단어 수 계산
    const wordCount = editedContent.replace(/\s+/g, '').length

    // 챕터 업데이트
    const { error: updateError } = await supabase
      .from('biography_chapters')
      .update({
        ai_generated_content: editedContent,
        content_html: contentHtml,
        ai_generated_summary: summary,
        word_count: wordCount,
        status: 'completed',
      })
      .eq('id', chapterId)

    if (updateError) {
      throw updateError
    }

    // 감정 분석 및 키워드 추출 호출 (백그라운드 실행)
    try {
      const analyzeResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/analyze-chapter`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ chapterId }),
        }
      )

      if (!analyzeResponse.ok) {
        console.error('Chapter analysis failed:', await analyzeResponse.text())
        // 분석 실패해도 메인 처리는 성공
      }
    } catch (analyzeError) {
      console.error('Chapter analysis request failed:', analyzeError)
      // 분석 실패해도 메인 처리는 성공
    }

    return NextResponse.json({
      success: true,
      content: editedContent,
      summary: summary,
      wordCount: wordCount,
    })
  } catch (error: any) {
    console.error('Content editing error:', error)

    // 에러 발생 시 상태 업데이트
    const body = await request.json().catch(() => ({}))
    if (body.chapterId) {
      const supabase = await createClient()
      await supabase
        .from('biography_chapters')
        .update({ status: 'failed' })
        .eq('id', body.chapterId)
    }

    return NextResponse.json(
      {
        error: error.message || 'Content editing failed',
      },
      { status: 500 }
    )
  }
}
