# 데이터베이스 스키마 (Database Schema)

## 프로젝트: 기억책방 (Memory Bookstore)

**작성일**: 2025년 12월 29일

**버전**: v1.0

**기술 스택**: Supabase (PostgreSQL)

---

## 목차

1. [개요](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
2. [데이터베이스 설계 원칙](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
3. [ERD (Entity Relationship Diagram)](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
4. [테이블 명세](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
5. [인덱스 설계](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
6. [보안 정책 (RLS)](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
7. [트리거 및 함수](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
8. [마이그레이션 스크립트](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)
9. [백업 및 복구 전략](https://www.notion.so/Database-Design-2d8aa1380be3800396b2d1d2bcae1121?pvs=21)

---

## 1. 개요

### 1.1 데이터베이스 개요

**데이터베이스 엔진**: PostgreSQL 15.x (Supabase 관리형)

**인코딩**: UTF-8

**타임존**: Asia/Seoul (KST)

### 1.2 주요 엔티티

- **사용자 관리**: 회원, 프로필, 권한
- **생애 기록**: 자서전, 챕터, 음성 파일
- **디지털 유산**: 금고, 편지, 전달 설정
- **커뮤니티**: 친구 찾기, 매칭, 채팅
- **헬프데스크**: 지원 요청, 세션
- **경력 재활용**: 전문가 프로필, 상담 예약
- **결제**: 구독, 결제 내역

---

## 2. 데이터베이스 설계 원칙

### 2.1 명명 규칙

sql

- `- 테이블명: 소문자 snake_case, 복수형users, biography_chapters, digital_vault_items
- 컬럼명: 소문자 snake_caseuser_id, created_at, is_active
- 인덱스명: idx_{테이블명}_{컬럼명}idx_users_email, idx_chapters_user_id
- FK 제약조건: fk_{테이블명}_{참조테이블명}fk_chapters_users
- 기본키: id (UUID)- 외래키: {테이블명}_id`

### 2.2 데이터 타입 표준

sql

- `- ID: UUID (Supabase gen_random_uuid())- 텍스트: TEXT (가변 길이)- 짧은 텍스트: VARCHAR(255)- 숫자: INTEGER, BIGINT- 금액: DECIMAL(10,2)- 날짜/시간: TIMESTAMPTZ (timezone aware)- Boolean: BOOLEAN- JSON: JSONB (인덱싱 가능)- 파일 경로: TEXT (Supabase Storage 경로)`

### 2.3 공통 컬럼

모든 테이블에 포함:

sql

`id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at TIMESTAMPTZ DEFAULT NOW(),
updated_at TIMESTAMPTZ DEFAULT NOW(),
deleted_at TIMESTAMPTZ -- Soft delete`

---

## 3. ERD (Entity Relationship Diagram)

`┌─────────────────┐
│     users       │
│  (Supabase Auth)│
└────────┬────────┘
         │
         ├──────────────────────────────────┐
         │                                  │
         ▼                                  ▼
┌─────────────────┐              ┌──────────────────┐
│  user_profiles  │              │   subscriptions  │
└────────┬────────┘              └──────────────────┘
         │
         ├─────────┬─────────┬─────────┬──────────┐
         │         │         │         │          │
         ▼         ▼         ▼         ▼          ▼
┌──────────┐ ┌─────────┐ ┌──────┐ ┌────────┐ ┌─────────┐
│biography │ │ vault   │ │friend│ │helpdesk│ │expert   │
│_projects │ │ _items  │ │_match│ │_tickets│ │_profiles│
└────┬─────┘ └─────────┘ └──────┘ └────────┘ └─────────┘
     │
     ├─────────┬──────────┐
     │         │          │
     ▼         ▼          ▼
┌─────────┐ ┌──────┐ ┌──────────┐
│chapters │ │audio │ │video     │
│         │ │_files│ │_letters  │
└─────────┘ └──────┘ └──────────┘`

---

## 4. 테이블 명세

### 4.1 사용자 관리

### 4.1.1 users (Supabase Auth 기본 테이블)

sql

- `- Supabase Auth 테이블 (읽기 전용)- auth.users 스키마 사용- 별도 생성 불필요`

### 4.1.2 user_profiles

sql

`CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 기본 정보
  full_name VARCHAR(100) NOT NULL,
  nickname VARCHAR(50),
  birth_date DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
  phone_number VARCHAR(20),
  
  -- 주소 정보
  address_sido VARCHAR(50), -- 시/도
  address_sigungu VARCHAR(50), -- 시/군/구
  address_detail TEXT,
  postal_code VARCHAR(10),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- 프로필 이미지
  avatar_url TEXT,
  
  -- 사용자 유형
  user_type VARCHAR(20) DEFAULT 'senior' CHECK (user_type IN ('senior', 'helper', 'expert', 'family')),
  
  -- 설정
  is_public BOOLEAN DEFAULT false, -- 프로필 공개 여부
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

-- 인덱스
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_profiles_address ON user_profiles(address_sido, address_sigungu);
CREATE INDEX idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX idx_user_profiles_location ON user_profiles(latitude, longitude);

-- RLS 정책
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);`

### 4.1.3 user_relationships

sql

- `- 가족 관계 (자녀가 부모 계정 연결)CREATE TABLE user_relationships ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), senior_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, family_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, relationship_type VARCHAR(20) NOT NULL CHECK (relationship_type IN ('child', 'spouse', 'sibling', 'caregiver', 'other')), is_primary BOOLEAN DEFAULT false, - 주 연락자 - 권한 설정 can_view_biography BOOLEAN DEFAULT true, can_edit_biography BOOLEAN DEFAULT false, can_view_vault BOOLEAN DEFAULT false, can_manage_vault BOOLEAN DEFAULT false, status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')), created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(), deleted_at TIMESTAMPTZ, UNIQUE(senior_user_id, family_user_id));CREATE INDEX idx_relationships_senior ON user_relationships(senior_user_id);CREATE INDEX idx_relationships_family ON user_relationships(family_user_id);`

---

### 4.2 생애 기록 (자서전)

### 4.2.1 biography_projects

sql

`CREATE TABLE biography_projects (
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
  target_length INTEGER, -- 목표 페이지 수
  
  -- 출판 설정
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  share_code VARCHAR(50) UNIQUE, -- 가족 공유용 코드
  
  -- 통계
  total_chapters INTEGER DEFAULT 0,
  total_words INTEGER DEFAULT 0,
  total_audio_minutes INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_biography_user_id ON biography_projects(user_id);
CREATE INDEX idx_biography_status ON biography_projects(status);
CREATE INDEX idx_biography_share_code ON biography_projects(share_code);`

### 4.2.2 biography_chapters

sql

`CREATE TABLE biography_chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES biography_projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 챕터 정보
  chapter_number INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  theme VARCHAR(100), -- 예: '어린 시절', '첫 직장', '결혼'
  time_period VARCHAR(100), -- 예: '1960-1970', '20대'
  
  -- 콘텐츠
  content TEXT, -- AI가 정리한 텍스트
  content_html TEXT, -- 포맷팅된 HTML
  raw_transcript TEXT, -- 원본 음성→텍스트
  
  -- AI 분석
  summary TEXT, -- AI 요약
  keywords TEXT[], -- 키워드 배열
  emotions JSONB, -- 감정 분석 결과
  
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

CREATE INDEX idx_chapters_project ON biography_chapters(project_id);
CREATE INDEX idx_chapters_user ON biography_chapters(user_id);
CREATE INDEX idx_chapters_status ON biography_chapters(status);
CREATE INDEX idx_chapters_order ON biography_chapters(project_id, display_order);`

### 4.2.3 audio_recordings

sql

`CREATE TABLE audio_recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES biography_chapters(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 파일 정보
  file_url TEXT NOT NULL, -- Supabase Storage 경로
  file_size_bytes BIGINT,
  duration_seconds INTEGER,
  format VARCHAR(10), -- 예: 'mp3', 'wav'
  
  -- 처리 상태
  transcription_status VARCHAR(20) DEFAULT 'pending' 
    CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')),
  transcription_text TEXT,
  transcription_confidence DECIMAL(3, 2), -- 0.00 ~ 1.00
  
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

CREATE INDEX idx_audio_chapter ON audio_recordings(chapter_id);
CREATE INDEX idx_audio_user ON audio_recordings(user_id);
CREATE INDEX idx_audio_status ON audio_recordings(transcription_status);`

### 4.2.4 chapter_images

sql

`CREATE TABLE chapter_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES biography_chapters(id) ON DELETE CASCADE,
  
  image_url TEXT NOT NULL,
  caption TEXT,
  year_taken INTEGER,
  location TEXT,
  people_in_photo TEXT[], -- 사진 속 인물들
  
  display_order INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_chapter_images_chapter ON chapter_images(chapter_id);`

### 4.2.5 interview_questions

sql

- `- AI 인터뷰 질문 템플릿CREATE TABLE interview_questions ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), category VARCHAR(50) NOT NULL, - 예: 'childhood', 'career', 'family' question_text TEXT NOT NULL, follow_up_questions TEXT[], - 후속 질문들 difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('easy', 'medium', 'deep')), recommended_order INTEGER, is_active BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());CREATE INDEX idx_questions_category ON interview_questions(category);`

### 4.2.6 user_interview_sessions

sql

- `- 사용자별 인터뷰 진행 상황CREATE TABLE user_interview_sessions ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), project_id UUID NOT NULL REFERENCES biography_projects(id) ON DELETE CASCADE, question_id UUID NOT NULL REFERENCES interview_questions(id) ON DELETE CASCADE, asked_at TIMESTAMPTZ DEFAULT NOW(), answered_at TIMESTAMPTZ, answer_audio_id UUID REFERENCES audio_recordings(id) ON DELETE SET NULL, was_helpful BOOLEAN, user_feedback TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW());CREATE INDEX idx_sessions_project ON user_interview_sessions(project_id);`

---

### 4.3 디지털 유산 (금고)

### 4.3.1 digital_vaults

sql

`CREATE TABLE digital_vaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 보안 설정
  master_password_hash TEXT, -- 추가 보안 레이어
  is_locked BOOLEAN DEFAULT false,
  
  -- 전달 설정
  delivery_method VARCHAR(20) DEFAULT 'manual' 
    CHECK (delivery_method IN ('manual', 'time_based', 'event_based')),
  
  -- 수동 전달: 사망 시 가족이 요청
  -- 시간 기반: 특정 날짜에 자동 전달
  -- 이벤트 기반: 특정 조건 충족 시
  
  delivery_trigger_date DATE, -- 시간 기반일 경우
  
  -- 상태
  status VARCHAR(20) DEFAULT 'active' 
    CHECK (status IN ('active', 'preparing_delivery', 'delivered')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vaults_user ON digital_vaults(user_id);`

### 4.3.2 vault_items

sql

`CREATE TABLE vault_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vault_id UUID NOT NULL REFERENCES digital_vaults(id) ON DELETE CASCADE,
  
  -- 아이템 유형
  item_type VARCHAR(50) NOT NULL 
    CHECK (item_type IN ('financial', 'account', 'document', 'message', 'instruction', 'video_letter', 'other')),
  
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- 콘텐츠 (암호화됨)
  encrypted_content TEXT, -- 민감 정보 암호화
  file_url TEXT, -- 첨부파일 (Supabase Storage)
  
  -- 메타데이터
  metadata JSONB, -- 유형별 추가 정보
  
  -- 예시 metadata:
  -- financial: {"account_number": "xxx", "bank": "xxx"}
  -- account: {"service": "xxx", "username": "xxx", "recovery_email": "xxx"}
  -- video_letter: {"recipient": "xxx", "occasion": "wedding"}
  
  -- 중요도
  priority VARCHAR(20) DEFAULT 'normal' 
    CHECK (priority IN ('low', 'normal', 'high', 'critical')),
  
  -- 전달 설정
  recipient_user_ids UUID[], -- 전달받을 가족 ID들
  delivery_condition TEXT, -- 전달 조건 (자연어)
  
  -- 상태
  is_delivered BOOLEAN DEFAULT false,
  delivered_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vault_items_vault ON vault_items(vault_id);
CREATE INDEX idx_vault_items_type ON vault_items(item_type);
CREATE INDEX idx_vault_items_priority ON vault_items(priority);`

### 4.3.3 video_letters

sql

`CREATE TABLE video_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vault_item_id UUID NOT NULL REFERENCES vault_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 영상 정보
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  file_size_bytes BIGINT,
  
  -- 수신자
  recipient_name VARCHAR(100),
  recipient_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- 전달 조건
  delivery_occasion VARCHAR(100), -- 예: '18세 생일', '대학 졸업', '결혼식'
  delivery_date DATE, -- 특정 날짜 지정
  
  -- 상태
  is_delivered BOOLEAN DEFAULT false,
  delivered_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_video_letters_vault_item ON video_letters(vault_item_id);
CREATE INDEX idx_video_letters_user ON video_letters(user_id);
CREATE INDEX idx_video_letters_recipient ON video_letters(recipient_user_id);
CREATE INDEX idx_video_letters_delivery_date ON video_letters(delivery_date);`

---

### 4.4 커뮤니티 (동네 친구 찾기)

### 4.4.1 friend_matching_preferences

sql

`CREATE TABLE friend_matching_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 매칭 활성화
  is_active BOOLEAN DEFAULT false,
  
  -- 선호 거리 (미터 단위)
  max_distance_meters INTEGER DEFAULT 1000, -- 기본 1km
  
  -- 선호 나이 범위
  preferred_age_min INTEGER,
  preferred_age_max INTEGER,
  
  -- 선호 성별
  preferred_gender VARCHAR(10),
  
  -- 관심사/취미
  interests TEXT[], -- 예: ['산책', '등산', '바둑', '노래']
  
  -- 활동 시간대
  preferred_times JSONB, -- 예: {"morning": true, "afternoon": false, "evening": true}
  
  -- 활동 빈도
  preferred_frequency VARCHAR(20) 
    CHECK (preferred_frequency IN ('daily', 'weekly', 'monthly', 'flexible')),
  
  -- 소개글
  introduction TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_matching_prefs_user ON friend_matching_preferences(user_id);
CREATE INDEX idx_matching_prefs_active ON friend_matching_preferences(is_active);`

### 4.4.2 friend_matches

sql

`CREATE TABLE friend_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 매칭 점수
  match_score DECIMAL(3, 2), -- 0.00 ~ 1.00
  match_reason TEXT, -- AI가 생성한 매칭 이유
  
  -- 공통 관심사
  common_interests TEXT[],
  
  -- 거리
  distance_meters INTEGER,
  
  -- 상태
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'accepted', 'rejected', 'connected')),
  
  -- 수락 여부
  user1_accepted BOOLEAN DEFAULT false,
  user2_accepted BOOLEAN DEFAULT false,
  
  -- 연결 날짜
  connected_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(user1_id, user2_id),
  CHECK (user1_id < user2_id) -- 중복 방지
);

CREATE INDEX idx_matches_user1 ON friend_matches(user1_id);
CREATE INDEX idx_matches_user2 ON friend_matches(user2_id);
CREATE INDEX idx_matches_status ON friend_matches(status);`

### 4.4.3 chat_rooms

sql

`CREATE TABLE chat_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  room_type VARCHAR(20) DEFAULT 'direct' 
    CHECK (room_type IN ('direct', 'group')),
  
  room_name VARCHAR(100),
  
  -- 매칭과 연결 (선택사항)
  match_id UUID REFERENCES friend_matches(id) ON DELETE SET NULL,
  
  -- 마지막 메시지
  last_message_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_chat_rooms_match ON chat_rooms(match_id);
CREATE INDEX idx_chat_rooms_last_message ON chat_rooms(last_message_at);`

### 4.4.4 chat_participants

sql

`CREATE TABLE chat_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ,
  
  -- 알림 설정
  notifications_enabled BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(room_id, user_id)
);

CREATE INDEX idx_participants_room ON chat_participants(room_id);
CREATE INDEX idx_participants_user ON chat_participants(user_id);`

### 4.4.5 chat_messages

sql

`CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  message_type VARCHAR(20) DEFAULT 'text' 
    CHECK (message_type IN ('text', 'image', 'file', 'system')),
  
  content TEXT,
  file_url TEXT,
  
  -- 읽음 표시
  read_by UUID[], -- 읽은 사용자 ID들
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_messages_room ON chat_messages(room_id);
CREATE INDEX idx_messages_sender ON chat_messages(sender_id);
CREATE INDEX idx_messages_created ON chat_messages(room_id, created_at DESC);`

---

### 4.5 헬프데스크 (디지털 지원)

### 4.5.1 helpdesk_tickets

sql

`CREATE TABLE helpdesk_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  senior_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  helper_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- 문제 유형
  category VARCHAR(50) NOT NULL 
    CHECK (category IN ('kakao_talk', 'photo', 'banking', 'settings', 'app_install', 'other')),
  
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  
  -- 긴급도
  urgency VARCHAR(20) DEFAULT 'normal' 
    CHECK (urgency IN ('low', 'normal', 'high', 'urgent')),
  
  -- 상태
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'cancelled')),
  
  -- 세션 정보
  session_url TEXT, -- 화상 세션 URL
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  
  -- 평가
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_tickets_senior ON helpdesk_tickets(senior_user_id);
CREATE INDEX idx_tickets_helper ON helpdesk_tickets(helper_user_id);
CREATE INDEX idx_tickets_status ON helpdesk_tickets(status);
CREATE INDEX idx_tickets_category ON helpdesk_tickets(category);`

### 4.5.2 helper_profiles

sql

`CREATE TABLE helper_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 헬퍼 정보
  is_verified BOOLEAN DEFAULT false,
  verification_date DATE,
  
  -- 전문 분야
  specialties TEXT[], -- 예: ['카카오톡', '사진 관리', '뱅킹']
  
  -- 활동 시간
  available_hours JSONB, -- 요일별 가능 시간
  
  -- 통계
  total_sessions INTEGER DEFAULT 0,
  total_hours INTEGER DEFAULT 0,
  average_rating DECIMAL(2, 1),
  
  -- 포인트
  points_earned INTEGER DEFAULT 0,
  
  -- 상태
  is_active BOOLEAN DEFAULT true,
  last_active_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_helper_profiles_user ON helper_profiles(user_id);
CREATE INDEX idx_helper_profiles_verified ON helper_profiles(is_verified);
CREATE INDEX idx_helper_profiles_active ON helper_profiles(is_active);`

### 4.6 경력 재활용 (50+ 컨설팅)

### 4.6.1 expert_profiles

sql

`CREATE TABLE expert_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 전문가 정보
  professional_title VARCHAR(200), -- 예: '전 삼성전자 임원'
  company VARCHAR(200),
  years_of_experience INTEGER,
  
  -- 전문 분야
  expertise_areas TEXT[], -- 예: ['경영전략', '마케팅', '인사관리']
  industry VARCHAR(100), -- 예: '제조업', 'IT', '금융'
  
  -- 소개
  bio TEXT,
  career_highlights TEXT[], -- 주요 경력
  
  -- 상담 설정
  hourly_rate INTEGER, -- 시간당 요금 (원)
  consultation_types TEXT[], -- 예: ['1:1 상담', '그룹 세미나', '서면 자문']
  
  -- 가능 시간
  available_schedule JSONB,
  
  -- 인증
  is_verified BOOLEAN DEFAULT false,
  verification_documents TEXT[], -- 인증 서류 URL들
  
  -- 통계
  total_consultations INTEGER DEFAULT 0,
  average_rating DECIMAL(2, 1),
  total_earnings INTEGER DEFAULT 0,
  
  -- 상태
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_expert_profiles_user ON expert_profiles(user_id);
CREATE INDEX idx_expert_profiles_industry ON expert_profiles(industry);
CREATE INDEX idx_expert_profiles_verified ON expert_profiles(is_verified);
CREATE INDEX idx_expert_profiles_active ON expert_profiles(is_active);`

### 4.6.2 consultations

sql

`CREATE TABLE consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id UUID NOT NULL REFERENCES expert_profiles(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 상담 정보
  consultation_type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- 일정
  scheduled_date TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  
  -- 장소/방법
  meeting_method VARCHAR(20) NOT NULL 
    CHECK (meeting_method IN ('video', 'phone', 'in_person', 'written')),
  meeting_url TEXT, -- 화상 링크
  meeting_location TEXT, -- 대면일 경우
  
  -- 상태
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- 완료 정보
  completed_at TIMESTAMPTZ,
  actual_duration_minutes INTEGER,
  
  -- 결과물
  consultation_notes TEXT,
  attachments TEXT[],
  
  -- 평가
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  
  -- 결제
  amount INTEGER NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending' 
    CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_consultations_expert ON consultations(expert_id);
CREATE INDEX idx_consultations_client ON consultations(client_user_id);
CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_scheduled ON consultations(scheduled_date);`

---

### 4.7 결제 및 구독

### 4.7.1 subscriptions

sql

`CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 구독 플랜
  plan_type VARCHAR(20) NOT NULL 
    CHECK (plan_type IN ('free', 'basic', 'premium', 'family')),
  
  -- 기간
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  
  -- 상태
  status VARCHAR(20) DEFAULT 'active' 
    CHECK (status IN ('trial', 'active', 'paused', 'cancelled', 'expired')),
  
  -- 갱신
  is_auto_renew BOOLEAN DEFAULT true,
  next_billing_date DATE,
  
  -- 결제
  monthly_amount INTEGER, -- 월 결제액
  billing_cycle VARCHAR(20) CHECK (billing_cycle IN ('monthly', 'yearly')),
  
  -- 취소
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(end_date);`

### 4.7.2 payments

sql

`CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 결제 유형
  payment_type VARCHAR(50) NOT NULL 
    CHECK (payment_type IN ('subscription', 'consultation', 'book_printing', 'one_time')),
  
  -- 관련 레코드
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  consultation_id UUID REFERENCES consultations(id) ON DELETE SET NULL,
  
  -- 금액
  amount INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'KRW',
  
  -- 결제 수단
  payment_method VARCHAR(20) 
    CHECK (payment_method IN ('card', 'bank_transfer', 'kakao_pay', 'naver_pay', 'toss')),
  
  -- PG사 정보
  pg_provider VARCHAR(50), -- 예: 'tosspayments', 'inicis'
  pg_transaction_id VARCHAR(200) UNIQUE,
  
  -- 상태
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')),
  
  -- 결제 시간
  paid_at TIMESTAMPTZ,
  
  -- 환불
  refunded_at TIMESTAMPTZ,
  refund_amount INTEGER,
  refund_reason TEXT,
  
  -- 영수증
  receipt_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_type ON payments(payment_type);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_pg_transaction ON payments(pg_transaction_id);`

---

### 4.8 알림

### 4.8.1 notifications

sql

`CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 알림 유형
  notification_type VARCHAR(50) NOT NULL 
    CHECK (notification_type IN (
      'friend_match', 'chat_message', 'helpdesk_assigned', 
      'consultation_booked', 'payment_completed', 'biography_milestone',
      'vault_delivery', 'subscription_expiring', 'system'
    )),
  
  -- 내용
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  
  -- 링크
  action_url TEXT,
  
  -- 관련 데이터
  related_entity_type VARCHAR(50),
  related_entity_id UUID,
  
  -- 상태
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  -- 전송 채널
  push_sent BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  sms_sent BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_read ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(user_id, created_at DESC);`

---

### 4.9 시스템 관리

### 4.9.1 activity_logs

sql

`CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- 활동 정보
  action VARCHAR(100) NOT NULL, -- 예: 'user.login', 'biography.chapter.create'
  entity_type VARCHAR(50),
  entity_id UUID,
  
  -- 상세 정보
  details JSONB,
  
  -- IP 및 장치
  ip_address INET,
  user_agent TEXT,
  device_info JSONB,
  
  -- 결과
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);`

### 4.9.2 ai_processing_queue

sql

`CREATE TABLE ai_processing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 작업 유형
  task_type VARCHAR(50) NOT NULL 
    CHECK (task_type IN ('audio_transcription', 'text_generation', 'image_analysis', 'summary')),
  
  -- 관련 엔티티
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  
  -- 입력 데이터
  input_data JSONB NOT NULL,
  
  -- 상태
  status VARCHAR(20) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  
  -- 재시도
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  
  -- 처리 시간
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  processing_time_ms INTEGER,
  
  -- 결과
  output_data JSONB,
  error_message TEXT,
  
  -- 비용
  tokens_used INTEGER,
  estimated_cost DECIMAL(10, 4),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ai_queue_status ON ai_processing_queue(status);
CREATE INDEX idx_ai_queue_entity ON ai_processing_queue(entity_type, entity_id);
CREATE INDEX idx_ai_queue_created ON ai_processing_queue(created_at);`

---

## 5. 인덱스 설계

### 5.1 성능 최적화 인덱스

sql

- `- 복합 인덱스 (자주 같이 검색되는 컬럼)CREATE INDEX idx_chapters_project_status ON biography_chapters(project_id, status);CREATE INDEX idx_messages_room_created ON chat_messages(room_id, created_at DESC);CREATE INDEX idx_notifications_user_read_created ON notifications(user_id, is_read, created_at DESC);- 전문 검색 인덱스 (Full Text Search)CREATE INDEX idx_chapters_content_fts ON biography_chapters USING gin(to_tsvector('korean', content));CREATE INDEX idx_vault_items_fts ON vault_items USING gin(to_tsvector('korean', title || ' ' || description));- 지리 검색 인덱스CREATE INDEX idx_profiles_location_gist ON user_profiles USING gist(ll_to_earth(latitude, longitude));`

### 5.2 인덱스 모니터링

sql

- `- 사용되지 않는 인덱스 찾기SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
WHERE idx_scan = 0ORDER BY pg_relation_size(indexrelid) DESC;`

---

## 6. 보안 정책 (RLS)

### 6.1 Row Level Security 정책

sql

- `- 모든 테이블에 RLS 활성화ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;ALTER TABLE biography_projects ENABLE ROW LEVEL SECURITY;ALTER TABLE biography_chapters ENABLE ROW LEVEL SECURITY;ALTER TABLE digital_vaults ENABLE ROW LEVEL SECURITY;ALTER TABLE vault_items ENABLE ROW LEVEL SECURITY;- ... (모든 테이블)- 사용자는 자신의 데이터만 조회/수정CREATE POLICY "Users can manage own data" ON user_profiles
 FOR ALL USING (auth.uid() = user_id);- 자서전: 본인 + 권한 있는 가족CREATE POLICY "Biography access policy" ON biography_projects
 FOR SELECT USING ( user_id = auth.uid() OR EXISTS ( SELECT 1 FROM user_relationships
 WHERE senior_user_id = biography_projects.user_id
 AND family_user_id = auth.uid() AND can_view_biography = true AND status = 'accepted' ) );- 채팅: 참여자만 조회CREATE POLICY "Chat participants only" ON chat_messages
 FOR SELECT USING ( EXISTS ( SELECT 1 FROM chat_participants
 WHERE chat_participants.room_id = chat_messages.room_id
 AND chat_participants.user_id = auth.uid() ) );- 헬프데스크: 요청자 또는 담당 헬퍼CREATE POLICY "Helpdesk access" ON helpdesk_tickets
 FOR SELECT USING ( senior_user_id = auth.uid() OR helper_user_id = auth.uid() );`

### 6.2 민감 정보 암호화

sql

- `- Supabase의 pgcrypto 확장 사용CREATE EXTENSION IF NOT EXISTS pgcrypto;- 암호화 함수CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT, key TEXT)RETURNS TEXT AS $$
BEGIN RETURN encode( pgp_sym_encrypt(data, key), 'base64' );END;$$ LANGUAGE plpgsql;- 복호화 함수CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data TEXT, key TEXT)RETURNS TEXT AS $$
BEGIN RETURN pgp_sym_decrypt( decode(encrypted_data, 'base64'), key );END;$$ LANGUAGE plpgsql;`

---

## 7. 트리거 및 함수

### 7.1 updated_at 자동 업데이트

sql

- `- 트리거 함수CREATE OR REPLACE FUNCTION update_updated_at_column()RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW;END;$$ LANGUAGE plpgsql;- 모든 테이블에 트리거 적용CREATE TRIGGER update_user_profiles_updated_at
 BEFORE UPDATE ON user_profiles
 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();CREATE TRIGGER update_biography_projects_updated_at
 BEFORE UPDATE ON biography_projects
 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();- ... (모든 테이블에 적용)`

### 7.2 자서전 통계 자동 업데이트

sql

`CREATE OR REPLACE FUNCTION update_biography_stats()
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

CREATE TRIGGER update_biography_stats_trigger
  AFTER INSERT OR UPDATE ON biography_chapters
  FOR EACH ROW
  EXECUTE FUNCTION update_biography_stats();`

### 7.3 알림 자동 생성

sql

`CREATE OR REPLACE FUNCTION create_notification_on_match()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'pending' THEN
    -- user1에게 알림
    INSERT INTO notifications (user_id, notification_type, title, message, related_entity_id)
    VALUES (
      NEW.user1_id,
      'friend_match',
      '새로운 친구 매칭',
      '가까운 곳에 관심사가 비슷한 친구가 있어요!',
      NEW.id
    );
    
    -- user2에게 알림
    INSERT INTO notifications (user_id, notification_type, title, message, related_entity_id)
    VALUES (
      NEW.user2_id,
      'friend_match',
      '새로운 친구 매칭',
      '가까운 곳에 관심사가 비슷한 친구가 있어요!',
      NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER notify_on_friend_match
  AFTER INSERT ON friend_matches
  FOR EACH ROW
  EXECUTE FUNCTION create_notification_on_match();`

### 7.4 구독 만료 체크

sql

`CREATE OR REPLACE FUNCTION check_expired_subscriptions()
RETURNS void AS $$
BEGIN
  UPDATE subscriptions
  SET status = 'expired'
  WHERE end_date < CURRENT_DATE
    AND status = 'active';
    
  -- 만료 7일 전 알림
  INSERT INTO notifications (user_id, notification_type, title, message)
  SELECT 
    user_id,
    'subscription_expiring',
    '구독이 곧 만료됩니다',
    '7일 후 구독이 만료됩니다. 갱신해주세요.'
  FROM subscriptions
  WHERE end_date = CURRENT_DATE + INTERVAL '7 days'
    AND status = 'active';
END;
$$ LANGUAGE plpgsql;

-- 매일 실행되는 크론 작업 (Supabase Extensions 사용)
SELECT cron.schedule(
  'check-expired-subscriptions',
  '0 0 * * *', -- 매일 자정
  'SELECT check_expired_subscriptions()'
);`

---

## 8. 마이그레이션 스크립트

### 8.1 초기 마이그레이션

sql

- `- migrations/001_initial_setup.sqlBEGIN;- ExtensionsCREATE EXTENSION IF NOT EXISTS "uuid-ossp";CREATE EXTENSION IF NOT EXISTS "pgcrypto";CREATE EXTENSION IF NOT EXISTS "pg_trgm"; - 유사 검색CREATE EXTENSION IF NOT EXISTS "earthdistance" CASCADE; - 거리 계산- 1. 사용자 관련 테이블- (위의 4.1 섹션 SQL)- 2. 자서전 관련 테이블- (위의 4.2 섹션 SQL)- 3. 디지털 유산 관련 테이블- (위의 4.3 섹션 SQL)- 4. 커뮤니티 관련 테이블- (위의 4.4 섹션 SQL)- 5. 헬프데스크 관련 테이블- (위의 4.5 섹션 SQL)- 6. 전문가 상담 관련 테이블- (위의 4.6 섹션 SQL)- 7. 결제 관련 테이블- (위의 4.7 섹션 SQL)- 8. 알림 및 시스템 테이블- (위의 4.8, 4.9 섹션 SQL)COMMIT;`

### 8.2 샘플 데이터 삽입

sql

- `- migrations/002_seed_data.sqlBEGIN;- 인터뷰 질문 템플릿INSERT INTO interview_questions (category, question_text, follow_up_questions, difficulty_level, recommended_order) VALUES('childhood', '어린 시절 가장 기억에 남는 순간은 무엇인가요?', ARRAY['그때 어디에 살고 계셨나요?', '당시 가족 구성원은 어떻게 되셨나요?'], 'easy', 1),('childhood', '어릴 적 꿈은 무엇이었나요?', ARRAY['그 꿈을 갖게 된 계기가 있나요?', '나중에 실제로 그 길을 가셨나요?'], 'easy', 2),('family', '배우자를 처음 만난 순간을 기억하시나요?', ARRAY['첫인상은 어떠셨나요?', '어떻게 교제를 시작하게 되셨나요?'], 'medium', 10),('career', '첫 직장은 어디였나요?', ARRAY['입사 당시 기분이 어땠나요?', '가장 기억에 남는 프로젝트는?'], 'medium', 15),('life_lessons', '인생에서 가장 큰 깨달음을 얻은 순간은?', ARRAY['그 경험이 이후 인생에 어떤 영향을 주었나요?'], 'deep', 30);COMMIT;`

---

## 9. 백업 및 복구 전략

### 9.1 백업 정책

`1. 자동 백업 (Supabase 기본)
   - 일일 자동 백업: 7일 보관
   - 주간 백업: 4주 보관
   - 월간 백업: 6개월 보관

2. 중요 데이터 추가 백업
   - 자서전 콘텐츠: 실시간 복제
   - 디지털 유산: 암호화 후 별도 저장소
   - 결제 데이터: 별도 아카이빙

3. Point-in-Time Recovery (PITR)
   - Supabase Pro 이상: 7일간 PITR 지원`

### 9.2 복구 절차

sql

- `- 특정 시점으로 복구 (Supabase CLI)supabase db dump -db-url "postgresql://..." > backup.sql- 특정 테이블만 복구pg_restore -table=biography_projects backup.sql- 데이터 검증SELECT COUNT() FROM biography_projects WHERE deleted_at IS NULL;`

### 9.3 재해 복구 계획

`RTO (Recovery Time Objective): 4시간
RPO (Recovery Point Objective): 1시간

복구 우선순위:
1. 사용자 인증 (Supabase Auth)
2. 구독 및 결제 데이터
3. 자서전 및 디지털 유산 데이터
4. 커뮤니티 및 채팅 데이터
5. 활동 로그`

---

## 10. 데이터베이스 유지보수

### 10.1 정기 작업

sql

- `- 매주 실행: VACUUM 및 ANALYZEVACUUM ANALYZE;- 매월 실행: 오래된 소프트 삭제 데이터 정리DELETE FROM biography_chapters
WHERE deleted_at < NOW()  INTERVAL '90 days';DELETE FROM chat_messages
WHERE deleted_at < NOW()  INTERVAL '30 days';- 분기별: 인덱스 재생성REINDEX DATABASE kieokchaekbang;`

### 10.2 모니터링 쿼리

sql

- `- 테이블 크기 확인SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;- 느린 쿼리 찾기SELECT query, calls, total_time, mean_time, max_time
FROM pg_stat_statements
ORDER BY mean_time DESCLIMIT 10;- 데드락 감지SELECT  FROM pg_stat_activity WHERE wait_event_type = 'Lock';`

---

## 11. 성능 최적화 가이드

### 11.1 파티셔닝 (대용량 데이터)

sql

- `- 채팅 메시지 월별 파티셔닝 (1년 후 구현)CREATE TABLE chat_messages_2026_01 PARTITION OF chat_messages
 FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');CREATE TABLE chat_messages_2026_02 PARTITION OF chat_messages
 FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');`

### 11.2 읽기 전용 복제본

- `Supabase Pro: 읽기 전용 복제본 추가
통계 쿼리, 리포트 생성 → 복제본 사용
쓰기 작업 → Primary DB 사용`

### 11.3 캐싱 전략

- `Redis 캐싱:
 - 사용자 프로필: TTL 1시간
 - 인터뷰 질문 목록: TTL 24시간
 - 전문가 프로필 목록: TTL 30분
Supabase Realtime 구독:
 - 채팅 메시지
 - 알림
 - 헬프데스크 티켓 상태`

---

## 12. 보안 체크리스트

- [ ]  모든 테이블에 RLS 활성화
- [ ]  민감 정보 암호화 (vault_items.encrypted_content)
- [ ]  외래 키 제약조건 설정
- [ ]  Soft delete 구현 (deleted_at)
- [ ]  API Rate Limiting (Supabase Edge Functions)
- [ ]  SQL Injection 방지 (Parameterized queries)
- [ ]  개인정보 접근 로그 (activity_logs)
- [ ]  GDPR 준수 (데이터 삭제 요청 처리)

---

## 13. 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
| --- | --- | --- | --- |
| 1.0 | 2025.12.29 | 초안 작성 - 전체 스키마 설계 |  |

---

**문서 버전**: v1.0

**최종 업데이트**: 2025년 12월 29일

**다음 검토 예정일**: Phase 1 개발 시작 전

**문서 상태**: ✅ 검토 완료

---

## 부록 A: 주요 쿼리 예제

### A.1 거리 기반 친구 찾기

sql

`SELECT 
  up1.user_id,
  up1.full_name,
  earth_distance(
    ll_to_earth(up1.latitude, up1.longitude),
    ll_to_earth(up2.latitude, up2.longitude)
  ) AS distance_meters
FROM user_profiles up1
CROSS JOIN user_profiles up2
WHERE up1.user_id != up2.user_id
  AND earth_box(ll_to_earth(up2.latitude, up2.longitude), 1000) @> ll_to_earth(up1.latitude, up1.longitude)
ORDER BY distance_meters
LIMIT 10;`

### A.2 자서전 진행률 조회

sql

`SELECT 
  bp.id,
  bp.title,
  bp.total_chapters,
  bp.completion_percentage,
  COUNT(bc.id) FILTER (WHERE bc.status = 'completed') AS completed_chapters,
  COUNT(bc.id) FILTER (WHERE bc.status = 'draft') AS draft_chapters
FROM biography_projects bp
LEFT JOIN biography_chapters bc ON bp.id = bc.project_id
WHERE bp.user_id = 'USER_UUID'
  AND bp.deleted_at IS NULL
GROUP BY bp.id;`

### A.3 읽지 않은 알림 수

sql

`SELECT 
  user_id,
  notification_type,
  COUNT(*) AS unread_count
FROM notifications
WHERE user_id = 'USER_UUID'
  AND is_read = false
  AND deleted_at IS NULL
GROUP BY user_id, notification_type;`