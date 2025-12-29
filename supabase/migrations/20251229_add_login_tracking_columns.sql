-- Migration: Add login tracking columns to user_profiles
-- Date: 2025-12-29
-- Purpose: Add last_login_at and login_count columns for M2.2 login functionality

-- Add missing columns to user_profiles table
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;

-- Update existing rows to have default login_count value
UPDATE user_profiles
SET login_count = 0
WHERE login_count IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN user_profiles.last_login_at IS 'Timestamp of user last login';
COMMENT ON COLUMN user_profiles.login_count IS 'Total number of user logins';
