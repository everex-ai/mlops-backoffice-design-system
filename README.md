# EverEx Backoffice Design System

혁신실 백오피스 서비스들의 디자인을 통일하기 위한 범용 디자인 팩입니다. VideoLab에서 검증된 디자인 토큰, 컴포넌트 패턴, 레이아웃 시스템을 추출하여 어떤 Next.js + shadcn/ui 프로젝트에서든 적용할 수 있습니다.

---

## 📌 메인 담당자

- **이름**: Liam
- **이메일**: Liam@everex.co.kr

---

## Quick Start (5단계)

### 1. globals.css 교체

```bash
cp tokens/globals.css your-project/src/app/globals.css
```

### 2. Tailwind 설정 업데이트

`tokens/tailwind.config.reference.ts`를 참조하여 프로젝트의 `tailwind.config.ts`를 수정합니다. 핵심은 `fontFamily.sans`에 Pretendard를 추가하는 것입니다.

### 3. Pretendard 폰트 설치

```html
<!-- layout.tsx의 <head>에 추가 -->
<link
  rel="stylesheet"
  as="style"
  crossOrigin="anonymous"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
```

### 4. 컴포넌트 오버라이드

```bash
# 핵심 컴포넌트 복사
cp components/button.tsx your-project/src/components/ui/
cp components/card.tsx your-project/src/components/ui/
cp components/sonner.tsx your-project/src/components/ui/
```

### 5. 하드코딩 색상 제거

프로젝트에서 `bg-slate-*`, `bg-white`, `text-slate-*` 등을 검색하고 시맨틱 토큰(`bg-background`, `bg-card`, `text-foreground` 등)으로 교체합니다.

---

## Table of Contents

### Foundations (디자인 원칙)

