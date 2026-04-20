/**
 * EverEx TableSkeleton — Loading skeleton for tables
 *
 * Two variants:
 * - TableSkeleton: Uses shadcn Table components (semantic HTML table)
 * - DivTableSkeleton: Pure div-based (for non-table contexts)
 *
 * Usage:
 *   <TableSkeleton
 *     rows={5}
 *     columns={['w-1/4', 'w-1/3', 'w-1/6', 'w-1/4']}
 *     headers={['Name', 'Email', 'Role', 'Actions']}
 *   />
 *
 * The `columns` array defines width classes for each skeleton bar.
 */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface TableSkeletonProps {
  rows?: number;
  columns: string[];
  headers?: string[];
}

export function TableSkeleton({
  rows = 5,
  columns,
  headers,
}: TableSkeletonProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        {headers && (
          <TableHeader>
            <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
              {headers.map((header, i) => (
                <TableHead key={i} className="font-semibold">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {[...Array(rows)].map((_, i) => (
            <TableRow key={i}>
              {columns.map((w, j) => (
                <TableCell key={j}>
                  <div className={`h-4 ${w} bg-muted animate-pulse rounded`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface DivTableSkeletonProps {
  rows?: number;
  columns: string[];
  showHeader?: boolean;
}

export function DivTableSkeleton({
  rows = 5,
  columns,
  showHeader = true,
}: DivTableSkeletonProps) {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      {showHeader && (
        <div className="bg-muted/40 border-b px-4 py-3 flex gap-4">
          {columns.map((w, i) => (
            <div
              key={i}
              className={`h-4 ${w} bg-muted animate-pulse rounded`}
            />
          ))}
        </div>
      )}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="px-4 py-3 border-b flex gap-4">
          {columns.map((w, j) => (
            <div
              key={j}
              className={`h-4 ${w} bg-muted animate-pulse rounded`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
