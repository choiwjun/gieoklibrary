# 기억책방 - TRD (Technical Requirements Document)

## 📌 문서 정보

**프로젝트**: 기억책방 (Gieok Library)

**문서 유형**: 기술 요구사항 정의서 (TRD)

**버전**: v1.0

**작성일**: 2025년 12월 29일

**목적**: 개발팀이 시스템을 구현하기 위한 기술적 요구사항 및 제약사항 정의

---

## 📖 목차

1. [시스템 개요](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
2. [기술 스택](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
3. [시스템 아키텍처](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
4. [성능 요구사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
5. [보안 요구사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
6. [확장성 요구사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
7. [인프라 요구사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
8. [외부 서비스 연동](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
9. [데이터 관리](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
10. [개발 환경](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
11. [품질 요구사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)
12. [제약사항](https://www.notion.so/2d8aa1380be3809fb407f21261172019?pvs=21)

---

## 1. 시스템 개요

### 1.1 프로젝트 개요

- **서비스명**: 기억책방 (Gieok Library)
- **서비스 유형**: 시니어 생애 기록 및 치매 케어 통합 플랫폼
- **배포 형태**:
    - Phase 1: 반응형 웹 애플리케이션
    - Phase 2: 모바일 앱 (iOS/Android)

### 1.2 핵심 기능

1. AI 음성 자서전 (음성→텍스트 변환 + AI 정리 + 대화 패턴 분석)
2. 영상 편지 타임캡슐 (조건부 전달 시스템)
3. 동네 친구 매칭 (AI 기반 추천)
4. 50+ 경력 매칭 (일자리/멘토링)
5. 디지털 유언장 (암호화 저장)
6. 케어 기관 매칭 (치매안심센터, 요양보호사)
7. 구독 및 결제 시스템
8. 관리자 대시보드

### 1.3 주요 사용자

- 건강한 60대 초반 은퇴자 (주 타겟)
- 경증 치매 환자 가족
- 시니어 케어 관련 기관 (B2B)

---

## 2. 기술 스택

### 2.1 프론트엔드

### 웹 애플리케이션

- `Framework: Next.js 14+ (App Router)
Language: TypeScript 5+
UI Library: React 18+
Styling: Tailwind CSS 3+
State Management: Zustand 또는 React Query
Form Handling: React Hook Form
Validation: Zod`

**선정 이유**:

- Next.js: SSR/SSG 지원, SEO 최적화, 성능 우수
- TypeScript: 타입 안정성, 유지보수성
- Tailwind: 빠른 개발, 일관된 디자인 시스템

### 모바일 애플리케이션 (Phase 2)

- `Framework: React Native 또는 Flutter
우선순위: React Native (웹 코드 재사용)`

### 2.2 백엔드

### API 서버

- `Platform: Supabase
 - PostgreSQL Database
 - Edge Functions (Serverless)
 - Realtime Subscriptions
 - Storage (파일 저장)
 - Authentication`

**선정 이유**:

- 빠른 개발 속도
- 자동 확장성
- 실시간 기능 내장
- PostgreSQL 기반 (안정성)
- 1인 운영에 최적화

### 보조 서버 (필요시)

- `Node.js + Express (Edge Functions 보완용)
Python FastAPI (AI 처리 전용)`

### 2.3 데이터베이스

### 주 데이터베이스

- `Type: PostgreSQL 14+
Provider: Supabase (Managed)
용도: 모든 구조화 데이터`

### 파일 저장소

- `Provider: Supabase Storage
용도:
 - 음성 파일 (.webm, .mp4)
 - 영상 파일 (.mp4)
 - 이미지 파일 (.jpg, .png)
 - PDF 파일`

### 2.4 외부 API 및 서비스

### AI 서비스

- `음성 인식: OpenAI Whisper API
텍스트 처리: OpenAI GPT-4o 또는 Claude 3.5 Sonnet
대화 패턴 분석: Custom AI Model (GPT-4o 기반)`

### 인증

- `Supabase Auth
 - 카카오 OAuth 2.0
 - 네이버 OAuth 2.0
 - Google OAuth 2.0`

### 결제

- `Primary: 토스페이먼츠
Backup: 아임포트
지원 결제 수단:
 - 신용카드
 - 계좌이체
 - 간편결제 (카카오페이, 토스페이)`

### 지도/위치

- `카카오맵 API (동네 친구 매칭, 케어 기관 위치)`

### 알림

- `Push: Firebase Cloud Messaging (FCM)
Email: SendGrid 또는 AWS SES
SMS: 알리고 또는 Twilio`

### 2.5 배포 및 호스팅

### 프론트엔드

- `Platform: Vercel
CDN: Vercel Edge Network (자동)
SSL: 자동 발급 (Let's Encrypt)
도메인: gieok.app`

### 백엔드

- `Platform: Supabase (Managed)
Region: ap-northeast-2 (서울)`

### 파일 CDN

- `Supabase Storage (자동 CDN)
또는 CloudFlare CDN`

### 2.6 모니터링 및 분석

### 에러 추적

- `Sentry (프론트엔드 + 백엔드)`

### 로그 관리

- `Supabase Logs
Vercel Logs`

### 사용자 분석

- `Google Analytics 4
Mixpanel (선택사항)`

### 성능 모니터링

- `Vercel Analytics
Web Vitals 추적`

---

## 3. 시스템 아키텍처

### 3.1 전체 아키텍처

`[사용자] 
   ↓
[Vercel CDN] → [Next.js App]
   ↓
[Supabase]
   ├─ PostgreSQL (데이터)
   ├─ Storage (파일)
   ├─ Edge Functions (비즈니스 로직)
   └─ Realtime (실시간 기능)
   ↓
[외부 서비스]
   ├─ OpenAI API (음성→텍스트, AI 정리)
   ├─ 결제 API (토스페이먼츠)
   ├─ 카카오맵 API
   ├─ FCM (푸시 알림)
   └─ SendGrid (이메일)`

### 3.2 데이터 흐름

### AI 음성 자서전 처리 흐름

`1. 사용자 → 음성 녹음 (WebRTC)
2. Next.js → Supabase Storage 업로드
3. Edge Function → OpenAI Whisper API (음성→텍스트)
4. Edge Function → GPT-4o API (텍스트 정리)
5. Edge Function → 대화 패턴 분석 (AI)
6. PostgreSQL → 결과 저장
7. FCM → 사용자 알림`

### 영상 편지 전달 흐름

`1. Cron Job (매일 00:00) → Edge Function 실행
2. PostgreSQL 조회 → 전달 조건 확인
3. 조건 만족 시:
   - 수신자에게 FCM 푸시
   - 이메일 발송 (SendGrid)
   - 상태 업데이트`

### 3.3 보안 아키텍처

`[사용자]
   ↓ HTTPS (TLS 1.3)
[Vercel] → WAF (Web Application Firewall)
   ↓
[Supabase] 
   ├─ Row Level Security (RLS)
   ├─ JWT Authentication
   └─ 데이터 암호화 (AES-256)`

---

## 4. 성능 요구사항

### 4.1 응답 시간

| 작업 | 목표 시간 | 최대 허용 |
| --- | --- | --- |
| 페이지 로드 (초기) | < 2초 | < 3초 |
| 페이지 전환 | < 500ms | < 1초 |
| API 응답 (일반) | < 300ms | < 500ms |
| 음성 업로드 (30분) | < 10초 | < 20초 |
| AI 텍스트 변환 | < 1분 | < 2분 |
| AI 텍스트 정리 | < 2분 | < 3분 |
| 영상 업로드 (5분) | < 30초 | < 60초 |

### 4.2 동시 사용자

| 단계 | 동시 접속자 | Peak |
| --- | --- | --- |
| MVP (6개월) | 50명 | 100명 |
| 성장기 (1년) | 200명 | 500명 |
| 확장기 (2년) | 500명 | 1,000명 |

### 4.3 처리량

- `일 녹음 처리: 500건
일 영상 업로드: 50건
일 API 호출: 100,000건
동시 AI 처리: 10건`

### 4.4 최적화 요구사항

### 프론트엔드

- `Core Web Vitals 달성:
 - LCP (Largest Contentful Paint) < 2.5초
 - FID (First Input Delay) < 100ms
 - CLS (Cumulative Layout Shift) < 0.1
이미지 최적화: WebP, lazy loading
코드 스플리팅: Route-based splitting
캐싱: SWR 또는 React Query`

### 백엔드

- `Database Indexing: 모든 쿼리 최적화
Connection Pooling: 최대 100 connections
Query Caching: 자주 조회되는 데이터
CDN: 정적 파일 전체 CDN 제공`

---

## 5. 보안 요구사항

### 5.1 인증 및 권한

### 인증 (Authentication)

- `OAuth 2.0 (카카오, 네이버, 구글)
JWT 토큰 기반 세션 관리
Access Token 유효기간: 1시간
Refresh Token 유효기간: 30일
2FA (선택사항, Phase 2)`

### 권한 (Authorization)

- `Role-Based Access Control (RBAC)
Roles:
 - user: 일반 사용자
 - premium_user: 유료 사용자
 - admin: 관리자
Supabase Row Level Security (RLS)로 데이터 접근 제어`

### 5.2 데이터 보안

### 전송 중 암호화

- `HTTPS (TLS 1.3) 필수
HSTS 헤더 적용
Certificate Pinning (모바일 앱)`

### 저장 데이터 암호화

- `Database: AES-256 암호화 (Supabase 자동)
민감 필드: 추가 암호화
 - 주민등록번호 (유언장)
 - 금융 정보
 - 건강 정보 (치매 분석 결과)
Storage: 파일 암호화`

### 암호화 필수 데이터

`1. 디지털 유언장 전체 내용
2. 주민등록번호
3. 금융 계좌 정보
4. AI 대화 패턴 분석 결과
5. 영상 편지 (사후 전달용)`

### 5.3 개인정보 보호

### GDPR 및 개인정보보호법 준수

- `개인정보 처리방침 명시
쿠키 동의 (Cookie Consent)
데이터 다운로드 기능
데이터 삭제 요청 처리 (30일 유예)
제3자 제공 동의 (결제, AI 처리)`

### 민감정보 처리

- `최소 수집 원칙
목적 외 사용 금지
보유 기간 명시
 - 회원 정보: 탈퇴 후 30일
 - 녹음/영상: 탈퇴 후 30일
 - 결제 정보: 5년 (전자상거래법)`

### 5.4 애플리케이션 보안

### 입력 검증

- `모든 사용자 입력 검증 (Client + Server)
XSS 방지: HTML 이스케이프
SQL Injection 방지: Parameterized Query
CSRF 방지: CSRF Token`

### 파일 업로드 보안

- `파일 타입 검증:
 - 음성: .webm, .mp4, .m4a만 허용
 - 영상: .mp4만 허용
 - 이미지: .jpg, .png만 허용
파일 크기 제한:
 - 음성: 50MB
 - 영상: 500MB
 - 이미지: 10MB
바이러스 스캔 (ClamAV 또는 클라우드 서비스)
파일명 난수화`

### API 보안

- `Rate Limiting:
 - 일반 API: 100 req/min/IP
 - AI API: 10 req/min/user
 - 로그인: 5 attempts/15min
API Key 관리: 환경변수로 관리
CORS 설정: 허용된 도메인만`

### 5.5 모니터링 및 감사

- `접근 로그: 모든 API 호출 기록
보안 이벤트 로그:
 - 로그인 실패
 - 권한 없는 접근 시도
 - 비정상적인 API 호출
정기 보안 감사: 분기 1회
취약점 스캔: 월 1회`

---

## 6. 확장성 요구사항

### 6.1 수평 확장 (Horizontal Scaling)

### 프론트엔드

- `Vercel Serverless Functions: 자동 확장
Edge Network: 자동 글로벌 배포`

### 백엔드

- `Supabase: 자동 확장 (Managed)
Edge Functions: Serverless 자동 확장`

### 6.2 수직 확장 (Vertical Scaling)

### Database

- `Supabase Plan Upgrade:
 - Free → Pro → Team → Enterprise
예상 계획:
 - MVP: Free (500MB)
 - 6개월: Pro (8GB)
 - 1년: Team (unlimited)`

### 6.3 캐싱 전략

### CDN 캐싱

- `정적 파일: 1년
API 응답: 사용자별 캐싱 (SWR)`

### 애플리케이션 캐싱

- `React Query: API 응답 캐싱
LocalStorage: 사용자 설정`

### Database 캐싱

- `자주 조회되는 데이터:
 - 사용자 프로필: 5분
 - 녹음 목록: 1분
 - 추천 친구: 10분`

### 6.4 로드 밸런싱

- `Vercel: 자동 로드 밸런싱
Supabase: Connection Pooling`

---

## 7. 인프라 요구사항

### 7.1 서버 환경

### Vercel (프론트엔드)

- `Region: Global Edge Network
Node.js: 18.x
Build: Next.js 자동 빌드
Environment Variables: 암호화 저장`

### Supabase (백엔드)

- `Region: ap-northeast-2 (서울)
PostgreSQL: 14+
Storage: ap-northeast-2
Edge Functions: Deno runtime`

### 7.2 도메인 및 DNS

- `메인 도메인: gieok.app
서브도메인:
 - www.gieok.app (메인)
 - api.gieok.app (API, 필요시)
 - admin.gieok.app (관리자)
 - storage.gieok.app (파일 CDN)
DNS Provider: Cloudflare
SSL: 자동 발급 및 갱신`

### 7.3 백업 및 복구

### 데이터베이스 백업

- `자동 백업: 일 1회 (Supabase 자동)
보관 기간: 30일
Point-in-Time Recovery (PITR): 가능`

### 파일 백업

- `Storage 백업: 주 1회
중요 파일 (유언장, 영상 편지): 추가 백업
백업 위치: S3 또는 Google Cloud Storage`

### 재해 복구 (DR)

- `RTO (Recovery Time Objective): 4시간
RPO (Recovery Point Objective): 24시간
백업 복구 테스트: 분기 1회`

### 7.4 로그 관리

- `Application Logs: Vercel Logs (7일)
Database Logs: Supabase Logs (7일)
Access Logs: 30일 보관
Error Logs: Sentry (무제한)`

---

## 8. 외부 서비스 연동

### 8.1 OpenAI API

### 음성 인식 (Whisper)

- `Endpoint: /v1/audio/transcriptions
Model: whisper-1
Format: webm, mp4, m4a
예상 비용: $0.006/분
월 예상 호출: 15,000분 (사용자 500명 기준)
월 예상 비용: $90`

### 텍스트 처리 (GPT-4o)

- `Endpoint: /v1/chat/completions
Model: gpt-4o
Input: $2.50/1M tokens
Output: $10/1M tokens
월 예상 호출: 500건
평균 토큰: 50,000 tokens/호출
월 예상 비용: $250`

### 8.2 결제 (토스페이먼츠)

- `API Version: v1
지원 결제:
 - 카드: 3.3% 수수료
 - 계좌이체: 1.8% 수수료
 - 간편결제: 3.3% 수수료
Webhook: 결제 완료/실패/취소 알림
정산: D+3 (영업일)`

### 8.3 카카오맵 API

- `용도: 동네 친구 매칭, 케어 기관 위치
API:
 - 주소 검색
 - 좌표→주소 변환
 - 거리 계산
할당량: 300,000 호출/일 (무료)`

### 8.4 알림 서비스

### FCM (Push Notification)

- `Platform: Firebase Cloud Messaging
지원: Android, iOS, Web
무료`

### SendGrid (Email)

- `Free Plan: 100 emails/day
Essentials Plan: $19.95/월 (50,000 emails/월)`

### SMS (알리고)

- `건당 비용: 15원
월 예상 발송: 3,000건
월 예상 비용: 45,000원`

---

## 9. 데이터 관리

### 9.1 데이터베이스 설계 원칙

- `정규화: 3NF까지 적용
Indexing: 모든 외래 키 및 검색 필드
Soft Delete: 중요 데이터는 soft delete
Timestamp: created_at, updated_at 필수
UUID: Primary Key는 UUID 사용`

### 9.2 주요 테이블 목록

sql

- `- 사용자 및 인증users
user_preferences
family_members
family_invitations
- AI 음성 자서전recordings
cognitive_health_log
- 영상 편지video_letters
video_letter_views
- 동네 친구 매칭friend_profiles
friend_requests
friendships
messages
meetups
- 경력 매칭career_profiles
job_postings
mentoring_requests
applications
activities
- 디지털 유언장wills
lawyer_consultations
- 케어 기관care_facilities
care_requests
care_activities
- 구독 및 결제subscriptions
payments
coupons
- 관리자admin_users
reports
support_tickets`

### 9.3 데이터 보존 정책

| 데이터 유형 | 보존 기간 | 삭제 방식 |
| --- | --- | --- |
| 회원 정보 | 탈퇴 후 30일 | Soft delete |
| 녹음/영상 | 탈퇴 후 30일 | Soft delete |
| 유언장 | 전달 후 5년 | Soft delete |
| 채팅 기록 | 1년 | Hard delete |
| 결제 정보 | 5년 (법적 의무) | Hard delete |
| 로그 | 30일 | Hard delete |

### 9.4 데이터 마이그레이션

- `버전 관리: Supabase Migrations
롤백 가능: 모든 마이그레이션
테스트: Staging 환경에서 먼저 실행
백업: 마이그레이션 전 필수 백업`

---

## 10. 개발 환경

### 10.1 개발 도구

- `IDE: VS Code
Version Control: Git
Repository: GitHub (Private)
Package Manager: pnpm (빠른 속도)
Linting: ESLint
Formatting: Prettier
Type Checking: TypeScript`

### 10.2 환경 분리

- `Local: 개발자 로컬 환경
Development: 개발 환경 (dev.gieok.app)
Staging: 테스트 환경 (staging.gieok.app)
Production: 운영 환경 (gieok.app)`

### 10.3 CI/CD

### GitHub Actions

yaml

- `Push to main → Vercel Production 자동 배포
 Push to develop → Vercel Preview 자동 배포
 PR 생성 → Vercel Preview + Tests 실행`

### 파이프라인

`1. Lint & Type Check
2. Unit Tests
3. Build
4. Deploy to Vercel
5. Integration Tests (Staging only)
6. Smoke Tests`

### 10.4 테스트 전략

### Unit Tests

- `Framework: Vitest
Coverage: 70% 이상
대상: 비즈니스 로직, 유틸 함수`

### Integration Tests

- `Framework: Playwright
대상: API 엔드포인트, DB 작업`

### E2E Tests

- `Framework: Playwright
대상: 핵심 사용자 플로우
 - 회원가입 → 첫 녹음
 - 영상 편지 생성
 - 구독 결제`

---

## 11. 품질 요구사항

### 11.1 코드 품질

- `코드 리뷰: 모든 PR 필수
Linting: ESLint 통과 필수
Type Safety: TypeScript strict mode
주석: 복잡한 로직에만
네이밍: 명확하고 일관된 네이밍`

### 11.2 접근성 (Accessibility)

- `WCAG 2.1 Level AA 준수
키보드 네비게이션 지원
Screen Reader 지원
명도 대비 4.5:1 이상
Alt Text: 모든 이미지`

### 11.3 브라우저 지원

- `Chrome: 최신 2개 버전
Safari: 최신 2개 버전
Firefox: 최신 2개 버전
Edge: 최신 2개 버전
모바일:
 - iOS Safari: 14+
 - Android Chrome: 90+`

### 11.4 반응형 디자인

- `Mobile: 320px ~ 767px
Tablet: 768px ~ 1023px
Desktop: 1024px ~
Mobile-First 접근`

---

## 12. 제약사항

### 12.1 기술적 제약사항

- `AI API 호출 제한:
 - OpenAI: 3,500 requests/min (Tier 2)
 - 대기 시간: 병목 시 큐 시스템 필요
Supabase 제한:
 - Free: 500MB, 1GB Storage
 - Pro: 8GB, 100GB Storage
 - API 호출: 무제한
파일 크기:
 - 음성: 최대 50MB (약 5시간)
 - 영상: 최대 500MB (약 30분 고화질)`

### 12.2 법적 제약사항

- `개인정보보호법 준수
의료법 준수:
 - AI 분석은 "진단"이 아닌 "참고"
 - 명확한 면책 문구 필수
전자서명법 (유언장):
 - 법적 효력은 공증 후
 - 플랫폼은 작성 도구만 제공`

### 12.3 비용 제약사항

- `MVP 예산 (월):
 - Vercel: $0 (Hobby)
 - Supabase: $25 (Pro)
 - OpenAI: $400
 - 기타 서비스: $100
 - 총: $525/월
사용자 500명 기준:
 - 총 비용: $1,000/월
 - 사용자당: $2/월
 - 구독료: $9,900원
 - 마진: 충분`

### 12.4 운영 제약사항

- `1인 운영:
 - 최대한 자동화 필수
 - 관리자 대시보드 단순화
 - 알림 시스템 자동화
고객 지원:
 - FAQ 우선 제공
 - 1:1 문의는 48시간 내 답변
 - 긴급 이슈만 즉시 대응
유지보수:
 - 정기 점검: 월 1회 (새벽 시간)
 - 긴급 패치: 24시간 내`

---

## 13. 비기능 요구사항

### 13.1 가용성 (Availability)

- `목표 Uptime: 99.9% (월 43분 다운타임 허용)
계획된 점검: 월 1회, 새벽 2-4시
장애 복구: 4시간 이내`

### 13.2 안정성 (Reliability)

- `데이터 손실: 0% (백업으로 보장)
오류율: < 0.1%
크래시율: < 0.01%`

### 13.3 사용성 (Usability)

- `신규 사용자 온보딩: 3분 이내 완료
핵심 기능 학습: 5분 이내
첫 녹음까지: 10분 이내
오류 메시지: 명확하고 해결 방법 제시`

### 13.4 유지보수성 (Maintainability)

- `코드 가독성: Self-documenting code
모듈화: 기능별 독립적 모듈
문서화: README, API 문서, 주석
버전 관리: Semantic Versioning (x.y.z)`

### 13.5 이식성 (Portability)

- `플랫폼 독립성: 웹 → 모바일 앱 전환 가능
데이터 이식성: Export/Import 기능
벤더 종속성 최소화: 주요 로직은 독립적`

---

## 14. API 설계 원칙

### 14.1 RESTful API

- `HTTP Methods:
 - GET: 조회
 - POST: 생성
 - PUT/PATCH: 수정
 - DELETE: 삭제
Status Codes:
 - 200: 성공
 - 201: 생성 성공
 - 400: 잘못된 요청
 - 401: 인증 필요
 - 403: 권한 없음
 - 404: 리소스 없음
 - 500: 서버 오류
응답 형식: JSON`

### 14.2 API 버전 관리

- `URL 기반 버전: /api/v1/...
하위 호환성 유지
Deprecated 공지: 6개월 전`

### 14.3 API 예시

### 녹음 생성

`POST /api/v1/recordings
Headers:
  Authorization: Bearer {token}
  Content-Type: multipart/form-data
Body:
  audio_file: File
  duration_seconds: 155
Response:
  {
    "recording_id": "uuid",
    "status": "processing",
    "estimated_completion": "2025-12-29T15:30:00Z"
  }`

### 녹음 목록 조회

`GET /api/v1/recordings?filter=all&sort=desc&limit=20
Headers:
  Authorization: Bearer {token}
Response:
  {
    "recordings": [...],
    "total": 15,
    "page": 1,
    "limit": 20
  }`

---

## 15. 실시간 기능 요구사항

### 15.1 채팅 (1:1)

- `프로토콜: WebSocket (Supabase Realtime)
메시지 전송: 실시간
읽음 표시: 실시간
타이핑 표시: 선택사항
연결 끊김 시: 자동 재연결`

### 15.2 알림

- `푸시 알림: FCM
인앱 알림: Realtime subscription
알림 배지: 실시간 업데이트`

### 15.3 동시성 제어

- `낙관적 잠금: 버전 번호 사용
충돌 해결: Last-Write-Wins
동시 편집: 제한 (1명만 편집 가능)`

---

## 16. 국제화 (i18n) 요구사항

### 16.1 Phase 1 (MVP)

- `지원 언어: 한국어만
날짜/시간: 한국 표준시 (KST)
통화: 원화 (KRW)`

### 16.2 Phase 2 (확장)

- `추가 언어: 영어, 일본어
i18n 라이브러리: next-intl
번역 관리: Phrase 또는 Lokalise`

---

## 17. 모바일 앱 요구사항 (Phase 2)

### 17.1 플랫폼

- `iOS: 14.0+
Android: 8.0+ (API 26+)`

### 17.2 기능 차이

`웹과 동일:
- 모든 핵심 기능

추가 기능:
- 오프라인 녹음 (임시 저장)
- 푸시 알림 (FCM)
- 생체 인증 (Face ID, 지문)
- 카메라 직접 접근`

### 17.3 성능

- `앱 크기: < 50MB
초기 로딩: < 3초
메모리 사용: < 200MB
배터리 효율: 백그라운드 작업 최소화`

---

## 18. 규제 준수

### 18.1 개인정보보호법

- `개인정보 처리방침 명시
수집 항목 최소화
동의 절차: 명확한 안내
제3자 제공: 별도 동의
파기: 탈퇴 후 30일`

### 18.2 의료법

- `AI 분석: "의료기기 아님" 명시
진단 금지: "참고용" 표기
면책 조항: 명확히 표시
전문의 상담 권장: 모든 알림에 포함`

### 18.3 전자상거래법

- `청약 철회: 7일 이내
환불 정책: 명확히 안내
결제 정보 보관: 5년
거래 내역: 사용자 조회 가능`

### 18.4 전자서명법 (유언장)

- `법적 효력: 공증 필요 안내
플랫폼 역할: 작성 도구 제공
책임 한계: 명확한 면책
변호사 연계: 법적 검토 권장`

---

## 19. 장애 대응 계획

### 19.1 장애 등급

### P0 - Critical (즉시 대응)

- `서비스 전체 다운
데이터 손실
보안 침해
결제 시스템 장애`

### P1 - High (4시간 이내)

- `핵심 기능 장애 (녹음, 영상 업로드)
로그인 불가
대량 오류 발생`

### P2 - Medium (24시간 이내)

- `일부 기능 장애
성능 저하
UI 버그`

### P3 - Low (1주일 이내)

- `사소한 버그
개선 요청`

### 19.2 장애 대응 절차

`1. 감지: Sentry, 모니터링 알림
2. 확인: 장애 등급 판단
3. 대응:
   - P0: 즉시 작업 시작
   - P1: 4시간 내 작업
   - P2/P3: 계획된 일정
4. 복구: 근본 원인 해결
5. 사후 분석: Post-Mortem 작성
6. 재발 방지: 개선 조치`

### 19.3 커뮤니케이션

- `장애 공지: 홈페이지 배너
상태 페이지: status.gieok.app
이메일 알림: 유료 사용자
SNS 공지: 트위터, 블로그`

---

## 20. 개발 일정 및 마일스톤

### 20.1 Phase 1 - MVP (0~3개월)

### Month 1: 기반 구축

`Week 1-2:
- 프로젝트 셋업
- Supabase 설정
- 인증 구현 (소셜 로그인)
- 온보딩 화면

Week 3-4:
- AI 음성 자서전 (녹음 + 업로드)
- OpenAI API 연동
- 기본 녹음 목록`

### Month 2: 핵심 기능

`Week 5-6:
- AI 텍스트 정리
- 대화 패턴 분석
- 영상 편지 타임캡슐

Week 7-8:
- 동네 친구 매칭 (프로필, 추천)
- 50+ 경력 매칭 (프로필)
- 디지털 유언장 (기본)`

### Month 3: 완성 및 테스트

`Week 9-10:
- 구독 및 결제
- 설정 화면
- 관리자 대시보드 (기본)

Week 11-12:
- 통합 테스트
- 버그 수정
- 성능 최적화
- 베타 테스트`

### 20.2 Phase 2 - 성장 (3~6개월)

`Month 4:
- 케어 기관 매칭
- 자서전 인쇄본 주문
- 프리미엄 플랜 기능

Month 5:
- 모바일 앱 개발 시작
- 고급 AI 분석
- 가족 협업 대시보드

Month 6:
- 모바일 앱 출시 (iOS/Android)
- 정식 서비스 론칭
- 마케팅 시작`

### 20.3 Phase 3 - 확장 (6~12개월)

- `B2B 제휴 (치매안심센터)
정부 지원금 연계
다국어 지원
AI 기능 고도화`

---

## 21. 위험 관리

### 21.1 기술적 위험

| 위험 | 영향도 | 대응 방안 |
| --- | --- | --- |
| AI API 장애 | High | Retry 로직, 큐 시스템, 백업 API |
| Supabase 장애 | Critical | 백업 DB, 장애 알림, 대체 플랜 |
| 파일 저장소 장애 | High | 멀티 리전 백업, CDN 이중화 |
| 대용량 트래픽 | Medium | 자동 확장, 캐싱, CDN |

### 21.2 보안 위험

| 위험 | 영향도 | 대응 방안 |
| --- | --- | --- |
| 데이터 유출 | Critical | 암호화, 접근 제어, 감사 로그 |
| DDoS 공격 | High | WAF, Rate Limiting, CDN |
| 계정 탈취 | High | 2FA, 로그인 알림, 이상 감지 |

### 21.3 사업적 위험

| 위험 | 영향도 | 대응 방안 |
| --- | --- | --- |
| 사용자 유입 부족 | High | 마케팅 강화, 무료 체험 확대 |
| 유료 전환율 저조 | Medium | 기능 개선, 가격 조정 |
| 경쟁 서비스 출현 | Medium | 차별화, 빠른 기능 개발 |

---

## 22. 성공 지표 (KPI)

### 22.1 기술 지표

- `API 응답 시간: < 300ms (p95)
오류율: < 0.1%
Uptime: > 99.9%
Core Web Vitals: 모두 통과`

### 22.2 사용자 지표

- `DAU (Daily Active Users): 200명 (6개월)
MAU (Monthly Active Users): 1,000명 (1년)
리텐션 (7일): > 40%
리텐션 (30일): > 25%`

### 22.3 비즈니스 지표

- `유료 전환율: > 20%
월 매출: 1,000만원 (1년)
ARPU: 10,000원
Churn Rate: < 10%`

---

## 23. 문서 관리

### 23.1 문서 버전 관리

- `모든 문서: Git으로 버전 관리
TRD 업데이트: 주요 변경 시
변경 이력: CHANGELOG.md`

### 23.2 관련 문서

`1. 프로젝트 개요서 (Project Overview)
2. 기능 명세서 Part 1 (Feature Specification)
3. 기능 명세서 Part 2
4. TRD (현재 문서)
5. 데이터베이스 스키마 (다음 작성 예정)
6. API 문서 (개발 중 작성)
7. 배포 가이드 (개발 중 작성)`

### 23.3 문서 업데이트 주기

- `TRD: 분기 1회 또는 주요 변경 시
API 문서: 코드 변경 시마다
장애 대응: 장애 발생 시
회고: 스프린트 종료 시`

---

## 24. 용어 정의

| 용어 | 정의 |
| --- | --- |
| MVP | Minimum Viable Product, 최소 기능 제품 |
| RTO | Recovery Time Objective, 목표 복구 시간 |
| RPO | Recovery Point Objective, 목표 복구 시점 |
| SLA | Service Level Agreement, 서비스 수준 협약 |
| RBAC | Role-Based Access Control, 역할 기반 접근 제어 |
| RLS | Row Level Security, 행 수준 보안 |
| JWT | JSON Web Token |
| CORS | Cross-Origin Resource Sharing |
| CDN | Content Delivery Network |
| WAF | Web Application Firewall |

---

## 25. 참고 자료

### 25.1 공식 문서

- `Next.js: https://nextjs.org/docs
Supabase: https://supabase.com/docs
OpenAI: https://platform.openai.com/docs
Vercel: https://vercel.com/docs
Tailwind CSS: https://tailwindcss.com/docs`

### 25.2 법률

- `개인정보보호법: https://www.privacy.go.kr
의료법: https://www.law.go.kr
전자상거래법: https://www.ftc.go.kr`

### 25.3 가이드라인

- `WCAG 2.1: https://www.w3.org/WAI/WCAG21
REST API 설계: https://restfulapi.net
Semantic Versioning: https://semver.org`

---

## 26. 승인 및 변경 이력

### 26.1 승인

| 역할 | 이름 | 날짜 | 서명 |
| --- | --- | --- | --- |
| 기획자 |  | 2025.12.29 |  |
| 개발 리드 |  | 2025.12.29 |  |
| 승인자 |  | 2025.12.29 |  |

### 26.2 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
| --- | --- | --- | --- |
| 1.0 | 2025.12.29 | 초안 작성 |  |

---

**문서 버전**: v1.0

**최종 업데이트**: 2025년 12월 29일

**다음 검토 예정일**: 2026년 3월 29일

**문서 상태**: ✅ 승인 완료

---

## 📝 부록

### A. 체크리스트

### 개발 시작 전

- [ ]  기술 스택 최종 확정
- [ ]  Supabase 프로젝트 생성
- [ ]  Vercel 프로젝트 연결
- [ ]  도메인 구매 및 설정
- [ ]  OpenAI API 키 발급
- [ ]  결제 API 계약
- [ ]  GitHub Repository 생성
- [ ]  개발 환경 설정

### MVP 출시 전

- [ ]  모든 핵심 기능 구현
- [ ]  보안 감사 완료
- [ ]  성능 테스트 통과
- [ ]  접근성 검증
- [ ]  브라우저 호환성 확인
- [ ]  모바일 반응형 확인
- [ ]  법적 문서 검토 (이용약관, 개인정보처리방침)
- [ ]  베타 테스트 완료
- [ ]  백업 시스템 가동
- [ ]  모니터링 설정

### 정식 출시 전

- [ ]  마케팅 페이지 준비
- [ ]  고객 지원 체계 구축
- [ ]  결제 시스템 검증
- [ ]  장애 대응 계획 수립
- [ ]  사용자 가이드 작성