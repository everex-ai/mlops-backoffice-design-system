# Typography

## Font Stack

### Sans-serif (기본)

```
Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
Roboto, Helvetica Neue, Segoe UI, Apple SD Gothic Neo, Noto Sans KR,
Malgun Gothic, sans-serif
```

**Pretendard Variable**은 한글 최적화 가변 폰트로, Inter와 동일한 라틴 글리프를 포함하면서 한글까지 지원합니다.

### Monospace

```
var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
Liberation Mono, Courier New, monospace
```

## Pretendard 설치 방법

### 방법 1: CDN (권장)

`app/layout.tsx` 또는 `_document.tsx`에서 CDN 링크 추가:

```html
<link
  rel="stylesheet"
  as="style"
  crossOrigin="anonymous"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
/>
```

### 방법 2: next/font (로컬)

```tsx
// app/layout.tsx
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function RootLayout({ children }) {
  return (
    <html className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
```

## Tailwind Configuration

```ts
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: [
        'Pretendard Variable',
        'Pretendard',
        '-apple-system',
        'BlinkMacSystemFont',
        'system-ui',
        'Roboto',
        'Helvetica Neue',
        'Segoe UI',
        'Apple SD Gothic Neo',
        'Noto Sans KR',
        'Malgun Gothic',
        'sans-serif',
      ],
    },
  },
}
```

## Size Scale

Tailwind 기본 사이즈 스케일을 그대로 사용합니다. 커스텀 스케일은 추가하지 않습니다.

| Class | Size | 용도 |
|-------|------|------|
| `text-xs` | 12px | 보조 라벨, 배지, `<Kbd>` |
| `text-sm` | 14px | 기본 본문, 버튼, 입력 필드 |
| `text-base` | 16px | 헤더 타이틀 (H1 in header) |
| `text-lg` | 18px | 섹션 제목 |
| `text-xl` | 20px | 페이지 제목 |
| `text-2xl` | 24px | 카드 타이틀 |

## Font Weight

| Class | Weight | 용도 |
|-------|--------|------|
| `font-normal` | 400 | 본문 텍스트 |
| `font-medium` | 500 | 버튼, 네비게이션 항목 |
| `font-semibold` | 600 | 제목, 테이블 헤더 |

## Font Smoothing

모든 텍스트에 안티앨리어싱을 적용합니다:

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## Do / Don't

### Do

```tsx
// Pretendard를 기본으로 사용
<body className="font-sans" />

// 시맨틱 사이즈 활용
<h1 className="text-xl font-semibold" />  // 페이지 제목
<p className="text-sm text-muted-foreground" />  // 보조 텍스트
```

### Don't

```tsx
// Inter 사용 (한글 미지원)
fontFamily: { sans: ['Inter', ...] }

// 커스텀 px 값 직접 지정
<p style={{ fontSize: '13px' }} />
```
