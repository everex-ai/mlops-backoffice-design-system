# Animation

## CSS Keyframe Animations

`globals.css`에 정의된 CSS 애니메이션입니다. 별도 라이브러리 없이 Tailwind 클래스로 적용합니다.

### fadeIn

페이지 콘텐츠 진입 시 사용합니다.

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in-up {
  animation: fadeIn 0.1s ease-out forwards;
  opacity: 0.85;
}
```

```tsx
<main className="animate-fade-in-up">
  {/* 페이지 콘텐츠 */}
</main>
```

### tableRowFadeIn

테이블 행이 순차적으로 나타나는 스태거 애니메이션입니다.

```css
@keyframes tableRowFadeIn {
  from { opacity: 0; transform: translateX(-4px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-table-row {
  opacity: 0;
  animation: tableRowFadeIn 0.2s ease-out forwards;
}
```

```tsx
{data.map((row, i) => (
  <TableRow
    key={row.id}
    className="animate-table-row"
    style={{ animationDelay: `${i * 30}ms` }}
  >
    ...
  </TableRow>
))}
```

### logoFill / logoPulse

로고 마스크 스피너용 애니메이션입니다. 자세한 내용은 `components/spinner.tsx`를 참조하세요.

### collapsible-down / collapsible-up

Radix Collapsible 컴포넌트의 열기/닫기 애니메이션:

```css
@keyframes collapsible-down {
  from { height: 0; }
  to { height: var(--radix-collapsible-content-height); }
}

@keyframes collapsible-up {
  from { height: var(--radix-collapsible-content-height); }
  to { height: 0; }
}
```

## Framer Motion Primitives

`animated.tsx`에 정의된 재사용 가능한 Framer Motion 프리미티브입니다.

### AnimatedList + AnimatedItem

리스트 항목이 순차적으로 나타나는 스태거 애니메이션:

```tsx
import { AnimatedList, AnimatedItem } from '@/components/ui/animated';

<AnimatedList className="grid gap-4">
  {items.map(item => (
    <AnimatedItem key={item.id}>
      <Card>...</Card>
    </AnimatedItem>
  ))}
</AnimatedList>
```

- `staggerChildren: 0.05` (50ms 간격)
- `delayChildren: 0.02` (20ms 초기 지연)
- 각 항목: opacity 0→1, y 12→0, duration 0.25s

### AnimatedContent

탭 전환, 모달 콘텐츠 등 presence 기반 트랜지션:

```tsx
import { AnimatedContent } from '@/components/ui/animated';

<AnimatedContent presenceKey={activeTab} mode="slideUp">
  {tabContent}
</AnimatedContent>
```

- `mode="fade"`: opacity만 변경 (기본값)
- `mode="slideUp"`: opacity + translateY

### Variant Objects (커스텀 사용)

```tsx
import { containerVariants, itemVariants, fadeVariants, slideUpVariants } from '@/components/ui/animated';

// 직접 motion 컴포넌트에 적용
<motion.div variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
  ...
</motion.div>
```

## Micro-Interactions

### Button Press

모든 버튼에 클릭 시 미세한 축소 효과를 적용합니다:

```
active:scale-[0.97]
transition-all duration-150
```

### Card Hover Shadow

카드에 hover 시 그림자가 깊어지는 트랜지션:

```
shadow-sm → hover:shadow-md
transition-shadow duration-200
```

### Theme Toggle Icon

Sun/Moon 아이콘이 회전하며 전환됩니다:

```tsx
<Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
<Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
```

## Timing Guidelines

| 유형 | Duration | Easing | 예시 |
|------|----------|--------|------|
| 마이크로 인터랙션 | 0.1~0.15s | ease-out | 버튼 press, focus ring |
| 상태 전환 | 0.2s | ease-out | 카드 shadow, 탭 전환 |
| 리스트 스태거 | 0.25s (항목당 50ms) | easeOutQuad | AnimatedList |
| 페이지 진입 | 0.1s | ease-out | fadeIn |

## Do / Don't

### Do

```tsx
// 미세하고 빠른 트랜지션
<Button className="transition-all duration-150 active:scale-[0.97]" />
<Card className="transition-shadow duration-200 hover:shadow-md" />
```

### Don't

```tsx
// 과도한 애니메이션
<Card className="transition-all duration-500 hover:scale-105 hover:shadow-2xl" />

// 지나치게 느린 트랜지션
<div className="transition-all duration-1000" />

// 불필요한 bounce/spring 효과
<motion.div animate={{ scale: [1, 1.2, 1] }} />
```
