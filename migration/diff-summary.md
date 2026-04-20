# Token Diff Summary

shadcn/ui 기본값과 EverEx 디자인 토큰의 CSS 변수 비교표입니다.

## Light Mode (:root)

| Token | shadcn Default | EverEx | Changed? |
|-------|---------------|--------|----------|
| `--background` | `0 0% 100%` | `220 16% 96%` | **Yes** — 순백 → 약간 어두운 톤 |
| `--foreground` | `222.2 84% 4.9%` | `220 20% 10%` | **Yes** — 미세 조정 |
| `--card` | `0 0% 100%` | `0 0% 100%` | No |
| `--card-foreground` | `222.2 84% 4.9%` | `220 20% 10%` | **Yes** |
| `--popover` | `0 0% 100%` | `0 0% 100%` | No |
| `--popover-foreground` | `222.2 84% 4.9%` | `220 20% 10%` | **Yes** |
| `--primary` | `222.2 47.4% 11.2%` | `173 55% 36%` | **Yes** — 검정 → 틸 |
| `--primary-foreground` | `210 40% 98%` | `0 0% 100%` | **Yes** — 순백 |
| `--secondary` | `210 40% 96.1%` | `220 14% 93%` | **Yes** |
| `--secondary-foreground` | `222.2 47.4% 11.2%` | `220 20% 14%` | **Yes** |
| `--muted` | `210 40% 96.1%` | `220 14% 93%` | **Yes** |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `220 8% 46%` | **Yes** |
| `--accent` | `210 40% 96.1%` | `220 14% 93%` | **Yes** |
| `--accent-foreground` | `222.2 47.4% 11.2%` | `220 20% 14%` | **Yes** |
| `--destructive` | `0 84.2% 60.2%` | `0 72% 51%` | **Yes** — 약간 어두운 빨강 |
| `--destructive-foreground` | `210 40% 98%` | `0 0% 100%` | **Yes** |
| `--border` | `214.3 31.8% 91.4%` | `220 13% 89%` | **Yes** |
| `--input` | `214.3 31.8% 91.4%` | `220 13% 87%` | **Yes** |
| `--ring` | `222.2 84% 4.9%` | `173 55% 36%` | **Yes** — foreground → primary |
| `--radius` | `0.5rem` | `0.5rem` | No |

## Dark Mode (.dark)

| Token | shadcn Default | EverEx | Changed? |
|-------|---------------|--------|----------|
| `--background` | `222.2 84% 4.9%` | `224 14% 8%` | **Yes** |
| `--foreground` | `210 40% 98%` | `220 10% 90%` | **Yes** |
| `--card` | `222.2 84% 4.9%` | `224 12% 11%` | **Yes** — 배경보다 밝음 |
| `--primary` | `210 40% 98%` | `173 50% 42%` | **Yes** — 밝은 틸 |
| `--primary-foreground` | `222.2 47.4% 11.2%` | `0 0% 100%` | **Yes** — 흰색 |
| `--secondary` | `217.2 32.6% 17.5%` | `220 10% 16%` | **Yes** |
| `--muted` | `217.2 32.6% 17.5%` | `220 10% 15%` | **Yes** |
| `--muted-foreground` | `215 20.2% 65.1%` | `220 8% 50%` | **Yes** |
| `--destructive` | `0 62.8% 30.6%` | `0 62% 40%` | **Yes** |
| `--border` | `217.2 32.6% 17.5%` | `220 10% 18%` | **Yes** |
| `--input` | `217.2 32.6% 17.5%` | `220 10% 20%` | **Yes** |
| `--ring` | `212.7 26.8% 83.9%` | `173 50% 42%` | **Yes** — 틸 |

## Key Changes Summary

| 변경 영역 | Before (shadcn 기본) | After (EverEx) |
|-----------|---------------------|----------------|
| Primary color | Near-black `222° 47% 11%` | Teal `173° 55% 36%` |
| Focus ring | Foreground (dark) | Primary (teal) |
| Background | Pure white `0 0% 100%` | Tinted gray `220° 16% 96%` |
| Card ↔ Background | Same (no distinction) | Different (layer separation) |
| Dark card | Same as bg | Lighter than bg |
| Hue family | Blue-ish (210-222°) | Neutral (220°) + teal primary |

## Non-CSS Changes

| 영역 | shadcn 기본 | EverEx |
|------|-----------|--------|
| Font | Inter | Pretendard Variable |
| Button transition | `transition-colors` | `transition-all duration-150` |
| Button press | None | `active:scale-[0.97]` |
| Card shadow | None | `shadow-sm` |
| Card hover | None | `transition-shadow duration-200` |
| Toast position | (varies) | `top-center` |
| Toast style | `richColors` | Token-based classNames |
| Scrollbar | Default browser | Token-based custom scrollbar |
| Page entry | None | `animate-fade-in-up` |
| Table rows | None | `animate-table-row` stagger |
| Header | None | Sticky + backdrop blur |
