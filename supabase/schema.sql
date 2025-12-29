-- 기억책방 (Memory Bookstore) Database Schema
-- 작성일: 2025-12-29
-- 참고: docs/databasedesign.md

-- =============================================================================
-- [1. Extensions]
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- [2. Tables]
-- =============================================================================

-- [2.1 User Profiles]
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 기본 정보
  full_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  phone_number VARCHAR(20),

  -- 주소 정보
  address_sido VARCHAR(50),
  address_sigungu VARCHAR(50),
  address_detail TEXT,
  postal_code VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- 프로필 이미지
  avatar_url TEXT,

  -- 사용자 유형
  user_type VARCHAR(20) DEFAULT 'senior' CHECK (user_type IN ('senior', 'helper', 'expert', 'family')),

  -- 설정
  is_public BOOLEAN DEFAULT false,
  notification_enabled BOOLEAN DEFAULT true,
  marketing_agreed BOOLEAN DEFAULT false,

  -- 메타데이터
  last_login_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,

  -- 표준 컬럼
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_type ON user_profiles(user_type);

-- [2.2 Biography Projects (자서전)]
CREATE TABLE IF NOT EXISTS biography_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  title VARCHAR(200) NOT NULL DEFAULT '나의 이야기',
  subtitle TEXT,
  cover_image_url TEXT,

  -- 진행 상태
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'published')),
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),

  -- AI 설정
  interview_style VARCHAR(50) DEFAULT 'conversational' CHECK (interview_style IN ('conversational', 'formal', 'storytelling')),
  target_length INTEGER,

  -- 출판 설정
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  share_code VARCHAR(50) UNIQUE,

  -- 통계
  total_chapters INTEGER DEFAULT 0,
  total_words INTEGER DEFAULT 0,
  total_audio_minutes INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_biography_user_id ON biography_projects(user_id);
CREATE INDEX IF NOT EXISTS idx_biography_status ON biography_projects(status);

-- [2.3 Biography Chapters (챕터)]
CREATE TABLE IF NOT EXISTS biography_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES biography_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 챕터 정보
  chapter_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  theme VARCHAR(100),
  time_period VARCHAR(100),

  -- 콘텐츠
  content TEXT,
  content_html TEXT,
  raw_transcript TEXT,

  -- AI 분석
  summary TEXT,
  keywords TEXT[],
  emotions JSONB,

  -- 미디어
  featured_image_url TEXT,

  -- 상태
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'ai_processing', 'completed')),
  word_count INTEGER DEFAULT 0,

  -- 순서
  display_order INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,

  UNIQUE(project_id, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_chapters_project ON biography_chapters(project_id);
CREATE INDEX IF NOT EXISTS idx_chapters_user ON biography_chapters(user_id);
CREATE INDEX IF NOT EXISTS idx_chapters_status ON biography_chapters(status);

-- [2.4 Audio Recordings (음성 녹음)]
CREATE TABLE IF NOT EXISTS audio_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES biography_chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 파일 정보
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  duration_seconds INTEGER,
  format VARCHAR(10),

  -- 처리 상태
  transcription_status VARCHAR(20) DEFAULT 'pending'
    CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT,
  transcription_confidence DECIMAL(3, 2),

  -- AI 처리
  ai_processed BOOLEAN DEFAULT false,
  ai_processed_at TIMESTAMPTZ,

  -- 메타데이터
  recording_date TIMESTAMPTZ DEFAULT NOW(),
  device_info JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_audio_chapter ON audio_recordings(chapter_id);
CREATE INDEX IF NOT EXISTS idx_audio_user ON audio_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_status ON audio_recordings(transcription_status);

-- [2.5 Digital Vaults (디지털 금고)]
CREATE TABLE IF NOT EXISTS digital_vaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 보안 설정
  master_password_hash TEXT,
  is_locked BOOLEAN DEFAULT false,

  -- 전달 설정
  delivery_method VARCHAR(20) DEFAULT 'manual'
    CHECK (delivery_method IN ('manual', 'time_based', 'event_based')),
  delivery_trigger_date DATE,

  -- 상태
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active', 'preparing_delivery', 'delivered')),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_vaults_user ON digital_vaults(user_id);

-- [2.6 Vault Items (금고 아이템)]
CREATE TABLE IF NOT EXISTS vault_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vault_id UUID NOT NULL REFERENCES digital_vaults(id) ON DELETE CASCADE,

  -- 아이템 유형
  item_type VARCHAR(50) NOT NULL
    CHECK (item_type IN ('financial', 'account', 'document', 'message', 'instruction', 'video_letter', 'other')),

  title VARCHAR(200) NOT NULL,
  description TEXT,

  -- 콘텐츠 (암호화됨)
  encrypted_content TEXT,
  file_url TEXT,

  -- 메타데이터
  metadata JSONB,

  -- 중요도
  priority VARCHAR(20) DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'critical')),

  -- 전달 설정
  recipient_user_ids UUID[],
  delivery_condition TEXT,

  -- 상태
  is_delivered BOOLEAN DEFAULT false,
  delivered_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_vault_items_vault ON vault_items(vault_id);
