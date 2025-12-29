-- Audio Recordings Storage Bucket RLS Policies
-- 실행 방법: Supabase Dashboard → SQL Editor에서 이 파일 내용을 복사하여 실행

-- 1. 먼저 audio-recordings 버킷이 생성되어 있는지 확인
-- Supabase Dashboard → Storage → New bucket → audio-recordings (public: false)

-- 2. 기존 정책이 있다면 삭제 (에러가 나도 무시하고 계속 진행)
DROP POLICY IF EXISTS "Users can upload own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own audio files" ON storage.objects;

-- 3. Storage Objects 테이블에 RLS 정책 추가

-- 사용자가 자신의 폴더에 오디오 파일을 업로드할 수 있도록
CREATE POLICY "Users can upload own audio files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'audio-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 사용자가 자신의 오디오 파일을 조회할 수 있도록
CREATE POLICY "Users can view own audio files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'audio-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 사용자가 자신의 오디오 파일을 업데이트할 수 있도록
CREATE POLICY "Users can update own audio files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'audio-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 사용자가 자신의 오디오 파일을 삭제할 수 있도록
CREATE POLICY "Users can delete own audio files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'audio-recordings' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
