import { Database } from './database.types'

// 테이블 Row 타입 추출
export type User = Database['public']['Tables']['user_profiles']['Row']
export type UserInsert = Database['public']['Tables']['user_profiles']['Insert']
export type UserUpdate = Database['public']['Tables']['user_profiles']['Update']

export type BiographyProject = Database['public']['Tables']['biography_projects']['Row']
export type BiographyProjectInsert = Database['public']['Tables']['biography_projects']['Insert']
export type BiographyProjectUpdate = Database['public']['Tables']['biography_projects']['Update']

export type BiographyChapter = Database['public']['Tables']['biography_chapters']['Row']
export type BiographyChapterInsert = Database['public']['Tables']['biography_chapters']['Insert']
export type BiographyChapterUpdate = Database['public']['Tables']['biography_chapters']['Update']

export type AudioRecording = Database['public']['Tables']['audio_recordings']['Row']
export type AudioRecordingInsert = Database['public']['Tables']['audio_recordings']['Insert']
export type AudioRecordingUpdate = Database['public']['Tables']['audio_recordings']['Update']

// 커스텀 타입
export type UserType = 'senior' | 'helper' | 'expert' | 'family'
export type BiographyStatus = 'draft' | 'in_progress' | 'completed' | 'published'
export type ChapterStatus = 'draft' | 'ai_processing' | 'completed'
export type TranscriptionStatus = 'pending' | 'processing' | 'completed' | 'failed'

// 컴포넌트 Props 공통 타입
export interface BaseProps {
    className?: string
    children?: React.ReactNode
}

// API 응답 타입
export interface ApiResponse<T> {
    data: T | null
    error: string | null
}

// 폼 에러 타입
export type FormErrors = Record<string, string>

// Re-export database types
export type { Database } from './database.types'