| 문서 | 설명 |
|------|------|
| [00-overview](./foundations/00-overview.md) | 디자인 철학, 3대 원칙, 기술 스택 |
| [01-colors](./foundations/01-colors.md) | 컬러 시스템 (HSL 값, 시맨틱 용도, Do/Don't) |
| [02-typography](./foundations/02-typography.md) | Pretendard 설치/설정, 사이즈 스케일 |
| [03-spacing-and-layout](./foundations/03-spacing-and-layout.md) | 간격 규칙, 컨테이너, 반응형 기준 |
| [04-elevation](./foundations/04-elevation.md) | 3단계 레이어 시스템, 블러 헤더, 그림자 |
| [05-animation](./foundations/05-animation.md) | CSS 키프레임, Framer Motion, 마이크로 인터랙션 |

### Assets (로고 파일)

| 파일 | 용도 |
|------|------|
| [everex-logo.png](./assets/everex-logo.png) | EverEx 전체 로고 (로그인 페이지, 모바일 헤더) |
| [everex-logo-icon.png](./assets/everex-logo-icon.png) | EverEx 아이콘 로고 (헤더, 스피너 mask) |

`public/` 폴더에 복사: `cp assets/*.png your-project/public/`

### Tokens (복사 가능 설정 파일)

| 파일 | 설명 |
|------|------|
| [globals.css](./tokens/globals.css) | DROP-IN CSS 변수, 스크롤바, 애니메이션 |
| [tailwind.config.reference.ts](./tokens/tailwind.config.reference.ts) | 참조용 Tailwind 설정 |
| [utils.ts](./tokens/utils.ts) | `cn()` 유틸리티 |

### Components (shadcn/ui 오버라이드)

| 파일 | 변경사항 |
|------|---------|
| [button.tsx](./components/button.tsx) | `active:scale-[0.97]` 마이크로 인터랙션 |
| [card.tsx](./components/card.tsx) | `shadow-sm` + hover transition |
| [sonner.tsx](./components/sonner.tsx) | top-center, 토큰 기반 스타일 |
| [spinner.tsx](./components/spinner.tsx) | 로고 마스크 스피너 (progress 지원) |
| [animated.tsx](./components/animated.tsx) | Framer Motion 프리미티브 |
| [status-badge.tsx](./components/status-badge.tsx) | 다형성 상태 배지 (레퍼런스) |
| [table-skeleton.tsx](./components/table-skeleton.tsx) | 테이블 스켈레톤 로딩 |
| [kbd.tsx](./components/kbd.tsx) | 키보드 단축키 표시 |
| [resizable.tsx](./components/resizable.tsx) | 리사이저블 패널 래퍼 (focus ring = primary) |

### Components (EverEx 추가 — 내부 서비스 공통 패턴)

| 파일 | 용도 |
|------|------|
| [step-indicator.tsx](./components/step-indicator.tsx) | 다단계 워크플로우 진행 상태 |
| [log-viewer.tsx](./components/log-viewer.tsx) | 자동 스크롤 로그 뷰어 (레벨 필터 내장) |
| [file-dropzone.tsx](./components/file-dropzone.tsx) | 드래그 앤 드롭 파일 선택 영역 |
| [pagination.tsx](./components/pagination.tsx) | 단순 prev/next 페이지네이션 |
| [highlight-text.tsx](./components/highlight-text.tsx) | 검색어 하이라이팅 |

### Hooks (범용 훅)

| 파일 | 용도 |
|------|------|
| [use-debounce.ts](./hooks/use-debounce.ts) | 값 디바운스 |
| [use-clipboard.ts](./hooks/use-clipboard.ts) | 클립보드 복사 (Sonner 토스트 통합) |
| [use-keyboard-shortcuts.ts](./hooks/use-keyboard-shortcuts.ts) | 전역 단축키 (`e.code` 기반, 한국어 IME 대응) |
| [use-progress-stats.ts](./hooks/use-progress-stats.ts) | 진행률 통계 (경과시간/속도/ETA) |

### Utilities (포맷터)

| 파일 | 용도 |
|------|------|
| [tokens/format.ts](./tokens/format.ts) | `formatTime`, `formatDuration`, `formatFileSize`, `formatByteSpeed`, `formatETA` |

### Layout (레이아웃 레퍼런스)

| 파일 | 설명 |
|------|------|
| [Header.tsx](./layout/Header.tsx) | 스티키 블러 헤더 (**49px 고정**) |
| [AdminLayout.tsx](./layout/AdminLayout.tsx) | 사이드바 + 헤더 관리자 셸 |
| [PageLayout.tsx](./layout/PageLayout.tsx) | 표준 페이지 래퍼 (로딩/에러/빈 상태) |
| **[LoginPage.tsx](./layout/LoginPage.tsx)** | **표준 로그인 페이지 (모든 서비스 동일)** |
| [ThemeToggle.tsx](./layout/ThemeToggle.tsx) | 라이트/다크/시스템 토글 |

### Migration (마이그레이션 가이드)

| 문서 | 설명 |
|------|------|
| [checklist.md](./migration/checklist.md) | 19단계 체크리스트 |
| [diff-summary.md](./migration/diff-summary.md) | shadcn 기본 vs EverEx 토큰 비교표 |
| [compass-migration.md](./migration/compass-migration.md) | Compass(AI-Crawler) 전용 10가지 변경사항 |

### Examples (예시 페이지)

| 파일 | 패턴 |
|------|------|
| [page-dashboard.tsx](./examples/page-dashboard.tsx) | 카드 스태거, 테이블 애니메이션, 차트 토큰 |
| [page-list.tsx](./examples/page-list.tsx) | 스켈레톤 로딩, 검색, 빈 상태 |
| [page-login.tsx](./examples/page-login.tsx) | 레이어 구분, 로고 스피너, 테마 토글 |

---

## Cross-Service Standards (서비스 간 고정 스펙)

모든 EverEx 백오피스 서비스에서 **반드시 동일해야 하는** 항목들입니다:

| 항목 | 스펙 | 비고 |
|------|------|------|
| **헤더 높이** | **49px** (`py-2.5` + content + `border-b`) | 사이드바 높이 계산에 사용 |
| **로그인 페이지** | Split 레이아웃 (brand panel + form) | `LoginPage.tsx` props로만 커스터마이즈 |
| **Primary 컬러** | `173° 55% 36%` (틸) | globals.css 토큰으로 관리 |
| **폰트** | Pretendard Variable | 한국어 최적화 |

## Key Differences from Default shadcn/ui

| 영역 | shadcn 기본값 | EverEx |
|------|-------------|--------|
| Primary 컬러 | 슬레이트/검정 | 틸 `173° 55% 36%` |
| 폰트 | Inter | Pretendard Variable |
| 배경 | 순백 | 약간 어두운 톤 (카드와 구분) |
| 포커스 링 | foreground | primary (틸) |
| 버튼 인터랙션 | 없음 | `active:scale-[0.97]` |
| 카드 그림자 | 없음 | `shadow-sm` + hover transition |
| 스크롤바 | 브라우저 기본 | 토큰 기반 커스텀 |
| 토스트 | richColors | 토큰 기반, top-center |
| 페이지 진입 | 없음 | `fadeIn` 애니메이션 |

## Dependencies

```bash
# Core (required)
npm install tailwindcss clsx tailwind-merge class-variance-authority
npm install @radix-ui/react-slot    # Button asChild
npm install next-themes              # ThemeToggle
npm install lucide-react             # Icons
npm install sonner                   # Toast

# Optional
npm install framer-motion            # animated.tsx
```
