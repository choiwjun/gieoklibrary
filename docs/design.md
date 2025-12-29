# Design System (디자인 시스템)

## 프로젝트: 기억책방 (Memory Bookstore)

**작성일**: 2025년 12월 29일

**버전**: v1.0

**디자인 원칙**: Accessible, Warm, Simple

---

## 목차

1. [디자인 철학](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
2. [색상 시스템](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
3. [타이포그래피](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
4. [간격 시스템](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
5. [레이아웃](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
6. [컴포넌트](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
7. [아이콘](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
8. [애니메이션](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
9. [반응형 디자인](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
10. [접근성](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)
11. [다크 모드](https://www.notion.so/Design-System-2d8aa1380be380b5ae45de106886a2d0?pvs=21)

---

## 1. 디자인 철학

### 1.1 핵심 가치

`🤗 따뜻함 (Warmth)
   - 시니어 사용자가 편안함을 느낄 수 있는 부드러운 색상과 곡선
   - 감성적이고 친근한 톤앤매너

👀 가독성 (Readability)
   - 큰 글자 크기와 높은 대비
   - 명확한 계층 구조와 여백

🎯 단순함 (Simplicity)
   - 한 화면에 하나의 핵심 작업
   - 복잡한 UI 요소 최소화
   - 직관적인 아이콘과 레이블`

### 1.2 디자인 원칙

1. **큰 터치 영역**: 최소 44x44px (WCAG 권장)
2. **높은 대비**: 최소 4.5:1 (텍스트), 3:1 (UI 요소)
3. **일관성**: 동일한 동작은 동일한 패턴
4. **피드백**: 모든 사용자 행동에 즉각적인 반응
5. **용서**: 실수를 쉽게 되돌릴 수 있도록

---

## 2. 색상 시스템

### 2.1 브랜드 색상

css

`/* Primary - 따뜻한 주황/살구색 (온기와 위로) */
--color-primary-50: #FFF7ED;   /* 가장 연한 배경 */
--color-primary-100: #FFEDD5;
--color-primary-200: #FED7AA;
--color-primary-300: #FDBA74;
--color-primary-400: #FB923C;
--color-primary-500: #F97316;  /* 메인 브랜드 컬러 */
--color-primary-600: #EA580C;
--color-primary-700: #C2410C;
--color-primary-800: #9A3412;
--color-primary-900: #7C2D12;
--color-primary-950: #431407;

/* Secondary - 차분한 갈색 (전통과 신뢰) */
--color-secondary-50: #FAFAF9;
--color-secondary-100: #F5F5F4;
--color-secondary-200: #E7E5E4;
--color-secondary-300: #D6D3D1;
--color-secondary-400: #A8A29E;
--color-secondary-500: #78716C;  /* 서브 브랜드 컬러 */
--color-secondary-600: #57534E;
--color-secondary-700: #44403C;
--color-secondary-800: #292524;
--color-secondary-900: #1C1917;
--color-secondary-950: #0C0A09;

/* Accent - 포근한 크림/베이지 (따뜻한 중성색) */
--color-accent-50: #FFFBEB;
--color-accent-100: #FEF3C7;
--color-accent-200: #FDE68A;
--color-accent-300: #FCD34D;
--color-accent-400: #FBBF24;
--color-accent-500: #F59E0B;   /* 강조색 */
--color-accent-600: #D97706;
--color-accent-700: #B45309;
--color-accent-800: #92400E;
--color-accent-900: #78350F;`

### 2.2 시맨틱 색상

css

`/* Success - 성공/완료 */
--color-success-50: #F0FDF4;
--color-success-500: #22C55E;
--color-success-600: #16A34A;
--color-success-700: #15803D;

/* Warning - 주의/경고 */
--color-warning-50: #FFFBEB;
--color-warning-500: #F59E0B;
--color-warning-600: #D97706;
--color-warning-700: #B45309;

/* Error - 오류/실패 */
--color-error-50: #FEF2F2;
--color-error-500: #EF4444;
--color-error-600: #DC2626;
--color-error-700: #B91C1C;

/* Info - 정보 */
--color-info-50: #EFF6FF;
--color-info-500: #3B82F6;
--color-info-600: #2563EB;
--color-info-700: #1D4ED8;`

### 2.3 중성 색상

css

`/* Neutral - 텍스트 및 배경 */
--color-neutral-50: #FAFAF9;    /* 밝은 배경 */
--color-neutral-100: #F5F5F4;
--color-neutral-200: #E7E5E4;
--color-neutral-300: #D6D3D1;   /* 구분선 */
--color-neutral-400: #A8A29E;   /* 비활성 텍스트 */
--color-neutral-500: #78716C;   /* 보조 텍스트 */
--color-neutral-600: #57534E;
--color-neutral-700: #44403C;   /* 본문 텍스트 */
--color-neutral-800: #292524;   /* 제목 텍스트 */
--color-neutral-900: #1C1917;   /* 강조 텍스트 */
--color-neutral-950: #0C0A09;   /* 최고 대비 */

/* 배경색 */
--color-background: #FFFFFF;
--color-background-secondary: #FAFAF9;
--color-background-tertiary: #F5F5F4;

/* 표면색 (카드, 패널) */
--color-surface: #FFFFFF;
--color-surface-elevated: #FFFFFF;
--color-surface-overlay: rgba(0, 0, 0, 0.4);`

### 2.4 투명도 활용

css

`/* 오버레이 */
--overlay-light: rgba(255, 255, 255, 0.9);
--overlay-dark: rgba(0, 0, 0, 0.6);

/* 그림자 */
--shadow-color: rgba(0, 0, 0, 0.1);
--shadow-color-medium: rgba(0, 0, 0, 0.15);
--shadow-color-heavy: rgba(0, 0, 0, 0.2);`

### 2.5 색상 사용 가이드

`Primary (주황):
✓ 주요 CTA 버튼
✓ 활성 상태 표시
✓ 중요한 링크
✗ 큰 면적의 배경 (눈의 피로)

Secondary (갈색):
✓ 헤더/푸터
✓ 사이드바
✓ 보조 버튼
✓ 아이콘

Accent (크림/베이지):
✓ 카드 배경
✓ 섹션 구분
✓ 강조 영역
✓ 호버 상태`

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

css

`/* 한글 본문용 */
--font-family-primary: 'Pretendard Variable', 'Pretendard', -apple-system, 
                       BlinkMacSystemFont, system-ui, Roboto, sans-serif;

/* 제목/강조용 */
--font-family-heading: 'Pretendard Variable', 'Pretendard', sans-serif;

/* 숫자/코드용 */
--font-family-mono: 'JetBrains Mono', 'Courier New', monospace;

/* 폰트 로드 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');`

### 3.2 폰트 스케일 (큰 화면 기준)

css

`/* Display - 대형 타이틀 (랜딩 페이지) */
--font-size-display-lg: 3.75rem;    /* 60px */
--font-size-display-md: 3rem;       /* 48px */
--font-size-display-sm: 2.25rem;    /* 36px */

/* Heading - 제목 */
--font-size-h1: 2rem;               /* 32px - 페이지 메인 제목 */
--font-size-h2: 1.75rem;            /* 28px - 섹션 제목 */
--font-size-h3: 1.5rem;             /* 24px - 서브섹션 */
--font-size-h4: 1.25rem;            /* 20px - 카드 제목 */
--font-size-h5: 1.125rem;           /* 18px */
--font-size-h6: 1rem;               /* 16px */

/* Body - 본문 */
--font-size-body-xl: 1.25rem;       /* 20px - 중요 본문 */
--font-size-body-lg: 1.125rem;      /* 18px - 기본 본문 (시니어) */
--font-size-body-md: 1rem;          /* 16px - 일반 본문 */
--font-size-body-sm: 0.875rem;      /* 14px - 보조 텍스트 */
--font-size-body-xs: 0.75rem;       /* 12px - 작은 텍스트 */

/* Label/Caption */
--font-size-caption: 0.875rem;      /* 14px */
--font-size-overline: 0.75rem;      /* 12px - 대문자 레이블 */

/* 시니어용 기본 크기 (더 크게) */
--font-size-senior-default: 1.125rem;  /* 18px */`

### 3.3 폰트 웨이트

css

- `-font-weight-light: 300;-font-weight-regular: 400; /* 기본 */-font-weight-medium: 500; /* 강조 */-font-weight-semibold: 600; /* 제목 */-font-weight-bold: 700; /* 중요 제목 */-font-weight-extrabold: 800; /* Display */`

### 3.4 행간 (Line Height)

css

- `-line-height-tight: 1.25; /* 제목용 */-line-height-normal: 1.5; /* 본문 기본 */-line-height-relaxed: 1.75; /* 긴 텍스트 */-line-height-loose: 2; /* 시니어용 (더 여유있게) */`

### 3.5 자간 (Letter Spacing)

css

- `-letter-spacing-tighter: 0.02em;-letter-spacing-tight: 0.01em;-letter-spacing-normal: 0; /* 기본 */-letter-spacing-wide: 0.01em;-letter-spacing-wider: 0.02em;-letter-spacing-widest: 0.05em; /* 대문자 레이블 */`

### 3.6 타이포그래피 클래스 예시

css

`/* Display */
.text-display-lg {
  font-size: var(--font-size-display-lg);
  font-weight: var(--font-weight-extrabold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tighter);
}

/* 페이지 제목 */
.text-h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-neutral-900);
}

/* 본문 (시니어용 기본) */
.text-body {
  font-size: var(--font-size-senior-default);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-loose);
  color: var(--color-neutral-700);
}

/* 보조 텍스트 */
.text-caption {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-500);
}`

---

## 4. 간격 시스템

### 4.1 기본 간격 스케일

css

`/* 4px 기반 스케일 (시니어 친화적으로 더 넉넉하게) */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px - 기본 단위 */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-7: 1.75rem;   /* 28px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */

/* 컴포넌트별 기본 간격 */
--spacing-component-xs: var(--spacing-2);  /* 8px */
--spacing-component-sm: var(--spacing-4);  /* 16px */
--spacing-component-md: var(--spacing-6);  /* 24px */
--spacing-component-lg: var(--spacing-8);  /* 32px */
--spacing-component-xl: var(--spacing-12); /* 48px */`

### 4.2 여백 사용 가이드

css

`/* 페이지 컨테이너 */
--spacing-page-x: var(--spacing-6);    /* 좌우 여백: 24px */
--spacing-page-y: var(--spacing-8);    /* 상하 여백: 32px */

/* 섹션 간격 */
--spacing-section: var(--spacing-12);  /* 섹션 사이: 48px */

/* 카드 내부 패딩 */
--spacing-card-padding: var(--spacing-6);  /* 24px */

/* 리스트 아이템 간격 */
--spacing-list-gap: var(--spacing-4);  /* 16px */

/* 폼 필드 간격 */
--spacing-form-gap: var(--spacing-5);  /* 20px */`

### 4.3 터치 영역

css

`/* 최소 터치 영역 (WCAG AAA 기준) */
--touch-target-min: 44px;
--touch-target-comfortable: 48px;
--touch-target-large: 56px;

/* 버튼 높이 */
--button-height-sm: 40px;
--button-height-md: 48px;   /* 기본 */
--button-height-lg: 56px;   /* 시니어용 */
--button-height-xl: 64px;   /* 대형 CTA */`

---

## 5. 레이아웃

### 5.1 컨테이너

css

`/* 최대 너비 */
--container-xs: 320px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

/* 본문 최적 너비 (가독성) */
--content-width: 65ch;  /* 약 65자 */
--content-width-narrow: 45ch;`

### 5.2 그리드 시스템

css

`/* 12 컬럼 그리드 */
--grid-columns: 12;
--grid-gap: var(--spacing-6);  /* 24px */

/* 플렉스 그리드 */
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}

/* 반응형 그리드 */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
}`

### 5.3 Z-Index 계층

css

- `-z-index-base: 0;-z-index-dropdown: 1000;-z-index-sticky: 1100;-z-index-fixed: 1200;-z-index-modal-backdrop: 1300;-z-index-modal: 1400;-z-index-popover: 1500;-z-index-tooltip: 1600;-z-index-toast: 1700;`

---

## 6. 컴포넌트

### 6.1 버튼

### 6.1.1 버튼 변형

css

`/* Primary Button */
.btn-primary {
  height: var(--button-height-md);
  padding: 0 var(--spacing-6);
  background: var(--color-primary-500);
  color: white;
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--color-primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background: var(--color-primary-700);
  transform: translateY(0);
}

.btn-primary:disabled {
  background: var(--color-neutral-300);
  color: var(--color-neutral-500);
  cursor: not-allowed;
  transform: none;
}

/* Secondary Button */
.btn-secondary {
  height: var(--button-height-md);
  padding: 0 var(--spacing-6);
  background: white;
  color: var(--color-primary-600);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-medium);
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--color-primary-50);
  border-color: var(--color-primary-600);
}

/* Ghost Button */
.btn-ghost {
  height: var(--button-height-md);
  padding: 0 var(--spacing-6);
  background: transparent;
  color: var(--color-neutral-700);
  font-size: var(--font-size-body-lg);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: var(--color-neutral-100);
}

/* Large Button (시니어용) */
.btn-large {
  height: var(--button-height-lg);
  padding: 0 var(--spacing-8);
  font-size: var(--font-size-body-xl);
}

/* Icon Button */
.btn-icon {
  width: var(--button-height-md);
  height: var(--button-height-md);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
}`

### 6.1.2 버튼 크기

css

`.btn-sm {
  height: var(--button-height-sm);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-body-sm);
}

.btn-md {
  height: var(--button-height-md);
  padding: 0 var(--spacing-6);
  font-size: var(--font-size-body-lg);
}

.btn-lg {
  height: var(--button-height-lg);
  padding: 0 var(--spacing-8);
  font-size: var(--font-size-body-xl);
}

.btn-xl {
  height: var(--button-height-xl);
  padding: 0 var(--spacing-10);
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
}`

### 6.2 입력 필드

### 6.2.1 텍스트 입력

css

`/* Base Input */
.input {
  height: var(--button-height-md);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-body-lg);
  color: var(--color-neutral-900);
  background: white;
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.input::placeholder {
  color: var(--color-neutral-400);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:disabled {
  background: var(--color-neutral-100);
  color: var(--color-neutral-500);
  cursor: not-allowed;
}

.input.error {
  border-color: var(--color-error-500);
}

.input.error:focus {
  box-shadow: 0 0 0 3px var(--color-error-100);
}

/* Large Input (시니어용) */
.input-lg {
  height: var(--button-height-lg);
  padding: 0 var(--spacing-5);
  font-size: var(--font-size-body-xl);
}

/* Textarea */
.textarea {
  min-height: 120px;
  padding: var(--spacing-4);
  resize: vertical;
}`

### 6.2.2 선택 입력

css

`/* Select */
.select {
  height: var(--button-height-md);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-body-lg);
  color: var(--color-neutral-900);
  background: white url("data:image/svg+xml,...") no-repeat right 12px center;
  background-size: 20px;
  border: 2px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  appearance: none;
  cursor: pointer;
}

/* Checkbox */
.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-neutral-400);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox:checked {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

/* Large Checkbox (시니어용) */
.checkbox-lg {
  width: 32px;
  height: 32px;
}

/* Radio */
.radio {
  width: 24px;
  height: 24px;
  border: 2px solid var(--color-neutral-400);
  border-radius: var(--radius-full);
  cursor: pointer;
}

.radio:checked {
  border-color: var(--color-primary-500);
  border-width: 8px;
}`

### 6.3 카드

css

`/* Base Card */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-xl);
  padding: var(--spacing-card-padding);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Clickable Card */
.card-clickable {
  cursor: pointer;
}

.card-clickable:active {
  transform: translateY(0);
}

/* Card Header */
.card-header {
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--color-neutral-200);
}

/* Card Title */
.card-title {
  font-size: var(--font-size-h4);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-900);
}

/* Card Content */
.card-content {
  color: var(--color-neutral-700);
  line-height: var(--line-height-relaxed);
}`

### 6.4 배지 & 태그

css

`/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-body-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.badge-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-700);
}

.badge-success {
  background: var(--color-success-100);
  color: var(--color-success-700);
}

.badge-warning {
  background: var(--color-warning-100);
  color: var(--color-warning-700);
}

.badge-error {
  background: var(--color-error-100);
  color: var(--color-error-700);
}

/* Large Badge (시니어용) */
.badge-lg {
  height: 32px;
  padding: 0 var(--spacing-3);
  font-size: var(--font-size-body-sm);
}`

### 6.5 알림 & 토스트

css

`/* Alert */
.alert {
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  display: flex;
  gap: var(--spacing-3);
}

.alert-success {
  background: var(--color-success-50);
  border-color: var(--color-success-500);
  color: var(--color-success-900);
}

.alert-warning {
  background: var(--color-warning-50);
  border-color: var(--color-warning-500);
  color: var(--color-warning-900);
}

.alert-error {
  background: var(--color-error-50);
  border-color: var(--color-error-500);
  color: var(--color-error-900);
}

.alert-info {
  background: var(--color-info-50);
  border-color: var(--color-info-500);
  color: var(--color-info-900);
}

/* Toast */
.toast {
  min-width: 280px;
  max-width: 420px;
  padding: var(--spacing-4);
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  animation: slideInRight 0.3s ease;
}`

### 6.6 모달

css

`/* Modal Backdrop */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: var(--color-surface-overlay);
  z-index: var(--z-index-modal-backdrop);
  animation: fadeIn 0.2s ease;
}

/* Modal */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  z-index: var(--z-index-modal);
  overflow: auto;
  animation: scaleIn 0.2s ease;
}

/* Modal Header */
.modal-header {
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-neutral-200);
}

/* Modal Body */
.modal-body {
  padding: var(--spacing-6);
}

/* Modal Footer */
.modal-footer {
  padding: var(--spacing-6);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  gap: var(--spacing-3);
  justify-content: flex-end;
}`

---

## 7. 아이콘

### 7.1 아이콘 시스템

css

`/* 아이콘 크기 */
--icon-size-xs: 16px;
--icon-size-sm: 20px;
--icon-size-md: 24px;   /* 기본 */
--icon-size-lg: 32px;   /* 시니어용 */
--icon-size-xl: 48px;

/* 아이콘 라이브러리: Lucide React (추천) */
/* https://lucide.dev */

.icon {
  width: var(--icon-size-md);
  height: var(--icon-size-md);
  stroke-width: 2;
  color: currentColor;
}

.icon-lg {
  width: var(--icon-size-lg);
  height: var(--icon-size-lg);
}`

### 7.2 주요 아이콘 목록

`기본 UI:
- Home: 홈
- User: 사용자
- Settings: 설정
- Bell: 알림
- Search: 검색
- Menu: 메뉴
- X: 닫기
- ChevronRight/Left: 화살표
- Plus: 추가
- Edit: 수정
- Trash: 삭제
- Check: 확인

기억책방 전용:
- Book: 자서전
- Mic: 음성 녹음
- Video: 영상 편지
- Lock: 디지털 금고
- Users: 친구 찾기
- MessageCircle: 채팅
- Phone: 헬프데스크
- Briefcase: 전문가 상담
- Heart: 좋아요
- Calendar: 일정`

---

## 8. 애니메이션

### 8.1 애니메이션 원칙

`1. 빠르고 부드럽게 (200-300ms)
2. 사용자 행동에 즉각 반응
3. 과하지 않게 (시니어 배려)
4. 의미 있는 움직임만`

### 8.2 Easing Functions

css

- `-ease-in: cubic-bezier(0.4, 0, 1, 1);-ease-out: cubic-bezier(0, 0, 0.2, 1);-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 탄성 효과 */`

### 8.3 기본 애니메이션

css

`/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide In (Bottom) */
@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide In (Right) */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Spin (로딩) */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Pulse (알림) */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}`

### 8.4 트랜지션

css

`/* 기본 트랜지션 */
.transition-base {
  transition: all 0.2s var(--ease-out);
}

/* 색상 트랜지션 */
.transition-colors {
  transition: color 0.2s var(--ease-out),
              background-color 0.2s var(--ease-out),
              border-color 0.2s var(--ease-out);
}

/* 변형 트랜지션 */
.transition-transform {
  transition: transform 0.2s var(--ease-out);
}`

---

## 9. 반응형 디자인

### 9.1 브레이크포인트

css

`/* Mobile First 접근 */
--breakpoint-xs: 320px;
--breakpoint-sm: 640px;   /* 큰 모바일 */
--breakpoint-md: 768px;   /* 태블릿 */
--breakpoint-lg: 1024px;  /* 작은 데스크톱 */
--breakpoint-xl: 1280px;  /* 데스크톱 */
--breakpoint-2xl: 1536px; /* 큰 데스크톱 */

/* Tailwind 스타일 미디어 쿼리 */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }`

### 9.2 반응형 타이포그래피

css

`/* 모바일 */
:root {
  --font-size-h1: 1.75rem;  /* 28px */
  --font-size-h2: 1.5rem;   /* 24px */
  --font-size-body: 1rem;   /* 16px */
}

/* 태블릿 */
@media (min-width: 768px) {
  :root {
    --font-size-h1: 2rem;     /* 32px */
    --font-size-h2: 1.75rem;  /* 28px */
    --font-size-body: 1.125rem; /* 18px */
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  :root {
    --font-size-h1: 2.5rem;   /* 40px */
    --font-size-h2: 2rem;     /* 32px */
  }
}`

### 9.3 반응형 간격

css

`/* 모바일 */
:root {
  --spacing-page-x: var(--spacing-4);  /* 16px */
  --spacing-section: var(--spacing-8);  /* 32px */
}

/* 태블릿 */
@media (min-width: 768px) {
  :root {
    --spacing-page-x: var(--spacing-6);   /* 24px */
    --spacing-section: var(--spacing-12); /* 48px */
  }
}

/* 데스크톱 */
@media (min-width: 1024px) {
  :root {
    --spacing-page-x: var(--spacing-8);   /* 32px */
    --spacing-section: var(--spacing-16); /* 64px */
  }
}`

---

## 10. 접근성

### 10.1 색상 대비

`WCAG AA 기준 (최소):
- 일반 텍스트: 4.5:1
- 큰 텍스트 (18px+): 3:1
- UI 요소: 3:1

WCAG AAA 기준 (권장):
- 일반 텍스트: 7:1
- 큰 텍스트: 4.5:1

검증 도구:
- https://webaim.org/resources/contrastchecker/
- Chrome DevTools: Lighthouse`

### 10.2 포커스 상태

css

`/* 키보드 포커스 표시 */
*:focus {
  outline: 3px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* 마우스 클릭 시 포커스 제거 (선택사항) */
*:focus:not(:focus-visible) {
  outline: none;
}

/* 포커스 링 스타일 */
.focus-ring {
  outline: 3px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}`

### 10.3 스크린 리더

html

`<!-- 스크린 리더 전용 텍스트 -->
<span class="sr-only">페이지 상단으로 이동</span>

<!-- aria-label -->
<button aria-label="검색">
  <SearchIcon />
</button>

<!-- aria-describedby -->
<input 
  id="email" 
  aria-describedby="email-help"
/>
<p id="email-help">이메일 형식으로 입력해주세요</p>`

css

`/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`

### 10.4 터치/클릭 영역

css

`/* 최소 터치 영역: 44x44px */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 시니어용 더 큰 터치 영역 */
.touch-target-lg {
  min-width: 56px;
  min-height: 56px;
}`

---

## 11. 다크 모드

### 11.1 다크 모드 색상

css

`/* 다크 모드 토글 */
[data-theme="dark"] {
  /* Primary (밝기 조정) */
  --color-primary-500: #FB923C;
  
  /* 배경색 */
  --color-background: #1C1917;
  --color-background-secondary: #292524;
  --color-background-tertiary: #44403C;
  
  /* 표면색 */
  --color-surface: #292524;
  --color-surface-elevated: #44403C;
  
  /* 텍스트색 (반전) */
  --color-neutral-50: #0C0A09;
  --color-neutral-900: #FAFAF9;
  --color-neutral-800: #F5F5F4;
  --color-neutral-700: #E7E5E4;
  
  /* 구분선 */
  --color-neutral-300: #57534E;
  
  /* 그림자 (더 진하게) */
  --shadow-color: rgba(0, 0, 0, 0.3);
}`

### 11.2 다크 모드 전환

javascript

`// 다크 모드 토글 함수
function toggleDarkMode() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// 초기 로드 시 사용자 설정 확인
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', initialTheme);`

---

## 12. 그림자 & 효과

### 12.1 그림자 시스템

css

`/* 그림자 (Elevation) */
--shadow-xs: 0 1px 2px 0 var(--shadow-color);
--shadow-sm: 0 1px 3px 0 var(--shadow-color), 
             0 1px 2px -1px var(--shadow-color);
--shadow-md: 0 4px 6px -1px var(--shadow-color), 
             0 2px 4px -2px var(--shadow-color);
--shadow-lg: 0 10px 15px -3px var(--shadow-color), 
             0 4px 6px -4px var(--shadow-color);
--shadow-xl: 0 20px 25px -5px var(--shadow-color), 
             0 8px 10px -6px var(--shadow-color);
--shadow-2xl: 0 25px 50px -12px var(--shadow-color);

/* 내부 그림자 */
--shadow-inner: inset 0 2px 4px 0 var(--shadow-color);`

### 12.2 테두리 반경

css

- `-radius-none: 0;-radius-xs: 0.125rem; /* 2px */-radius-sm: 0.25rem; /* 4px */-radius-md: 0.5rem; /* 8px */-radius-lg: 0.75rem; /* 12px */-radius-xl: 1rem; /* 16px */-radius-2xl: 1.5rem; /* 24px */-radius-full: 9999px; /* 완전한 원형 */`

### 12.3 블러 효과

css

- `-blur-sm: 4px;-blur-md: 8px;-blur-lg: 16px;-blur-xl: 24px;/* 유리 효과 (Glassmorphism) */.glass-effect { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(var(-blur-md)); border: 1px solid rgba(255, 255, 255, 0.3);}`

---

## 13. 유틸리티 클래스

### 13.1 간격

css

`/* Margin */
.m-0 { margin: 0; }
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
/* ... */

/* Padding */
.p-0 { padding: 0; }
.p-4 { padding: var(--spacing-4); }
.p-6 { padding: var(--spacing-6); }
/* ... */

/* Gap (Flexbox/Grid) */
.gap-2 { gap: var(--spacing-2); }
.gap-4 { gap: var(--spacing-4); }
.gap-6 { gap: var(--spacing-6); }`

### 13.2 플렉스박스

css

`.flex { display: flex; }
.inline-flex { display: inline-flex; }

/* Direction */
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }

/* Justify */
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }

/* Align */
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

/* Wrap */
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }`

### 13.3 텍스트

css

`/* Alignment */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Weight */
.font-normal { font-weight: var(--font-weight-regular); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }

/* Truncate */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Line Clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`

---

## 14. 구현 가이드

### 14.1 Tailwind CSS 설정

javascript

`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // Main
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // ... 나머지 색상
      },
      fontFamily: {
        sans: ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      fontSize: {
        'display-lg': '3.75rem',
        'display-md': '3rem',
        // ...
      },
      spacing: {
        // 4px 기반 스케일 자동 적용됨
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}`

### 14.2 CSS 변수 사용 (Next.js)

css

`/* globals.css */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

:root {
  /* 색상 */
  --color-primary-500: #F97316;
  /* ... */
  
  /* 타이포그래피 */
  --font-size-body-lg: 1.125rem;
  /* ... */
  
  /* 간격 */
  --spacing-4: 1rem;
  /* ... */
}

[data-theme="dark"] {
  /* 다크 모드 오버라이드 */
}`

### 14.3 컴포넌트 예시 (React)

tsx

`// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-neutral-300',
    secondary: 'bg-white text-primary-600 border-2 border-primary-500 hover:bg-primary-50',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
  };
  
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-lg',
    lg: 'h-14 px-8 text-xl',
    xl: 'h-16 px-10 text-2xl font-semibold',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`

---

## 15. 체크리스트

### 15.1 디자인 시작 전

- [ ]  색상 팔레트 정의 완료
- [ ]  타이포그래피 스케일 확정
- [ ]  간격 시스템 설정
- [ ]  Tailwind Config 설정
- [ ]  폰트 로드 확인
- [ ]  기본 컴포넌트 구현
- [ ]  스토리북 또는 컴포넌트 문서화

### 15.2 개발 중

- [ ]  일관된 간격 사용
- [ ]  색상 변수 사용
- [ ]  접근성 체크 (키보드, 스크린리더)
- [ ]  반응형 확인
- [ ]  다크 모드 테스트
- [ ]  크로스 브라우저 테스트

### 15.3 출시 전

- [ ]  대비 비율 검증 (WCAG)
- [ ]  타이포그래피 계층 명확성
- [ ]  터치 영역 충분한지 확인
- [ ]  로딩/에러 상태 디자인
- [ ]  빈 상태 디자인
- [ ]  애니메이션 성능 확인

---

## 16. 참고 자료

### 16.1 디자인 도구

`Figma: 디자인 및 프로토타입
- https://figma.com

Coolors: 색상 팔레트 생성
- https://coolors.co

Type Scale: 타이포그래피 스케일
- https://typescale.com

WebAIM: 접근성 검증
- https://webaim.org/resources/contrastchecker/`

### 16.2 컴포넌트 라이브러리 참고

`Radix UI: 접근성 좋은 headless 컴포넌트
- https://radix-ui.com

shadcn/ui: Tailwind 기반 컴포넌트
- https://ui.shadcn.com

Lucide: 아이콘
- https://lucide.dev`

### 16.3 타이포그래피

`Pretendard: 한글 폰트
- https://github.com/orioncactus/pretendard

웹 폰트 최적화 가이드
- https://web.dev/font-best-practices/`

---

## 17. 변경 이력

| 버전 | 날짜 | 변경 내용 | 작성자 |
| --- | --- | --- | --- |
| 1.0 | 2025.12.29 | 초안 작성 - 전체 디자인 시스템 정의 |  |

---

**문서 버전**: v1.0

**최종 업데이트**: 2025년 12월 29일

**다음 검토 예정일**: Phase 1 UI 개발 시작 전

**문서 상태**: ✅ 검토 완료

---

## 부록: 빠른 참조 (Quick Reference)

### 주요 색상

- Primary: `#F97316` (따뜻한 주황)
- Secondary: `#78716C` (차분한 갈색)
- Accent: `#F59E0B` (크림/베이지)

### 기본 폰트 크기 (시니어용)

- 제목 H1: `2rem` (32px)
- 본문: `1.125rem` (18px)
- 버튼: `1.125rem` (18px)

### 터치 영역

- 최소: `44px`
- 권장: `48px`
- 시니어용: `56px`

### 간격

- 기본 단위: `1rem` (16px)
- 페이지 여백: `24px`
- 섹션 간격: `48px`

### 애니메이션

- Duration: `200ms`
- Easing: `ease-out`