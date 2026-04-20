/**
 * EverEx Resizable — react-resizable-panels 래퍼
 *
 * shadcn/ui의 resizable과 거의 동일하지만, focus ring 색상이 EverEx primary
 * 토큰(`--ring`)을 따르도록 보장하고, 그립 핸들의 배경/테두리도 시맨틱 토큰을
 * 사용합니다.
 *
 * 주로 비디오 어노테이션 편집기처럼 좌/우 또는 상/하 분할 패널이 필요한
 * 백오피스 페이지에서 사용합니다.
 *
 * [EverEx] raw bg-color 금지 — bg-border, border 토큰만 사용.
 *
 * @example
 *   <ResizablePanelGroup direction="horizontal">
 *     <ResizablePanel defaultSize={30}>사이드바</ResizablePanel>
 *     <ResizableHandle withHandle />
 *     <ResizablePanel>메인</ResizablePanel>
 *   </ResizablePanelGroup>
 */

'use client';

import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        'flex h-full w-full data-[panel-group-direction=vertical]:flex-col',
        className,
      )}
      {...props}
    />
  );
}

const ResizablePanel = ResizablePrimitive.Panel;

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        // [EverEx] border/ring 토큰만 사용. 1px 시각적 라인 + 4px 히트영역.
        'relative flex w-px items-center justify-center bg-border',
        'after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1',
        'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full',
        'data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1',
        'data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2',
        'data-[panel-group-direction=vertical]:after:translate-x-0',
        '[&[data-panel-group-direction=vertical]>div]:rotate-90',
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
