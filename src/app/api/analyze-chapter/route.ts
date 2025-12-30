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
    const { chapterId } = body

    if (!chapterId) {
      return NextResponse.json({ error: 'Missing chapterId' }, { status: 400 })
    }

    // 챕터 정보 조회
    const { data: chapter, error: chapterError } = await supabase
      .from('biography_chapters')
      .select('*')
      .eq('id', chapterId)
      .eq('user_id', user.id)
      .single()

    if (chapterError || !chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })
    }

    const content = chapter.ai_generated_content || chapter.content_html

    if (!content) {
      return NextResponse.json({ error: 'No content to analyze' }, { status: 400 })
    }

    // GPT-4로 감정 분석 및 키워드 추출
    const analysisPrompt = `다음은 한국 어르신의 자서전 챕터입니다. 이 내용을 분석하여 JSON 형식으로 답변해주세요.

자서전 내용:
${content}

다음 JSON 형식으로 분석 결과를 제공해주세요:
{
  "emotions": ["감정1", "감정2", "감정3"],
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "emotionScores": {
    "joy": 0-100,
    "sadness": 0-100,
    "nostalgia": 0-100,
    "pride": 0-100,
    "gratitude": 0-100
  },
  "mainEmotion": "가장 주된 감정"
}

지침:
1. emotions: 이야기에서 느껴지는 주요 감정 3가지 (한국어)
2. keywords: 이야기의 핵심 키워드 5개 (고유명사, 장소, 시대, 주제 등)
3. emotionScores: 각 감정의 강도 (0-100)
   - joy: 기쁨, 즐거움
   - sadness: 슬픔, 아쉬움
   - nostalgia: 그리움, 향수
   - pride: 자부심, 뿌듯함
   - gratitude: 감사, 고마움
4. mainEmotion: 가장 주된 감정 1가지

JSON만 출력하고 다른 설명은 포함하지 마세요.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: analysisPrompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const analysisResult = JSON.parse(
      completion.choices[0]?.message?.content || '{}'
    )

    // 분석 결과 저장
    const { error: updateError } = await supabase
      .from('biography_chapters')
      .update({
        emotions: analysisResult.emotions || [],
        keywords: analysisResult.keywords || [],
        emotion_scores: analysisResult.emotionScores || null,
        main_emotion: analysisResult.mainEmotion || null,
      })
      .eq('id', chapterId)

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
    })
  } catch (error: any) {
    console.error('Chapter analysis error:', error)

    return NextResponse.json(
      {
        error: error.message || 'Chapter analysis failed',
      },
      { status: 500 }
    )
  }
}
