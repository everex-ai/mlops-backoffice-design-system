/**
 * EverEx useProgressStats — 진행률 통계 훅
 *
 * 업로드/다운로드/처리 작업의 경과 시간, 속도, 예상 남은 시간(ETA)을
 * 측정하고 포맷팅합니다.
 *
 * Modes:
 *   - 'bytes':   바이트 단위 (MB/s 표시)
 *   - 'items':   아이템 개수 단위 (items/s 표시)
 *   - 'percent': 퍼센트 단위 (%/s 표시)
 *
 * @example
 *   const { update, reset, stats } = useProgressStats({
 *     mode: 'bytes',
 *     total: file.size,
 *   });
 *
 *   // 주기적으로 호출
 *   xhr.onprogress = (e) => update(e.loaded);
 *
 *   // 완료/취소 시
 *   reset();
 *
 *   // 표시
 *   <p>{stats.elapsedTime} · {stats.speed} · {stats.estimatedTimeRemaining}</p>
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { formatByteSpeed, formatDuration, formatETA } from '@/lib/format';

export type ProgressMode = 'bytes' | 'items' | 'percent';

interface UseProgressStatsOptions {
  mode: ProgressMode;
  /** 최종 목표값 (ETA 계산용). 모를 때는 생략 가능 */
  total?: number;
  /** false면 update 호출을 무시합니다 (일시 정지 등) */
  active?: boolean;
  /** items 모드의 단위 라벨. 기본 'items'. (예: 'frames', 'files') */
  itemLabel?: string;
}

export interface FormattedProgressStats {
  elapsedTime: string;
  speed: string;
  estimatedTimeRemaining: string;
}

const EMPTY_STATS: FormattedProgressStats = {
  elapsedTime: '0:00',
  speed: '',
  estimatedTimeRemaining: '',
};

// [EverEx] 별도 ProgressTracker 클래스 없이 훅 내부에 tracker 상태를 인라인화.
interface Tracker {
  startMs: number;
  lastMs: number;
  lastValue: number;
  smoothedSpeed: number;
  total: number | undefined;
}

function createTracker(total: number | undefined): Tracker {
  const now = performance.now();
  return {
    startMs: now,
    lastMs: now,
    lastValue: 0,
    smoothedSpeed: 0,
    total,
  };
}

function updateTracker(tracker: Tracker, current: number) {
  const now = performance.now();
  const deltaMs = Math.max(now - tracker.lastMs, 1);
  const deltaValue = current - tracker.lastValue;

  // 순간 속도 (단위/초)
  const instantaneous = (deltaValue * 1000) / deltaMs;

  // EMA 스무딩 (급격한 변동 완화)
  const alpha = 0.3;
  tracker.smoothedSpeed =
    tracker.smoothedSpeed === 0
      ? instantaneous
      : alpha * instantaneous + (1 - alpha) * tracker.smoothedSpeed;

  tracker.lastMs = now;
  tracker.lastValue = current;

  const elapsedMs = now - tracker.startMs;
  const remaining =
    tracker.total && tracker.smoothedSpeed > 0
      ? ((tracker.total - current) / tracker.smoothedSpeed) * 1000
      : null;

  return {
    elapsedMs,
    speed: Math.max(tracker.smoothedSpeed, 0),
    remainingMs: remaining,
  };
}

function formatStats(
  mode: ProgressMode,
  itemLabel: string,
  elapsedMs: number,
  speed: number,
  remainingMs: number | null,
): FormattedProgressStats {
  let speedStr: string;
  if (speed <= 0) {
    speedStr = mode === 'bytes' ? '0 KB/s' : mode === 'items' ? `0 ${itemLabel}/s` : '0 %/s';
  } else if (mode === 'bytes') {
    speedStr = formatByteSpeed(speed);
  } else if (mode === 'items') {
    speedStr = `${speed.toFixed(1)} ${itemLabel}/s`;
  } else {
    speedStr = `${speed.toFixed(1)} %/s`;
  }

  return {
    elapsedTime: formatDuration(elapsedMs / 1000),
    speed: speedStr,
    estimatedTimeRemaining: formatETA(remainingMs, elapsedMs),
  };
}

export function useProgressStats(options: UseProgressStatsOptions) {
  const { mode, total, active = true, itemLabel = 'items' } = options;

  const trackerRef = useRef<Tracker>(createTracker(total));
  const [stats, setStats] = useState<FormattedProgressStats>(EMPTY_STATS);

  useEffect(() => {
    trackerRef.current.total = total;
  }, [total]);

  const update = useCallback(
    (current: number) => {
      if (!active) return;
      const raw = updateTracker(trackerRef.current, current);
      setStats(formatStats(mode, itemLabel, raw.elapsedMs, raw.speed, raw.remainingMs));
    },
    [active, mode, itemLabel],
  );

  const reset = useCallback(
    (newTotal?: number) => {
      trackerRef.current = createTracker(newTotal ?? total);
      setStats(EMPTY_STATS);
    },
    [total],
  );

  return { update, reset, stats };
}
