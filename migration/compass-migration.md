# Compass (AI-Crawler) Migration Guide

Compass 프로젝트를 EverEx 디자인 시스템으로 마이그레이션하기 위한 10가지 핵심 변경사항입니다.

## 1. globals.css 전체 교체

```diff
- :root {
-   --background: 0 0% 100%;
-   --primary: 222.2 47.4% 11.2%;
-   --ring: 222.2 84% 4.9%;
-   /* ... shadcn defaults ... */
- }
+ :root {
+   --background: 220 16% 96%;
+   --primary: 173 55% 36%;
+   --ring: 173 55% 36%;
+   /* ... see tokens/globals.css ... */
+ }
```

`tokens/globals.css` 전체를 복사하여 교체하세요. 스크롤바 스타일과 애니메이션 키프레임도 포함됩니다.

## 2. Pretendard 폰트 적용

```diff
// layout.tsx
- import { Inter } from 'next/font/google';
- const inter = Inter({ subsets: ['latin'] });

+ // CDN 방식 (head에 추가)
+ <link
+   rel="stylesheet"
+   as="style"
+   crossOrigin="anonymous"
+   href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
+ />
```

```diff
// tailwind.config.ts
  fontFamily: {
-   sans: ['Inter', ...defaultTheme.fontFamily.sans],
+   sans: [
+     'Pretendard Variable',
+     'Pretendard',
+     '-apple-system',
+     'BlinkMacSystemFont',
+     'system-ui',
+     /* ... see tokens/tailwind.config.reference.ts ... */
+   ],
  },
```

## 3. 그라디언트 배경 제거

```diff
- <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
+ <div className="min-h-screen bg-background">
```

모든 `bg-gradient-*`, `from-*`, `to-*` 패턴을 검색하고 `bg-background`로 교체하세요.

## 4. 하드코딩 색상 → 토큰

```diff
- <div className="bg-white border-slate-200 text-slate-900">
+ <div className="bg-card border-border text-card-foreground">

- <div className="bg-slate-100 text-slate-500">
+ <div className="bg-muted text-muted-foreground">

- <button className="bg-blue-600 text-white">
+ <button className="bg-primary text-primary-foreground">
```

주요 검색 패턴:
- `bg-white` → `bg-card` 또는 `bg-background`
- `bg-slate-*` → `bg-muted`, `bg-secondary`, `bg-background`
- `text-slate-*` → `text-foreground`, `text-muted-foreground`
- `border-slate-*` → `border-border`

## 5. Button 마이크로 인터랙션 추가

```diff
// components/ui/button.tsx - buttonVariants cva 첫 번째 인자
- 'inline-flex items-center ... transition-colors ...'
+ 'inline-flex items-center ... transition-all duration-150 ... active:scale-[0.97] ...'
```

또는 `design-system/components/button.tsx`로 전체 교체하세요.

## 6. Card 레이어 구분

```diff
// components/ui/card.tsx
- 'rounded-lg border bg-card text-card-foreground shadow-sm'
+ 'rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow duration-200'
```

`background ≠ card` 토큰 분리는 globals.css 교체 시 자동 적용됩니다.

## 7. Toast 위치 + 스타일 변경

```diff
// layout.tsx 또는 providers.tsx
- <Toaster position="top-right" richColors />
+ <Toaster position="top-center" />
```

`design-system/components/sonner.tsx`로 교체하면 토큰 기반 스타일이 자동 적용됩니다.

## 8. 스크롤바 하드코딩 제거

기존에 커스텀 스크롤바 CSS가 있다면 제거하세요. `globals.css`에 토큰 기반 스크롤바 스타일이 포함되어 있습니다.

```diff
- ::-webkit-scrollbar-thumb {
-   background: #94a3b8;  /* 하드코딩 slate-400 */
- }
+ /* globals.css에서 자동 처리 */
+ /* hsl(var(--muted-foreground) / 0.3) */
```

## 9. 페이지 진입 애니메이션 추가

```diff
- <main className="container mx-auto px-4 py-8">
+ <main className="container mx-auto px-4 py-8 animate-fade-in-up">
```

`animate-fade-in-up` 클래스는 `globals.css`에 정의되어 있습니다.

## 10. 헤더를 블러 스타일로 변경

```diff
- <header className="border-b bg-white">
+ <header className="sticky top-0 z-10">
+   <div className="border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      {/* header content */}
+   </div>
+ </header>
```

## Quick Verification

마이그레이션 후 다음을 확인하세요:

1. Primary 버튼이 틸 색상 (`#298F80`)으로 표시되는가?
2. 페이지 배경과 카드가 시각적으로 구분되는가?
3. 다크 모드에서 모든 요소가 정상 렌더링되는가?
4. 포커스 링이 틸 색상인가? (Tab 키로 확인)
5. 버튼 클릭 시 미세한 축소 효과가 있는가?
6. 스크롤바 색상이 테마에 맞게 변하는가?
7. 한글 텍스트가 Pretendard로 렌더링되는가? (DevTools Computed styles 확인)
