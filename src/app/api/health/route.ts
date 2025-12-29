import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createClient()

    try {
        // 간단한 연결 테스트 (테이블이 없어도 연결 시도는 함)
        // 실제로는 테이블이 생성되어야 쿼리가 성공함
        const { error } = await supabase.from('user_profiles').select('count').limit(1).single()

        // 406 Not Acceptable 등은 테이블이 존재하지 않을 때 발생할 수 있음
        // 연결 자체가 실패하면 500 에러 발생

        return NextResponse.json({
            status: 'ok',
            message: 'Supabase client initialized',
            schema_check: error ? 'Schema might not be initialized' : 'Schema operational'
        })
    } catch (error) {
        return NextResponse.json(
            { status: 'error', message: 'Failed to connect to Supabase', error: String(error) },
            { status: 500 }
        )
    }
}
