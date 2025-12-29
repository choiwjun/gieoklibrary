-- 기억책방 (Memory Bookstore) Database Schema
-- 작성일: 2025-12-29
-- 참고: docs/databasedesign.md

-- [Extensions]
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- [1. Users & Profiles]
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE,
  phone_number VARCHAR(20),
  address_sido VARCHAR(50),
  address_sigungu VARCHAR(50),
  address_detail TEXT,
  avatar_url TEXT,
  user_type VARCHAR(20) DEFAULT 'senior' CHECK (user_type IN ('senior', 'helper', 'expert', 'family')),
  is_public BOOLEAN DEFAULT false,
  notification_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- [2. Biography Projects (자서전)]
CREATE TABLE IF NOT EXISTS biography_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL DEFAULT '나의 이야기',
  subtitle TEXT,
  cover_image_url TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed', 'published')),
  completion_percentage INTEGER DEFAULT 0,
  total_chapters INTEGER DEFAULT 0,
  total_words INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_biography_user_id ON biography_projects(user_id);

-- [3. Biography Chapters (챕터)]
CREATE TABLE IF NOT EXISTS biography_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES biography_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  theme VARCHAR(100),
  content TEXT,
  summary TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'ai_processing', 'completed')),
  word_count INTEGER DEFAULT 0,
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  UNIQUE(project_id, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_chapters_project ON biography_chapters(project_id);

-- [4. Audio Recordings (음성 녹음)]
CREATE TABLE IF NOT EXISTS audio_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES biography_chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  duration_seconds INTEGER,
  transcription_status VARCHAR(20) DEFAULT 'pending' CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT,
  recording_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_audio_chapter ON audio_recordings(chapter_id);

-- [RLS Policies]
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE biography_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_recordings ENABLE ROW LEVEL SECURITY;

-- Profiles: 본인만 수정, 본인만 조회 (일단)
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Biography: 본인만
CREATE POLICY "Users can manage own projects" ON biography_projects FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own chapters" ON biography_chapters FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own recordings" ON audio_recordings FOR ALL USING (auth.uid() = user_id);

-- [Functions]
-- updated_at 자동 갱신 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_biography_projects_updated_at BEFORE UPDATE ON biography_projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_biography_chapters_updated_at BEFORE UPDATE ON biography_chapters FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
