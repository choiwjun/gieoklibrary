-- Update existing users to mark onboarding as completed
-- Date: 2025-12-30
-- This is a one-time migration for existing users created before onboarding was implemented

-- Mark all existing users as having completed onboarding
-- (Since they were created before the onboarding process existed)
UPDATE user_profiles
SET
  onboarding_completed = true,
  onboarding_completed_at = NOW()
WHERE onboarding_completed IS NULL OR onboarding_completed = false;

-- Note: This assumes existing users should skip onboarding
-- If you want existing users to go through onboarding, don't run this migration
