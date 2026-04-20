/**
 * EverEx Pagination — 간단한 prev/next 페이지네이션
 *
 * 숫자 버튼 없이 prev/next + "현재/전체" 표시만 있는 최소 패턴입니다.
 * 백오피스 리스트/테이블에서 반복적으로 나타나는 형태입니다.
 *
 * 더 복잡한 페이지 점프/엘립시스가 필요하면 shadcn/ui 공식
 * `pagination.tsx`를 사용하세요. 이 컴포넌트는 "서버 측 cursor 페이지네이션"
 * 또는 "단순 리스트"에 적합합니다.
 *
 * @example
 *   <Pagination page={page} pageCount={totalPages} onPageChange={setPage} />
 */

'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  /** 페이지가 1개 이하여도 항상 렌더 (기본 false - 1개 이하면 null 반환) */
  alwaysShow?: boolean;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  disabled,
  alwaysShow = false,
}: PaginationProps) {
  if (!alwaysShow && pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1 || disabled}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {/* [EverEx] tabular-nums: 페이지가 바뀌어도 숫자 폭이 흔들리지 않음 */}
      <span className="text-sm text-muted-foreground tabular-nums">
        {page} / {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount || disabled}
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
