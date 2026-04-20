# Components

## Overview

이 폴더의 컴포넌트들은 shadcn/ui 기본 컴포넌트를 EverEx 디자인 시스템에 맞게 오버라이드한 버전입니다. 기본 shadcn/ui와 달라진 부분은 `// [EverEx]` 주석으로 표시되어 있습니다.

## 채택 방법

### 방법 1: 직접 교체

기존 프로젝트의 `src/components/ui/` 폴더에 해당 파일을 복사합니다:

```bash
# 예: 버튼 컴포넌트 교체
cp design-system/components/button.tsx your-project/src/components/ui/button.tsx
```

### 방법 2: 새 프로젝트에서 시작

1. `npx shadcn@latest init`로 프로젝트 초기화
2. 필요한 shadcn 컴포넌트 설치 (`npx shadcn@latest add button card ...`)
3. 이 폴더의 파일로 덮어쓰기

## Component List

### shadcn 오버라이드 (기본 shadcn과 달라진 부분)

| Component | File | 변경사항 |
|-----------|------|---------|
| Button | `button.tsx` | `active:scale-[0.97]` 마이크로 인터랙션, `transition-all` |
| Card | `card.tsx` | `shadow-sm`, `transition-shadow duration-200` |
| Sonner (Toast) | `sonner.tsx` | 토큰 기반 스타일, lucide-react 아이콘 |
| Spinner | `spinner.tsx` | 로고 마스크 스피너 (progress 모드 지원) |
| Animated | `animated.tsx` | Framer Motion 프리미티브 (List, Item, Content) |
| StatusBadge | `status-badge.tsx` | 다형성 상태 배지 (레퍼런스 구조) |
| TableSkeleton | `table-skeleton.tsx` | 테이블 스켈레톤 로딩 |
| Kbd | `kbd.tsx` | 키보드 단축키 표시 |
| Resizable | `resizable.tsx` | `react-resizable-panels` 래퍼 (focus ring = primary) |

### EverEx 추가 컴포넌트 (shadcn 기본 제공 아님)

내부 서비스(video_annotator, label_supporter, AI-crawler)에서 공통으로 발견된 패턴을 추출했습니다.

| Component | File | 용도 |
|-----------|------|------|
| StepIndicator | `step-indicator.tsx` | 다단계 워크플로우 진행 상태 (점 스테퍼 + progress) |
| LogViewer | `log-viewer.tsx` | 자동 스크롤 로그 뷰어 (레벨 필터 내장, 표시 전용) |
| FileDropzone | `file-dropzone.tsx` | 드래그 앤 드롭 파일 선택 영역 (폴더 드롭 포함) |
| Pagination | `pagination.tsx` | 단순 prev/next 페이지네이션 (cursor/간단 리스트용) |
| HighlightText | `highlight-text.tsx` | 검색어 하이라이팅 (하이픈/공백 등가 매칭) |

## Dependencies

```bash
# Required by all components
npm install clsx tailwind-merge class-variance-authority

# Required by specific components
npm install @radix-ui/react-slot    # button.tsx
npm install sonner next-themes      # sonner.tsx
npm install lucide-react            # sonner.tsx, kbd.tsx, step-indicator.tsx, log-viewer.tsx, file-dropzone.tsx, pagination.tsx, resizable.tsx
npm install framer-motion           # animated.tsx
npm install react-resizable-panels  # resizable.tsx

# EverEx 추가 컴포넌트가 의존하는 shadcn 기본 컴포넌트
npx shadcn@latest add tooltip progress   # step-indicator.tsx
npx shadcn@latest add select badge       # log-viewer.tsx
```

## Import Path

컴포넌트들은 `@/lib/utils`에서 `cn()`을 import합니다. 프로젝트의 path alias에 맞게 조정하세요:

```tsx
// 기본 (shadcn/ui 표준)
import { cn } from '@/lib/utils';

// 또는 프로젝트에 맞게 변경
import { cn } from '~/lib/utils';
```
