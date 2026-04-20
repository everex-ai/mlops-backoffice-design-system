"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableSkeleton = TableSkeleton;
exports.DivTableSkeleton = DivTableSkeleton;
const table_1 = require("@/components/ui/table");
function TableSkeleton({ rows = 5, columns, headers, }) {
    return (<div className="rounded-lg border bg-card overflow-hidden">
      <table_1.Table>
        {headers && (<table_1.TableHeader>
            <table_1.TableRow className="border-b bg-muted/40 hover:bg-muted/40">
              {headers.map((header, i) => (<table_1.TableHead key={i} className="font-semibold">
                  {header}
                </table_1.TableHead>))}
            </table_1.TableRow>
          </table_1.TableHeader>)}
        <table_1.TableBody>
          {[...Array(rows)].map((_, i) => (<table_1.TableRow key={i}>
              {columns.map((w, j) => (<table_1.TableCell key={j}>
                  <div className={`h-4 ${w} bg-muted animate-pulse rounded`}/>
                </table_1.TableCell>))}
            </table_1.TableRow>))}
        </table_1.TableBody>
      </table_1.Table>
    </div>);
}
function DivTableSkeleton({ rows = 5, columns, showHeader = true, }) {
    return (<div className="rounded-lg border bg-card overflow-hidden">
      {showHeader && (<div className="bg-muted/40 border-b px-4 py-3 flex gap-4">
          {columns.map((w, i) => (<div key={i} className={`h-4 ${w} bg-muted animate-pulse rounded`}/>))}
        </div>)}
      {[...Array(rows)].map((_, i) => (<div key={i} className="px-4 py-3 border-b flex gap-4">
          {columns.map((w, j) => (<div key={j} className={`h-4 ${w} bg-muted animate-pulse rounded`}/>))}
        </div>))}
    </div>);
}
