/**
 * EverEx useKeyboardShortcuts — 전역 키보드 단축키 훅
 *
 * 특징:
 * - `e.code` 사용 (한국어 IME 상태와 무관하게 물리 키 위치로 매칭)
 * - input/textarea/contenteditable에 포커스 중이면 무시
 * - `e.repeat` (눌림 유지)는 기본적으로 무시 (옵션으로 허용 가능)
 * - `preventDefault` 옵션으로 브라우저/비디오 엘리먼트 기본 동작 억제
 *
 * [EverEx] video_annotator 주석 형식의 키 목록(Space/J/K/M/F/Arrow/Digit 등)은
 * 서비스별 "shortcut map"으로 주입받는 구조로 일반화했습니다.
 *
 * @example
 *   useKeyboardShortcuts([
 *     { code: 'Space', handler: togglePlay, preventDefault: true },
 *     { code: 'KeyJ', handler: () => seek(-5) },
 *     { code: 'KeyK', handler: () => seek(5) },
 *     { code: 'ArrowLeft', shift: true, handler: prevClip },
 *   ]);
 *
 *   // 일시적으로 비활성화
 *   useKeyboardShortcuts(shortcuts, { enabled: dialogOpen === false });
 */

'use client';

import { useEffect, useRef } from 'react';

export interface Shortcut {
  /** KeyboardEvent.code (예: 'Space', 'KeyJ', 'ArrowLeft', 'Digit1', 'Numpad1') */
  code: string;
  /** 트리거될 때 실행 */
  handler: (e: KeyboardEvent) => void;
  /** 이 modifier가 눌려 있을 때만 매칭 (미지정 = 해당 modifier 상태 무관) */
  shift?: boolean;
  ctrl?: boolean;
  meta?: boolean;
  alt?: boolean;
  /** 매칭 시 preventDefault + stopPropagation (비디오 엘리먼트 기본 동작 억제용) */
  preventDefault?: boolean;
}

interface Options {
  enabled?: boolean;
  /** 키 반복(눌림 유지) 허용. 기본 false. */
  allowRepeat?: boolean;
  /** input/textarea 포커스 시에도 발동. 기본 false. */
  captureInInputs?: boolean;
}

function modifierMatches(e: KeyboardEvent, s: Shortcut): boolean {
  if (s.shift !== undefined && e.shiftKey !== s.shift) return false;
  if (s.ctrl !== undefined && e.ctrlKey !== s.ctrl) return false;
  if (s.meta !== undefined && e.metaKey !== s.meta) return false;
  if (s.alt !== undefined && e.altKey !== s.alt) return false;
  return true;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable
  );
}

export function useKeyboardShortcuts(
  shortcuts: Shortcut[],
  options: Options = {},
) {
  const { enabled = true, allowRepeat = false, captureInInputs = false } = options;

  // 핸들러 참조를 ref에 보관해 리스너 재등록을 피합니다.
  const shortcutsRef = useRef(shortcuts);
  shortcutsRef.current = shortcuts;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!allowRepeat && e.repeat) return;
      if (!captureInInputs && isEditableTarget(e.target)) return;

      for (const s of shortcutsRef.current) {
        if (s.code !== e.code) continue;
        if (!modifierMatches(e, s)) continue;
        if (s.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
        s.handler(e);
        return;
      }
    };

    // [EverEx] keyup도 잡아주면 <video> 기본 단축키 간섭을 완전히 막을 수 있습니다.
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!captureInInputs && isEditableTarget(e.target)) return;
      for (const s of shortcutsRef.current) {
        if (s.code === e.code && s.preventDefault && modifierMatches(e, s)) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, allowRepeat, captureInInputs]);
}
