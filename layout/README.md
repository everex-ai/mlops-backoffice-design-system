# Layout Components

## Overview

이 폴더의 레이아웃 컴포넌트들은 **서비스 로직을 제거한 레퍼런스 버전**입니다. 특정 서비스에 종속된 인증, 라우팅, i18n 등의 코드는 `// [CUSTOMIZE]` 주석으로 표시되어 있으며, 각 서비스에 맞게 수정해야 합니다.

**LoginPage는 예외입니다** — 모든 서비스에서 동일한 레이아웃을 사용해야 합니다. props로만 커스터마이즈하세요.

## Fixed Specs (변경 금지)

| 항목 | 값 | 비고 |
|------|-----|------|
| **헤더 높이** | **49px** | `py-2.5` + content + `border-b`. 사이드바 등이 이 값에 의존 |
| **로그인 레이아웃** | Split (brand panel + form) | 모든 서비스 동일. `serviceName`, `serviceDescription` props만 변경 |

## Layout System

```
┌──────────────────────────────────────┐
│  Header (sticky, 49px 고정)           │  ← Header.tsx
├──────────────────────────────────────┤
│  Main Content                        │  ← PageLayout.tsx
│  ┌────────────────────────────────┐  │
│  │  container mx-auto px-4 py-8  │  │
│  │  animate-fade-in-up            │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  Header (sticky, 49px 고정)           │  ← AdminLayout.tsx
├──────┬───────────────────────────────┤
│ Side │  Main Content                 │
│ bar  │  p-4 md:p-8                   │
│      │                               │
└──────┴───────────────────────────────┘

┌─────────────────┬────────────────────┐
│  Brand Panel    │  Login Form        │  ← LoginPage.tsx
│  lg:w-[440px]   │  flex-1            │
│  xl:w-[520px]   │  max-w-sm          │
│  (grid pattern) │  (Google OAuth)    │
└─────────────────┴────────────────────┘
```

## Component List

| Component | File | 설명 |
|-----------|------|------|
| Header | `Header.tsx` | 스티키 블러 헤더 (49px 고정, 로고 + 네비게이션 + 액션) |
| AdminLayout | `AdminLayout.tsx` | 사이드바 + 헤더 관리자 셸 |
| PageLayout | `PageLayout.tsx` | 표준 페이지 래퍼 + 로딩/에러/빈 상태 |
| **LoginPage** | `LoginPage.tsx` | **표준 로그인 페이지 (모든 서비스 동일 레이아웃)** |
| ThemeToggle | `ThemeToggle.tsx` | 라이트/다크/시스템 테마 토글 |

## LoginPage 사용법

LoginPage는 props로만 서비스별 차이를 처리합니다. 레이아웃 자체는 변경하지 마세요:

```tsx
import LoginPage from '@/components/layout/LoginPage';

export default function MyLoginPage() {
  return (
    <LoginPage
      serviceName="AI Crawler"
      serviceDescription="AI 기반 웹 크롤링 및 데이터 수집 시스템"
      onGoogleLogin={handleGoogleLogin}
      headerActions={<><ThemeToggle /><LanguageSwitcher /></>}
    />
  );
}
```

| Prop | 설명 |
|------|------|
| `serviceName` | 브랜드 패널 대형 제목 + 모바일 제목 |
| `serviceDescription` | 브랜드 패널 설명 텍스트 |
| `onGoogleLogin` | Google OAuth 핸들러 (async) |
| `additionalActions` | Google 버튼 아래 추가 로그인 버튼 |
| `headerActions` | 우상단 ThemeToggle, LanguageSwitcher 등 |

## Dependencies

```bash
npm install next-themes lucide-react
# next/image, next/link are from Next.js
```

## Customization Points

모든 `// [CUSTOMIZE]` 주석을 검색하여 서비스에 맞게 수정하세요:

1. **로고**: `Header.tsx`, `LoginPage.tsx` — 로고 이미지 경로
2. **서비스 이름**: `LoginPage.tsx` — `serviceName` prop
3. **네비게이션**: `AdminLayout.tsx` — `navItems` 배열을 서비스 라우트에 맞게 변경
4. **인증**: `PageLayout.tsx` — `useAuth()` 훅을 서비스의 인증 시스템으로 교체
5. **라우터**: Link, usePathname 등을 서비스의 라우팅 방식에 맞게 변경
6. **i18n**: 텍스트를 하드코딩하거나 서비스의 i18n 시스템으로 교체
