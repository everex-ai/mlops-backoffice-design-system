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
interface TableSkeletonProps {
    rows?: number;
    columns: string[];
    headers?: string[];
}
export declare function TableSkeleton({ rows, columns, headers, }: TableSkeletonProps): import("react").JSX.Element;
interface DivTableSkeletonProps {
    rows?: number;
    columns: string[];
    showHeader?: boolean;
}
export declare function DivTableSkeleton({ rows, columns, showHeader, }: DivTableSkeletonProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=table-skeleton.d.ts.map