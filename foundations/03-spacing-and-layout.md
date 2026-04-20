# Spacing & Layout

## Spacing Scale

Tailwind 기본 4px 단위 스케일을 그대로 사용합니다. 특별한 간격 토큰은 추가하지 않습니다.

| Token | Value | 주요 용도 |
|-------|-------|----------|
| `0.5` | 2px | 아이콘-텍스트 최소 갭 |
| `1` | 4px | 인라인 요소 갭 |
| `1.5` | 6px | 아이콘 버튼 간격 (`gap-1.5`) |
| `2` | 8px | 컨트롤 내부 패딩 |
| `2.5` | 10px | 헤더 세로 패딩 (`py-2.5`) |
| `3` | 12px | 사이드바 패딩 |
| `4` | 16px | 컨테이너 가로 패딩 (`px-4`), 모바일 기본 간격 |
| `6` | 24px | 카드 패딩 (`p-6`) |
| `8` | 32px | 메인 콘텐츠 세로 패딩 (`py-8`), 데스크톱 간격 |
| `12` | 48px | 빈 상태 세로 패딩 (`py-12`) |

## Container

```tsx
<div className="container mx-auto px-4">
  {/* content */}
</div>
```

- `container`: Tailwind 기본 max-width 반응형 브레이크포인트
- `mx-auto`: 중앙 정렬
- `px-4`: 좌우 16px 패딩 (모바일 안전 영역)

## Header Height (고정: 49px)

**모든 EverEx 백오피스 서비스는 동일한 헤더 높이(49px)를 사용합니다.**

```
py-2.5 (10px × 2 = 20px) + 콘텐츠 높이 (~28px) + border-b (1px) = 49px
```

이 값은 사이드바 높이 계산 등 다른 컴포넌트에서 참조하므로 **절대 변경하지 마세요**:

```tsx
// Header
<div className="container mx-auto px-4 py-2.5 flex justify-between items-center">

// Sidebar (헤더 높이 49px 기준)
<aside className="min-h-[calc(100vh-49px)]">
```

## Page Structure

```
┌──────────────────────────────────────┐
│  Header (sticky, 49px 고정)           │
├──────────────────────────────────────┤
│  Main Content                        │
│  ┌────────────────────────────────┐  │
│  │  container mx-auto px-4 py-8  │  │
│  │                                │  │
│  │  [Page Content]                │  │
│  │                                │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

## Admin Layout (Sidebar)

```
┌──────────────────────────────────────┐
│  Header (sticky)                     │
├──────┬───────────────────────────────┤
│ Side │  Main Content                 │
│ bar  │  p-4 md:p-8                   │
│ w-14 │                               │
│ md:  │                               │
│ w-56 │                               │
│      │                               │
└──────┴───────────────────────────────┘
```

- 사이드바: `w-14` (모바일, 아이콘만) / `w-56` (데스크톱, 아이콘+텍스트)
- 사이드바 높이: `min-h-[calc(100vh-49px)]`
- 사이드바 배경: `bg-card/50` (카드 반투명)

## Responsive Breakpoints

Tailwind 기본 브레이크포인트를 사용합니다:

| Breakpoint | Width | 적용 |
|------------|-------|------|
| `sm` | 640px | — |
| `md` | 768px | 사이드바 확장, 패딩 증가 |
| `lg` | 1024px | — |
| `xl` | 1280px | — |

## Card Padding Convention

```tsx
<Card>
  <CardHeader>     {/* p-6 */}
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardContent>    {/* p-6 pt-0 */}
    {/* content */}
  </CardContent>
  <CardFooter>     {/* p-6 pt-0 */}
    {/* actions */}
  </CardFooter>
</Card>
```

## Gap Conventions

| 패턴 | 값 | 예시 |
|------|-----|------|
| 헤더 내 아이콘 버튼 | `gap-1.5` | ThemeToggle + LanguageSwitcher |
| 헤더 로고-네비게이션 | `gap-4` | Logo + Nav items |
| 로고 아이콘-텍스트 | `gap-2.5` | Logo icon + Title |
| 사이드바 아이콘-라벨 | `gap-3` | Nav icon + Label |
| 사이드바 항목 간 | `space-y-0.5` | Nav items |
| 테이블 셀 스켈레톤 | `gap-4` | Skeleton columns |

## Border Radius

```
--radius: 0.5rem (8px)

lg: var(--radius)           = 8px   → Card, 큰 컨테이너
md: calc(var(--radius) - 2px) = 6px   → Button, Input
sm: calc(var(--radius) - 4px) = 4px   → Badge, 스크롤바 thumb
```
