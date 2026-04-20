/**
 * EverEx useDebounce — 값 디바운스 훅
 *
 * 검색 입력 같은 빈번한 상태 변경을 일정 시간 지연시켜 반영합니다.
 *
 * @example
 *   const [query, setQuery] = useState('');
 *   const debouncedQuery = useDebounce(query, 300);
 *
 *   useEffect(() => {
 *     if (debouncedQuery) fetchResults(debouncedQuery);
 *   }, [debouncedQuery]);
 */

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
