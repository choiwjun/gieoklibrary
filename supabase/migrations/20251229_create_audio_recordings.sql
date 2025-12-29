-- Create or update audio_recordings table
-- Date: 2025-12-29

-- Drop existing table if needed (주의: 데이터가 삭제됩니다!)
-- DROP TABLE IF EXISTS audio_recordings CASCADE;

-- Create audio_recordings table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_audio_chapter ON audio_recordings(chapter_id);
CREATE INDEX IF NOT EXISTS idx_audio_user ON audio_recordings(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_status ON audio_recordings(transcription_status);

-- Enable RLS
ALTER TABLE audio_recordings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage own recordings" ON audio_recordings;

-- Create RLS policies
CREATE POLICY "Users can manage own recordings"
  ON audio_recordings FOR ALL
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_audio_recordings_updated_at ON audio_recordings;

CREATE TRIGGER update_audio_recordings_updated_at
  BEFORE UPDATE ON audio_recordings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
