# Colors

## Primary Color: Teal/Green

EverEx 브랜드 컬러는 **틸(Teal)**입니다. shadcn/ui 기본 슬레이트 블루 대신, 모든 primary 요소에 이 색을 사용합니다.

```
Light: hsl(173, 55%, 36%)  →  #298F80
Dark:  hsl(173, 50%, 42%)  →  #36A494
```

## Semantic Token Map

### Light Mode (`:root`)

| Token | HSL | 용도 |
|-------|-----|------|
| `--background` | `220 16% 96%` | 페이지 배경 (카드와 구분되는 약간 어두운 톤) |
| `--foreground` | `220 20% 10%` | 기본 텍스트 |
| `--card` | `0 0% 100%` | 카드/패널 배경 (순백) |
| `--card-foreground` | `220 20% 10%` | 카드 내 텍스트 |
| `--popover` | `0 0% 100%` | 팝오버/드롭다운 배경 |
| `--popover-foreground` | `220 20% 10%` | 팝오버 텍스트 |
| `--primary` | `173 55% 36%` | 주요 버튼, 링크, 포커스 링 |
| `--primary-foreground` | `0 0% 100%` | primary 위 텍스트 (흰색) |
| `--secondary` | `220 14% 93%` | 보조 버튼, 비활성 배경 |
| `--secondary-foreground` | `220 20% 14%` | secondary 위 텍스트 |
| `--muted` | `220 14% 93%` | 스켈레톤, 비활성 영역 |
| `--muted-foreground` | `220 8% 46%` | 보조 텍스트, 플레이스홀더 |
| `--accent` | `220 14% 93%` | hover 상태 배경 |
| `--accent-foreground` | `220 20% 14%` | accent 위 텍스트 |
| `--destructive` | `0 72% 51%` | 삭제/에러 버튼 |
| `--destructive-foreground` | `0 0% 100%` | destructive 위 텍스트 |
| `--border` | `220 13% 89%` | 테두리 |
| `--input` | `220 13% 87%` | 입력 필드 테두리 |
| `--ring` | `173 55% 36%` | 포커스 링 (= primary) |
| `--radius` | `0.5rem` | 기본 border-radius |

### Dark Mode (`.dark`)

| Token | HSL | 변화 |
|-------|-----|------|
| `--background` | `224 14% 8%` | 매우 어두운 배경 |
| `--foreground` | `220 10% 90%` | 밝은 텍스트 |
| `--card` | `224 12% 11%` | 배경보다 약간 밝은 카드 |
| `--primary` | `173 50% 42%` | 약간 밝아진 틸 (가독성) |
| `--secondary` | `220 10% 16%` | |
| `--muted` | `220 10% 15%` | |
| `--muted-foreground` | `220 8% 50%` | |
| `--destructive` | `0 62% 40%` | 약간 어두운 빨간색 |
| `--border` | `220 10% 18%` | |
| `--input` | `220 10% 20%` | |
| `--ring` | `173 50% 42%` | |

### Chart Colors (5색 팔레트)

| Token | Light HSL | 용도 |
|-------|-----------|------|
| `--chart-1` | `173 55% 36%` | 기본 (= primary) |
| `--chart-2` | `221 83% 53%` | 파란색 |
| `--chart-3` | `38 92% 50%` | 주황/황색 |
| `--chart-4` | `280 65% 60%` | 보라색 |
| `--chart-5` | `340 75% 55%` | 분홍색 |

## Do / Don't

### Do

```tsx
// 시맨틱 토큰 사용
<div className="bg-background text-foreground" />
<div className="bg-card border-border" />
<Button className="bg-primary text-primary-foreground" />
```

### Don't

```tsx
// 하드코딩된 색상값
<div className="bg-slate-50 text-slate-900" />
<div className="bg-white border-slate-200" />
<Button className="bg-teal-600 text-white" />

// 그라디언트 배경 (카드와의 레이어 구분이 사라짐)
<div className="bg-gradient-to-br from-slate-50 to-slate-100" />
```

## Key Difference from Default shadcn/ui

| 영역 | shadcn 기본값 | EverEx |
|------|-------------|--------|
| Primary | `222.2 47.4% 11.2%` (검정에 가까움) | `173 55% 36%` (틸) |
| Ring | foreground (어두움) | primary (틸) |
| Background | `0 0% 100%` (순백) | `220 16% 96%` (약간 어두운 톤) |
| Card | = background (구분 없음) | `0 0% 100%` (순백, background와 구분) |
