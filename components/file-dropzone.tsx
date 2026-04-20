/**
 * EverEx FileDropzone — 드래그 앤 드롭 파일 선택 영역
 *
 * 업로드 로직은 포함하지 않는 순수 UX 컴포넌트입니다.
 * 선택/드롭된 `File[]`을 `onFilesSelected` 콜백으로 넘겨주며,
 * 실제 업로드 구현(Firebase, S3, fetch 등)은 상위에서 담당합니다.
 *
 * 기능:
 *   - 드래그 오버 시 시각적 하이라이트 (primary 토큰 기반)
 *   - 클릭 시 OS 파일 선택 다이얼로그
 *   - `accept` MIME 필터 (예: 'image/*', 'video/*,image/*')
 *   - `multiple` / `disabled` 지원
 *   - 폴더 드롭 지원 (webkitGetAsEntry로 재귀 수집)
 *
 * [EverEx] raw bg-color 금지 — primary/muted/border 토큰만 사용.
 * [EverEx] 시각적 "활성화" 상태는 `ring` + `bg-primary/5`로 표현.
 *
 * @example
 *   <FileDropzone
 *     accept="image/*,video/*"
 *     multiple
 *     onFilesSelected={(files) => uploadAll(files)}
 *     hint="이미지 또는 비디오 파일을 드래그하거나 클릭하여 선택"
 *   />
 */

'use client';

import { Upload } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** 최대 파일 개수 (초과 시 onFilesSelected로 전달 안 됨). 미지정 시 무제한. */
  maxFiles?: number;
  /** 총 바이트 수 상한. 초과 시 onError 호출. */
  maxTotalBytes?: number;
  /** 에러 콜백 (maxFiles/maxTotalBytes 초과, 빈 선택 등) */
  onError?: (error: string) => void;
  /** 폴더 드롭 시 하위 파일까지 재귀 수집. 기본 true. */
  recurseFolders?: boolean;
  title?: string;
  hint?: string;
  className?: string;
  /** 내부 콘텐츠를 대체할 custom children */
  children?: React.ReactNode;
}

/** webkitGetAsEntry로 폴더 드롭 재귀 수집 */
async function collectFilesFromEntry(
  entry: FileSystemEntry | null,
): Promise<File[]> {
  if (!entry) return [];
  if (entry.isFile) {
    return new Promise((resolve) => {
      (entry as FileSystemFileEntry).file(
        (file) => resolve([file]),
        () => resolve([]),
      );
    });
  }
  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader();
    return new Promise((resolve) => {
      const all: File[] = [];
      const readBatch = () => {
        reader.readEntries(async (entries) => {
          if (entries.length === 0) {
            resolve(all);
            return;
          }
          for (const e of entries) {
            const files = await collectFilesFromEntry(e);
            all.push(...files);
          }
          readBatch();
        });
      };
      readBatch();
    });
  }
  return [];
}

async function extractFilesFromDrop(
  e: React.DragEvent<HTMLDivElement>,
  recurse: boolean,
): Promise<File[]> {
  if (!recurse || !e.dataTransfer.items) {
    return Array.from(e.dataTransfer.files ?? []);
  }
  const results: File[] = [];
  const items = Array.from(e.dataTransfer.items);
  for (const item of items) {
    const entry = item.webkitGetAsEntry?.();
    if (entry) {
      const files = await collectFilesFromEntry(entry);
      results.push(...files);
    } else if (item.kind === 'file') {
      const file = item.getAsFile();
      if (file) results.push(file);
    }
  }
  return results;
}

export function FileDropzone({
  onFilesSelected,
  accept,
  multiple = false,
  disabled = false,
  maxFiles,
  maxTotalBytes,
  onError,
  recurseFolders = true,
  title = '파일을 드래그하여 놓거나 클릭하여 선택',
  hint,
  className,
  children,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const validate = useCallback(
    (files: File[]): File[] | null => {
      if (files.length === 0) return null;
      if (maxFiles !== undefined && files.length > maxFiles) {
        onError?.(`파일은 최대 ${maxFiles}개까지 선택할 수 있습니다.`);
        return null;
      }
      if (maxTotalBytes !== undefined) {
        const total = files.reduce((acc, f) => acc + f.size, 0);
        if (total > maxTotalBytes) {
          onError?.('전체 용량이 허용 범위를 초과했습니다.');
          return null;
        }
      }
      return multiple ? files : files.slice(0, 1);
    },
    [maxFiles, maxTotalBytes, multiple, onError],
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    if (disabled) return;

    const files = await extractFilesFromDrop(e, recurseFolders);
    const ok = validate(files);
    if (ok) onFilesSelected(ok);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const ok = validate(files);
    if (ok) onFilesSelected(ok);
    // 같은 파일 재선택을 허용하기 위해 reset
    e.target.value = '';
  };

  const handleClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative flex flex-col items-center justify-center gap-2',
        'min-h-[180px] w-full rounded-lg border-2 border-dashed px-6 py-10',
        'text-center transition-colors cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border bg-muted/30 hover:bg-muted/50',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
      />
      {children ?? (
        <>
          <Upload className="h-8 w-8 text-muted-foreground" aria-hidden />
          <p className="text-sm font-medium text-foreground">{title}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </>
      )}
    </div>
  );
}
