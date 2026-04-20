# Hooks

EverEx 백오피스 서비스에서 공통으로 쓰이는 범용 훅 모음입니다. 세 개 이상의 서비스(video_annotator, label_supporter, AI-crawler)에서 반복적으로 나타난 패턴을 추출했습니다.

## Hook List

| Hook | File | 설명 |
|------|------|------|
| `useDebounce<T>(value, delay)` | `use-debounce.ts` | 검색 입력 등 빈번한 값 변경을 지연 반영 |
| `useClipboard()` | `use-clipboard.ts` | 클립보드 복사 (비보안 컨텍스트 폴백 + Sonner 토스트 통합) |
| `useKeyboardShortcuts(shortcuts, options)` | `use-keyboard-shortcuts.ts` | 전역 단축키. **`e.code` 사용 — 한국어 IME와 무관** |
| `useProgressStats({ mode, total })` | `use-progress-stats.ts` | 업로드/처리 진행률 → 경과시간·속도·ETA 포맷 |

## 채택 방법

```bash
# 프로젝트의 훅 디렉토리로 복사
cp design-system/hooks/*.ts your-project/src/hooks/
```

`useClipboard`, `useProgressStats`는 `@/lib/format`의 포맷터를 의존하므로 `design-system/tokens/format.ts`도 함께 복사해야 합니다.

## Dependencies

```bash
# useClipboard
npm install sonner

# useProgressStats
#   (추가 패키지 불필요, React만 사용)

# useKeyboardShortcuts
#   (추가 패키지 불필요)
```

## Import Path

기본값은 `@/lib/format` — 프로젝트 alias에 맞춰 조정하세요.

```ts
// 기본
import { formatByteSpeed, formatDuration, formatETA } from '@/lib/format';

// 또는
import { formatByteSpeed } from '~/lib/format';
```

## Notes

- `useKeyboardShortcuts`는 `KeyboardEvent.code`를 사용합니다. 한글 입력 상태에서도 물리 키 위치로 매칭되므로 한국어 UX에 필수입니다. `e.key`를 쓰면 IME가 개입해 단축키가 동작하지 않는 경우가 있습니다.
- `useProgressStats`는 초기 2초간 ETA를 "계산 중..."으로 표시합니다 (데이터가 너무 적으면 추정이 불안정하기 때문).
