# EverEx Backoffice Design System — Overview

## Design Philosophy

EverEx 혁신실 백오피스 서비스들은 **통일된 시각 언어**를 공유합니다. VideoLab에서 검증된 디자인 토큰과 패턴을 기반으로, 모든 내부 서비스(AI-Crawler, Compass 등)가 일관된 사용자 경험을 제공합니다.

## 3 Principles

### 1. Token-Driven Theming

모든 색상, 간격, 반지름 값은 **CSS 변수(토큰)**으로 관리합니다. 하드코딩된 색상값(`bg-slate-100`)이 아닌 시맨틱 토큰(`bg-background`)을 사용합니다.

```css
/* Do */
background: hsl(var(--background));
color: hsl(var(--foreground));

/* Don't */
background: #f1f5f9;
color: #1e293b;
```

이 원칙 덕분에 라이트/다크 모드 전환이 CSS 변수 교체만으로 완성됩니다.

### 2. Korean-First Typography

한국어가 기본 언어인 서비스를 위해 **Pretendard Variable**을 기본 폰트로 사용합니다. Inter는 한글 지원이 부족하므로 사용하지 않습니다.

```
Pretendard Variable → Pretendard → -apple-system → BlinkMacSystemFont → system-ui → ...
```

자세한 내용은 [02-typography.md](./02-typography.md)를 참조하세요.

### 3. Subtle Micro-Interactions

사용자에게 즉각적인 피드백을 제공하되 과하지 않게. 버튼 클릭 시 `active:scale-[0.97]`, 카드 hover 시 `shadow` 트랜지션, 페이지 전환 시 `fadeIn` 애니메이션 등 0.1~0.3초 사이의 미세한 인터랙션을 적용합니다.

## Tech Stack Requirements

| 영역 | 기술 | 비고 |
|------|------|------|
| Framework | Next.js (App Router) | 14+ 권장 |
| UI Library | **shadcn/ui** | MUI, Ant Design, Chakra UI 사용 금지 |
| Icons | **lucide-react** | 다른 아이콘 라이브러리 사용 금지 |
| Styling | Tailwind CSS + CSS Variables | |
| Animations | CSS keyframes + Framer Motion | |
| Theme | next-themes | light / dark / system |
| Toasts | sonner | top-center, 토큰 기반 스타일 |

## File Map

| 문서 | 설명 |
|------|------|
| [01-colors.md](./01-colors.md) | 컬러 시스템 (HSL 값, 시맨틱 용도) |
| [02-typography.md](./02-typography.md) | 폰트 스택, 로딩 전략, 사이즈 스케일 |
| [03-spacing-and-layout.md](./03-spacing-and-layout.md) | 간격, 컨테이너, 레이아웃 리듬 |
| [04-elevation.md](./04-elevation.md) | 레이어 시스템, 그림자, 블러 |
| [05-animation.md](./05-animation.md) | CSS + Framer Motion 가이드 |
