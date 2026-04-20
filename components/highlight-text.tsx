/**
 * EverEx HighlightText — 검색어 하이라이팅
 *
 * 대소문자 무시로 `highlight`와 일치하는 부분만 <mark>로 감쌉니다.
 * 하이픈과 공백을 등가로 취급하므로 slug 입력("squat-knees")으로도
 * DB 문자열("squat knees")을 하이라이트할 수 있습니다.
 *
 * [EverEx] shadcn 기본 제공 컴포넌트 아님 — AI-crawler에서 유래한 패턴.
 * [EverEx] 하이라이트 배경은 accent 토큰으로 통일 (raw `yellow-*` 금지).
 *
 * @example
 *   <HighlightText text="squat knees forward" highlight="knees" />
 *   <HighlightText text="deadlift-row" highlight="deadlift row" />
 */

'use client';

import { cn } from '@/lib/utils';

interface HighlightTextProps {
  text: string;
  /** 하이라이트할 검색어. 비어있으면 원본 텍스트 그대로 반환. */
  highlight?: string;
  className?: string;
}

export function HighlightText({ text, highlight, className }: HighlightTextProps) {
  if (!highlight || !highlight.trim()) {
    return <>{text}</>;
  }

  // 정규식 특수문자 이스케이프 + 하이픈/공백 등가 처리
  const escaped = highlight
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/[-\s]+/g, '[-\\s]+');

  const splitter = new RegExp(`(${escaped})`, 'gi');
  const matcher = new RegExp(`^${escaped}$`, 'i');
  const parts = text.split(splitter);

  return (
    <>
      {parts.map((part, i) =>
        matcher.test(part) ? (
          <mark
            // biome-ignore lint/suspicious/noArrayIndexKey: parts는 입력 문자열의 결정적 분할 결과
            key={i}
            className={cn(
              // [EverEx] accent 토큰 기반 — 라이트/다크 모두 CSS 변수로 대응
              'bg-accent text-accent-foreground rounded-sm px-0.5 font-medium',
              className,
            )}
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
