// Database 타입 - Supabase CLI로 자동 생성 예정
// npx supabase gen types typescript --project-id [PROJECT_ID] > src/types/database.types.ts

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

// 임시 타입 정의 (Supabase 연결 후 자동 생성으로 교체)
export interface Database {
    public: {
        Tables: {
            user_profiles: {
                Row: {
                    id: string
                    user_id: string
                    full_name: string
                    nickname: string | null
                    birth_date: string | null
                    phone_number: string | null
                    address_sido: string | null
                    address_sigungu: string | null
                    address_detail: string | null
                    avatar_url: string | null
                    user_type: 'senior' | 'helper' | 'expert' | 'family'
                    is_public: boolean
                    notification_enabled: boolean
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
            }
            biography_projects: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    subtitle: string | null
                    cover_image_url: string | null
                    status: 'draft' | 'in_progress' | 'completed' | 'published'
                    completion_percentage: number
                    total_chapters: number
                    total_words: number
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: Omit<Database['public']['Tables']['biography_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['biography_projects']['Insert']>
            }
        }
        Views: {}
        Functions: {}
        Enums: {}
    }
}
