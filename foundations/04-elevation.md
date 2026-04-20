# Elevation & Layers

## 3-Layer System

EverEx 디자인은 **3단계 레이어**로 깊이감을 표현합니다. 배경과 카드가 동일한 색이면 구분이 사라지므로, 반드시 레이어를 분리합니다.

```
Layer 0: Background  →  bg-background   (220 16% 96% / 약간 어두운 톤)
Layer 1: Card/Panel  →  bg-card          (0 0% 100% / 순백)
Layer 2: Popover     →  bg-popover       (0 0% 100% / 순백 + shadow-lg)
```

### Light Mode 시각화

```
┌─────────────────────────────────────────┐ ← background (연회색)
│                                         │
│  ┌───────────────────────────────────┐  │ ← card (순백 + shadow-sm)
│  │                                   │  │
│  │   ┌────────────────────────┐      │  │ ← popover (순백 + shadow-lg)
│  │   │  Dropdown / Dialog     │      │  │
│  │   └────────────────────────┘      │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Dark Mode 시각화

```
background: 224 14% 8%   (매우 어두움)
card:       224 12% 11%  (약간 밝음)
popover:    224 12% 11%  (= card, shadow로 구분)
```

## Shadow Scale

| Level | Class | 용도 |
|-------|-------|------|
| 0 | none | 배경 영역 |
| 1 | `shadow-sm` | 카드 기본 상태 |
| 1+ | `shadow-sm` → `shadow-md` (hover) | 카드 hover 시 트랜지션 |
| 2 | `shadow-lg` | 팝오버, 드롭다운, 토스트 |

## Blur Header

헤더는 스크롤 시에도 콘텐츠 위에 고정되며, 반투명 블러 효과를 적용합니다:

```tsx
<header className="sticky top-0 z-10">
  <div className="border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
    {/* header content */}
  </div>
</header>
```

- `sticky top-0 z-10`: 상단 고정
- `bg-background/95`: 95% 불투명
- `backdrop-blur-sm`: 배경 블러
- `supports-[backdrop-filter]:bg-background/80`: backdrop-filter 지원 시 더 투명하게

## Card Component

```tsx
<Card>
  {/* 기본: rounded-lg border bg-card shadow-sm transition-shadow duration-200 */}
  {/* hover 시: shadow-md로 자연스럽게 전환 */}
</Card>
```

shadcn/ui 기본 Card와의 차이:
- `transition-shadow duration-200` 추가 (hover shadow 트랜지션)
- `shadow-sm` 기본 적용 (기본 shadcn은 shadow 없음)

## Sidebar Layer

사이드바는 카드와 배경의 중간 톤을 사용합니다:

```tsx
<aside className="bg-card/50 border-r border-border">
  {/* bg-card/50: 카드 색상 50% 투명도로 배경과 카드 사이 레이어 */}
</aside>
```

## Do / Don't

### Do

```tsx
// background ≠ card (레이어 구분)
<div className="bg-background">
  <Card>  {/* bg-card */}
    <CardContent>...</CardContent>
  </Card>
</div>
```

### Don't

```tsx
// 배경과 카드가 같은 색 (구분 안 됨)
<div className="bg-white">
  <div className="bg-white rounded-lg">  {/* 레이어 구분 없음 */}
    ...
  </div>
</div>

// 그라디언트 배경 (토큰과 호환되지 않음)
<div className="bg-gradient-to-br from-slate-50 to-slate-100">
  ...
</div>
```
