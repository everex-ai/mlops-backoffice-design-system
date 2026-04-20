/**
 * EverEx LogViewer — 자동 스크롤 로그 뷰어
 *
 * 백그라운드 Job/파이프라인의 로그 스트림을 표시하는 공통 패턴입니다.
 * 스크롤이 하단에 붙어있을 때만 자동 스크롤하고, 사용자가 위로 올리면
 * 자동 스크롤이 해제됩니다.
 *
 * [EverEx] 데이터 패칭은 소비자 책임. 이 컴포넌트는 순수 표시용입니다.
 * [EverEx] shadcn 기본 제공 아님. AI-crawler JobLogsViewer 패턴에서 일반화.
 * [EverEx] 레벨별 색상은 시맨틱 토큰(destructive/chart-*)만 사용.
 *
 * @example
 *   const [level, setLevel] = useState<LogLevel | 'ALL'>('ALL');
 *   const { data: logs } = useQuery({
 *     queryKey: ['logs', jobId, level],
 *     queryFn: () => fetchLogs(jobId, level === 'ALL' ? undefined : level),
 *     refetchInterval: isActive ? 3000 : false,
 *   });
 *
 *   <LogViewer
 *     logs={logs ?? []}
 *     level={level}
 *     onLevelChange={setLevel}
 *     isLoading={isLoading}
 *   />
 */

'use client';

import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export interface LogEntry {
  id: string;
  /** Unix ms 또는 ISO 문자열. 표시는 HH:mm:ss 포맷. */
  timestamp: number | string;
  level: LogLevel;
  message: string;
}

// [EverEx] 레벨별 색상은 토큰 기반. destructive=ERROR,
//   chart-4=WARN (amber 계열), chart-3=INFO (teal/blue 계열),
//   muted=DEBUG
const LEVEL_STYLES: Record<LogLevel, string> = {
  ERROR: 'bg-destructive/10 text-destructive border-destructive/20',
  WARN: 'bg-chart-4/15 text-chart-4 border-chart-4/20',
  INFO: 'bg-chart-3/15 text-chart-3 border-chart-3/20',
  DEBUG: 'bg-muted text-muted-foreground border-border',
};

function formatTimestamp(ts: number | string): string {
  const d = typeof ts === 'string' ? new Date(ts) : new Date(Number(ts));
  if (Number.isNaN(d.getTime())) return '--:--:--';
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  const ss = d.getSeconds().toString().padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

interface LogViewerProps {
  logs: LogEntry[];
  /** 현재 선택된 레벨 필터. 'ALL' 또는 LogLevel */
  level?: LogLevel | 'ALL';
  onLevelChange?: (level: LogLevel | 'ALL') => void;
  isLoading?: boolean;
  /** 로그 영역 높이. 기본 300px. */
  height?: number | string;
  /** 우측 상단 제목. 기본 "처리 로그" */
  title?: string;
  className?: string;
  /** 빈 상태 메시지 */
  emptyMessage?: string;
}

export function LogViewer({
  logs,
  level = 'ALL',
  onLevelChange,
  isLoading = false,
  height = 300,
  title = '처리 로그',
  className,
  emptyMessage = '로그가 없습니다',
}: LogViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // logs가 바뀔 때 하단 고정 중이면 자동 스크롤
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const atBottom =
      target.scrollHeight - target.scrollTop - target.clientHeight < 50;
    setAutoScroll(atBottom);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        {onLevelChange && (
          <Select
            value={level}
            onValueChange={(v) => onLevelChange(v as LogLevel | 'ALL')}
          >
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">전체</SelectItem>
              <SelectItem value="ERROR">ERROR</SelectItem>
              <SelectItem value="WARN">WARN</SelectItem>
              <SelectItem value="INFO">INFO</SelectItem>
              <SelectItem value="DEBUG">DEBUG</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        // [EverEx] bg-card는 라이트, dark:bg-background로 다크모드 대비 유지
        className="overflow-y-auto rounded-md border bg-card dark:bg-background p-3 font-mono text-xs"
        style={{ height }}
      >
        {isLoading ? (
          <p className="text-muted-foreground">로그 로딩 중...</p>
        ) : logs.length === 0 ? (
          <p className="text-muted-foreground">{emptyMessage}</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex gap-2 py-0.5 hover:bg-muted/50 rounded-sm"
            >
              <span className="text-muted-foreground shrink-0 tabular-nums">
                {formatTimestamp(log.timestamp)}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  'text-[10px] px-1 py-0 h-4 shrink-0',
                  LEVEL_STYLES[log.level] ?? LEVEL_STYLES.INFO,
                )}
              >
                {log.level}
              </Badge>
              <span className="text-foreground break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
