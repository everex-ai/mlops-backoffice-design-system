/**
 * EverEx Format Utilities — 범용 포맷터
 *
 * 세 개 백오피스 (video_annotator, label_supporter, AI-crawler)에서
 * 공통으로 사용되는 포맷 패턴을 모았습니다.
 *
 * Usage:
 *   import { formatTime, formatDuration, formatFileSize, formatETA } from '@/lib/format';
 */

/**
 * 초 단위 숫자를 mm:ss.d 형태의 시간 문자열로 변환
 *
 * @example
 *   formatTime(65.42)           // "1:05.4"
 *   formatTime(65.42, false)    // "1:05"
 */
export function formatTime(seconds: number, includeMs = true): string {
  if (!Number.isFinite(seconds) || seconds < 0) return includeMs ? '0:00.0' : '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (includeMs) {
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  }

  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 초 → mm:ss (밀리초 생략)
 */
export function formatDuration(seconds: number): string {
  return formatTime(seconds, false);
}

/**
 * 밀리초 → mm:ss (업로드/다운로드 진행 시간 표시용)
 */
export function formatElapsedMs(ms: number): string {
  return formatDuration(ms / 1000);
}

/**
 * 바이트 → 사람이 읽기 편한 크기 문자열 (Bytes/KB/MB/GB/TB 자동 스케일)
 *
 * @example
 *   formatFileSize(0)          // "0 Bytes"
 *   formatFileSize(1024)       // "1 KB"
 *   formatFileSize(1536000)    // "1.46 MB"
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

  return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 바이트 → MB 고정
 */
export function formatFileSizeMB(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`;
}

/**
 * 바이트/초 속도 포맷팅 (MB/s 또는 KB/s)
 */
export function formatByteSpeed(bytesPerSec: number): string {
  if (!Number.isFinite(bytesPerSec) || bytesPerSec <= 0) return '0 KB/s';
  if (bytesPerSec >= 1024 * 1024) {
    return `${(bytesPerSec / (1024 * 1024)).toFixed(1)} MB/s`;
  }
  return `${(bytesPerSec / 1024).toFixed(0)} KB/s`;
}

/**
 * 남은 시간 포맷팅 — 한국어 기반 ETA (업로드/학습 진행 시 사용)
 *
 * @param remainingMs  남은 시간(밀리초). null/음수/Infinity 입력은 "계산 중..."
 * @param elapsedMs    현재까지 경과 시간(밀리초). 2초 미만이면 "계산 중..."
 *
 * @example
 *   formatETA(45000, 5000)      // "약 45초"
 *   formatETA(125000, 10000)    // "약 2분 5초"
 *   formatETA(null, 0)          // "계산 중..."
 */
export function formatETA(remainingMs: number | null, elapsedMs: number): string {
  if (elapsedMs < 2000) return '계산 중...';
  if (remainingMs === null || !Number.isFinite(remainingMs) || remainingMs < 0) {
    return '계산 중...';
  }

  const totalSeconds = Math.ceil(remainingMs / 1000);
  if (totalSeconds < 60) return `약 ${totalSeconds}초`;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) return `약 ${minutes}분`;
  return `약 ${minutes}분 ${seconds}초`;
}
