/**
 * Example: List Page with Table
 *
 * Demonstrates:
 * - PageLayout with custom header actions
 * - Table with skeleton loading
 * - StatusBadge usage
 * - Empty state
 * - Button variants (default, outline, ghost)
 */
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ListPage;
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const input_1 = require("@/components/ui/input");
const table_1 = require("@/components/ui/table");
const table_skeleton_1 = require("@/components/ui/table-skeleton");
const PageLayout_1 = require("@/components/layout/PageLayout");
const mockTasks = [
    { id: '1', name: 'Crawl news articles', status: 'ACTIVE', assignee: 'Kim', createdAt: '2024-01-15' },
    { id: '2', name: 'Process PDF documents', status: 'COMPLETED', assignee: 'Lee', createdAt: '2024-01-14' },
    { id: '3', name: 'Index research papers', status: 'PENDING', assignee: 'Park', createdAt: '2024-01-13' },
];
// Status badge configuration (mirrors StatusBadge pattern)
const STATUS_STYLES = {
    ACTIVE: 'bg-primary/10 text-primary border-primary/20',
    PENDING: 'bg-muted text-muted-foreground border-border',
    COMPLETED: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400',
};
function ListPage() {
    const [isLoading] = (0, react_1.useState)(false);
    const [tasks] = (0, react_1.useState)(mockTasks);
    const [search, setSearch] = (0, react_1.useState)('');
    const filtered = tasks.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
    return (<PageLayout_1.PageLayout title="Tasks" headerActions={
        // [EverEx] Button with active:scale-[0.97] micro-interaction
        <button_1.Button>
          <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
          New Task
        </button_1.Button>}>
      <card_1.Card>
        <card_1.CardHeader className="flex flex-row items-center justify-between">
          <card_1.CardTitle className="text-lg">All Tasks</card_1.CardTitle>
          <div className="relative w-64">
            <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <input_1.Input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9"/>
          </div>
        </card_1.CardHeader>
        <card_1.CardContent>
          {isLoading ? (
        // [EverEx] Skeleton loading with muted pulse animation
        <table_skeleton_1.TableSkeleton rows={5} columns={['w-1/3', 'w-1/6', 'w-1/6', 'w-1/4']} headers={['Name', 'Status', 'Assignee', 'Created']}/>) : filtered.length === 0 ? (
        // [EverEx] Empty state component
        <PageLayout_1.EmptyState title="No tasks found" description="Try adjusting your search or create a new task." variant="inline" action={<button_1.Button variant="outline">
                  <lucide_react_1.Plus className="h-4 w-4 mr-2"/>
                  Create Task
                </button_1.Button>}/>) : (<div className="rounded-lg border overflow-hidden">
              <table_1.Table>
                <table_1.TableHeader>
                  <table_1.TableRow className="bg-muted/40 hover:bg-muted/40">
                    <table_1.TableHead className="font-semibold">Name</table_1.TableHead>
                    <table_1.TableHead className="font-semibold">Status</table_1.TableHead>
                    <table_1.TableHead className="font-semibold">Assignee</table_1.TableHead>
                    <table_1.TableHead className="font-semibold">Created</table_1.TableHead>
                  </table_1.TableRow>
                </table_1.TableHeader>
                <table_1.TableBody>
                  {filtered.map((task, i) => (<table_1.TableRow key={task.id} 
            // [EverEx] Row stagger animation
            className="animate-table-row cursor-pointer hover:bg-muted/30" style={{ animationDelay: `${i * 30}ms` }}>
                      <table_1.TableCell className="font-medium">{task.name}</table_1.TableCell>
                      <table_1.TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ${STATUS_STYLES[task.status]}`}>
                          {task.status}
                        </span>
                      </table_1.TableCell>
                      <table_1.TableCell>{task.assignee}</table_1.TableCell>
                      <table_1.TableCell className="text-muted-foreground">
                        {task.createdAt}
                      </table_1.TableCell>
                    </table_1.TableRow>))}
                </table_1.TableBody>
              </table_1.Table>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </PageLayout_1.PageLayout>);
}
