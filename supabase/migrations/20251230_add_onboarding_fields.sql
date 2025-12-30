-- Add onboarding fields to user_profiles table
-- Date: 2025-12-30

-- Add interests column (array of selected feature IDs)
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS interests TEXT[] DEFAULT '{}';

-- Add onboarding completion tracking
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMPTZ;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.interests IS 'User selected interests: biography, video_letter, community, career, vault';
COMMENT ON COLUMN user_profiles.onboarding_completed IS 'Whether user has completed onboarding process';
COMMENT ON COLUMN user_profiles.onboarding_completed_at IS 'Timestamp when onboarding was completed';
