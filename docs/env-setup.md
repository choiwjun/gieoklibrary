# 환경 변수 설정 가이드

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://wnqlqmqhgvovefdgmjsi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducWxxbXFoZ3ZvdmVmZGdtanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5OTM5NjQsImV4cCI6MjA4MjU2OTk2NH0.X71VIKl-FVH6qYh2R7F3oE_bzWdo5M8N7hNbV3F2t2k
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducWxxbXFoZ3ZvdmVmZGdtanNpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njk5Mzk2NCwiZXhwIjoyMDgyNTY5OTY0fQ.1O9bZOTFpVFGI-huLuop-_dqpNYoZCG9sFPTAd31ODs

# OpenAI API (서버 전용)
OPENAI_API_KEY=your-openai-api-key

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 환경 변수 설명

| 변수명 | 용도 | 필수 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 공개 키 | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 서비스 역할 키 (서버 전용) | ✅ |
| `OPENAI_API_KEY` | OpenAI API 키 | ✅ |
| `NEXT_PUBLIC_APP_URL` | 앱 기본 URL | ✅ |