CREATE INDEX IF NOT EXISTS idx_vault_items_type ON vault_items(item_type);

-- =============================================================================
-- [3. Row Level Security (RLS) Policies]
-- =============================================================================

-- [3.1 Enable RLS]
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_items ENABLE ROW LEVEL SECURITY;

-- [3.2 Drop Existing Policies (중복 방지)]
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can manage own projects" ON biography_projects;
DROP POLICY IF EXISTS "Users can manage own chapters" ON biography_chapters;
DROP POLICY IF EXISTS "Users can manage own recordings" ON audio_recordings;
DROP POLICY IF EXISTS "Users can manage own vaults" ON digital_vaults;
DROP POLICY IF EXISTS "Users can manage own vault items" ON vault_items;

-- [3.3 User Profiles Policies]
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- [3.4 Biography Policies]
CREATE POLICY "Users can manage own projects"
  ON biography_projects FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own chapters"
  ON biography_chapters FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own recordings"
  ON audio_recordings FOR ALL
  USING (auth.uid() = user_id);

-- [3.5 Digital Vault Policies]
CREATE POLICY "Users can manage own vaults"
  ON digital_vaults FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own vault items"
  ON vault_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM digital_vaults
      WHERE digital_vaults.id = vault_items.vault_id
        AND digital_vaults.user_id = auth.uid()
    )
  );

-- =============================================================================
-- [4. Functions & Triggers]
-- =============================================================================

-- [4.1 updated_at 자동 갱신 함수]
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- [4.2 Triggers for updated_at]
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
DROP TRIGGER IF EXISTS update_biography_projects_updated_at ON biography_projects;
DROP TRIGGER IF EXISTS update_biography_chapters_updated_at ON biography_chapters;
DROP TRIGGER IF EXISTS update_audio_recordings_updated_at ON audio_recordings;
DROP TRIGGER IF EXISTS update_digital_vaults_updated_at ON digital_vaults;
DROP TRIGGER IF EXISTS update_vault_items_updated_at ON vault_items;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_biography_projects_updated_at
  BEFORE UPDATE ON biography_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_biography_chapters_updated_at
  BEFORE UPDATE ON biography_chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audio_recordings_updated_at
  BEFORE UPDATE ON audio_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_digital_vaults_updated_at
  BEFORE UPDATE ON digital_vaults
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vault_items_updated_at
  BEFORE UPDATE ON vault_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- [4.3 자서전 통계 자동 업데이트]
CREATE OR REPLACE FUNCTION update_biography_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE biography_projects
  SET
    total_chapters = (
      SELECT COUNT(*)
      FROM biography_chapters
      WHERE project_id = NEW.project_id
        AND deleted_at IS NULL
    ),
    total_words = (
      SELECT COALESCE(SUM(word_count), 0)
      FROM biography_chapters
      WHERE project_id = NEW.project_id
        AND deleted_at IS NULL
    ),
    completion_percentage = LEAST(100, (
      SELECT COUNT(*) * 10
      FROM biography_chapters
      WHERE project_id = NEW.project_id
        AND status = 'completed'
        AND deleted_at IS NULL
    ))
  WHERE id = NEW.project_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_biography_stats_trigger ON biography_chapters;

CREATE TRIGGER update_biography_stats_trigger
  AFTER INSERT OR UPDATE ON biography_chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_biography_stats();

-- =============================================================================
-- [5. Complete]
-- =============================================================================
-- Schema 생성 완료
-- 이제 Supabase Dashboard에서 이 SQL을 실행하면 모든 테이블과 정책이 생성됩니다.
