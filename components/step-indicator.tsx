/**
 * EverEx StepIndicator — 다단계 워크플로우 진행 상태 표시
 *
 * 크롤러/파이프라인/배치 처리처럼 "순차적인 단계를 거치는 작업"의
 * 진행 상태를 한 줄로 시각화합니다.
 *
 * 공통 패턴:
 *   - 점(dot) 스테퍼: 각 단계 원형 마커 (번호 or 체크/X 아이콘)
 *   - 단계별 상태: pending, active, completed, failed, cancelled, warning
 *   - 선택적 진행률 바 (현재 active 단계의 내부 progress)
 *   - 현재 단계 라벨 + progress text (예: "23 / 100")
 *
 * [EverEx] AI-crawler/label_supporter 도메인 특화 로직 (예: rate-limit,
 *   cookie-refresh)은 `warning` 상태로 일반화했습니다.
 * [EverEx] raw hex/색상 유틸 금지 — 상태별 색은 primary/destructive/muted/
 *   chart-* 토큰으로만 표현합니다.
 *
 * @example
 *   <StepIndicator
 *     steps={[
 *       { id: 'fetch', label: '수집' },
 *       { id: 'parse', label: '파싱' },
 *       { id: 'store', label: '저장' },
 *     ]}
 *     currentStepId="parse"
 *     status="active"
 *     progress={{ current: 23, total: 100 }}
 *   />
 *
 *   // 실패 케이스
 *   <StepIndicator steps={steps} currentStepId="parse" status="failed" />
 */

'use client';

import { Check, X } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface StepDefinition {
  id: string;
  label: string;
  /** 툴팁에 표시될 부가 설명 (선택) */
  description?: string;
}

export type StepStatus =
  | 'pending' // 아직 시작 전
  | 'active' // 현재 진행 중
  | 'warning' // 진행 중이지만 일시 대기 상태 (rate limit, cookie refresh 등)
  | 'completed' // 전체 완료
  | 'failed' // 현재 단계에서 실패
  | 'cancelled'; // 사용자 취소

interface StepIndicatorProps {
  steps: StepDefinition[];
  /** 현재(또는 실패/취소 지점) 단계의 id */
  currentStepId: string;
  status: StepStatus;
  /** 활성 단계의 내부 진행률 (표시할 경우만) */
  progress?: {
    current: number;
    total: number;
    /** 진행률 바 우측에 붙일 라벨 (예: "파일", "items"). 미지정 시 "n / total"만 표시 */
    label?: string;
  };
  /** 현재 단계 라벨 아래 덧붙일 추가 정보 (예: worker id, job id) */
  meta?: React.ReactNode;
  className?: string;
}

export function StepIndicator({
  steps,
  currentStepId,
  status,
  progress,
  meta,
  className,
}: StepIndicatorProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  const stepIndex = currentIndex === -1 ? 0 : currentIndex;

  const isFailed = status === 'failed';
  const isCancelled = status === 'cancelled';
  const isWarning = status === 'warning';
  const isCompleted = status === 'completed';

  const currentStepLabel = steps[stepIndex]?.label;

  const progressValue =
    progress && progress.total > 0
      ? Math.min((progress.current / progress.total) * 100, 100)
      : 0;

  const progressText = progress
    ? `${progress.current.toLocaleString()} / ${progress.total.toLocaleString()}${
        progress.label ? ` ${progress.label}` : ''
      }`
    : null;

  return (
    <TooltipProvider>
      <div className={cn('space-y-1.5', className)}>
        {/* Dot stepper */}
        <div className="flex items-center gap-1">
          {steps.map((step, idx) => {
            // completed 상태일 때는 모든 단계가 done
            const dotCompleted = isCompleted || idx < stepIndex;
            const isHere = idx === stepIndex;
            const dotActive = isHere && status === 'active';
            const dotWarning = isHere && isWarning;
            const dotFailed = isHere && isFailed;
            const dotCancelled = isHere && isCancelled;
            const dotFuture = !isCompleted && idx > stepIndex;

            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: steps는 안정된 배열
              <div key={step.id} className="flex items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center',
                        'text-[10px] font-medium transition-all cursor-default',
                        // [EverEx] primary(teal)=진행 중, chart-2=완료(green 계열),
                        //   destructive=실패, muted=예정, muted-foreground=취소
                        //   chart-4=warning (노랑/주황 계열)
                        dotCompleted && 'bg-chart-2 text-primary-foreground',
                        dotActive &&
                          'bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-1 ring-offset-background animate-pulse',
                        dotWarning &&
                          'bg-chart-4 text-primary-foreground ring-2 ring-chart-4/30 ring-offset-1 ring-offset-background animate-pulse',
                        dotFailed && 'bg-destructive text-destructive-foreground',
                        dotCancelled && 'bg-muted-foreground text-background',
                        dotFuture && 'bg-muted text-muted-foreground',
                      )}
                    >
                      {dotCompleted ? (
                        <Check className="w-3 h-3" />
                      ) : dotFailed ? (
                        <X className="w-3 h-3" />
                      ) : (
                        idx + 1
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    {step.description ?? step.label}
                  </TooltipContent>
                </Tooltip>
                {idx < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-3 h-0.5 mx-0.5',
                      dotCompleted ? 'bg-chart-2' : 'bg-muted',
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* 현재 단계 라벨 + 진행률 텍스트 + 메타 */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={cn(
              'text-xs font-medium whitespace-nowrap',
              isFailed && 'text-destructive',
              isCancelled && 'text-muted-foreground',
              isWarning && 'text-chart-4',
              !isFailed && !isCancelled && !isWarning && 'text-foreground',
            )}
          >
            {isFailed
              ? `${currentStepLabel} 실패`
              : isCancelled
                ? '취소됨'
                : isCompleted
                  ? '완료'
                  : currentStepLabel}
          </span>
          {progressText && (
            <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
              {progressText}
            </span>
          )}
          {meta}
        </div>

        {/* 진행률 바 (active/warning 일 때만) */}
        {progress && (status === 'active' || isWarning) && (
          <Progress value={progressValue} className="h-1.5" />
        )}
      </div>
    </TooltipProvider>
  );
}
