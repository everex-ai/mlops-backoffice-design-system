/**
 * EverEx useClipboard — 클립보드 복사 훅
 *
 * HTTPS 환경에서는 `navigator.clipboard`, 비보안 컨텍스트에서는
 * legacy `execCommand('copy')` 폴백을 사용합니다.
 *
 * Sonner 토스트와 통합된 `copyWithToast` 변형을 함께 제공합니다.
 *
 * @example
 *   const { copy, copyWithToast } = useClipboard();
 *
 *   // 토스트 없이
 *   const ok = await copy(text);
 *
 *   // 기본 토스트 ("클립보드에 복사되었습니다!")
 *   copyWithToast(text);
 *
 *   // 커스텀 메시지
 *   copyWithToast(url, 'URL이 복사됐어요', '복사에 실패했어요');
 */

'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';

export function useClipboard() {
  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // [EverEx] 비보안 컨텍스트 폴백 (예: http, iframe)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      return true;
    } catch {
      return false;
    }
  }, []);

  const copyWithToast = useCallback(
    async (
      text: string,
      successMessage = '클립보드에 복사되었습니다!',
      errorMessage = '복사에 실패했습니다.',
    ): Promise<boolean> => {
      const success = await copy(text);
      if (success) {
        toast.success(successMessage);
      } else {
        toast.error(errorMessage);
      }
      return success;
    },
    [copy],
  );

  return { copy, copyWithToast };
}
