export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
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
                Insert: {
                    id?: string
                    user_id: string
                    full_name: string
                    nickname?: string | null
                    birth_date?: string | null
                    phone_number?: string | null
                    address_sido?: string | null
                    address_sigungu?: string | null
                    address_detail?: string | null
                    avatar_url?: string | null
                    user_type?: 'senior' | 'helper' | 'expert' | 'family'
                    is_public?: boolean
                    notification_enabled?: boolean
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    full_name?: string
                    nickname?: string | null
                    birth_date?: string | null
                    phone_number?: string | null
                    address_sido?: string | null
                    address_sigungu?: string | null
                    address_detail?: string | null
                    avatar_url?: string | null
                    user_type?: 'senior' | 'helper' | 'expert' | 'family'
                    is_public?: boolean
                    notification_enabled?: boolean
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "user_profiles_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
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
                    is_published: boolean
                    published_at: string | null
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    title?: string
                    subtitle?: string | null
                    cover_image_url?: string | null
                    status?: 'draft' | 'in_progress' | 'completed' | 'published'
                    completion_percentage?: number
                    total_chapters?: number
                    total_words?: number
                    is_published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    subtitle?: string | null
                    cover_image_url?: string | null
                    status?: 'draft' | 'in_progress' | 'completed' | 'published'
                    completion_percentage?: number
                    total_chapters?: number
                    total_words?: number
                    is_published?: boolean
                    published_at?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "biography_projects_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            biography_chapters: {
                Row: {
                    id: string
                    project_id: string
                    user_id: string
                    chapter_number: number
                    title: string
                    theme: string | null
                    content: string | null
                    summary: string | null
                    status: 'draft' | 'ai_processing' | 'completed'
                    word_count: number | null
                    display_order: number | null
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: {
                    id?: string
                    project_id: string
                    user_id: string
                    chapter_number: number
                    title: string
                    theme?: string | null
                    content?: string | null
                    summary?: string | null
                    status?: 'draft' | 'ai_processing' | 'completed'
                    word_count?: number | null
                    display_order?: number | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: string
                    project_id?: string
                    user_id?: string
                    chapter_number?: number
                    title?: string
                    theme?: string | null
                    content?: string | null
                    summary?: string | null
                    status?: 'draft' | 'ai_processing' | 'completed'
                    word_count?: number | null
                    display_order?: number | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "biography_chapters_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "biography_projects"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "biography_chapters_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            audio_recordings: {
                Row: {
                    id: string
                    chapter_id: string
                    user_id: string
                    file_url: string
                    duration_seconds: number | null
                    transcription_status: 'pending' | 'processing' | 'completed' | 'failed'
                    transcription_text: string | null
                    recording_date: string | null
                    created_at: string
                    updated_at: string
                    deleted_at: string | null
                }
                Insert: {
                    id?: string
                    chapter_id: string
                    user_id: string
                    file_url: string
                    duration_seconds?: number | null
                    transcription_status?: 'pending' | 'processing' | 'completed' | 'failed'
                    transcription_text?: string | null
                    recording_date?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Update: {
                    id?: string
                    chapter_id?: string
                    user_id?: string
                    file_url?: string
                    duration_seconds?: number | null
                    transcription_status?: 'pending' | 'processing' | 'completed' | 'failed'
                    transcription_text?: string | null
                    recording_date?: string | null
                    created_at?: string
                    updated_at?: string
                    deleted_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "audio_recordings_chapter_id_fkey"
                        columns: ["chapter_id"]
                        isOneToOne: false
                        referencedRelation: "biography_chapters"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "audio_recordings_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
