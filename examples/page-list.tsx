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

import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TableSkeleton } from '@/components/ui/table-skeleton';
import { PageLayout, EmptyState } from '@/components/layout/PageLayout';

interface Task {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
  assignee: string;
  createdAt: string;
}

const mockTasks: Task[] = [
  { id: '1', name: 'Crawl news articles', status: 'ACTIVE', assignee: 'Kim', createdAt: '2024-01-15' },
  { id: '2', name: 'Process PDF documents', status: 'COMPLETED', assignee: 'Lee', createdAt: '2024-01-14' },
  { id: '3', name: 'Index research papers', status: 'PENDING', assignee: 'Park', createdAt: '2024-01-13' },
];

// Status badge configuration (mirrors StatusBadge pattern)
const STATUS_STYLES: Record<string, string> = {
  ACTIVE: 'bg-primary/10 text-primary border-primary/20',
  PENDING: 'bg-muted text-muted-foreground border-border',
  COMPLETED: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400',
};

export default function ListPage() {
  const [isLoading] = useState(false);
  const [tasks] = useState<Task[]>(mockTasks);
  const [search, setSearch] = useState('');

  const filtered = tasks.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <PageLayout
      title="Tasks"
      headerActions={
        // [EverEx] Button with active:scale-[0.97] micro-interaction
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      }
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">All Tasks</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            // [EverEx] Skeleton loading with muted pulse animation
            <TableSkeleton
              rows={5}
              columns={['w-1/3', 'w-1/6', 'w-1/6', 'w-1/4']}
              headers={['Name', 'Status', 'Assignee', 'Created']}
            />
          ) : filtered.length === 0 ? (
            // [EverEx] Empty state component
            <EmptyState
              title="No tasks found"
              description="Try adjusting your search or create a new task."
              variant="inline"
              action={
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              }
            />
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Assignee</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((task, i) => (
                    <TableRow
                      key={task.id}
                      // [EverEx] Row stagger animation
                      className="animate-table-row cursor-pointer hover:bg-muted/30"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium border ${STATUS_STYLES[task.status]}`}
                        >
                          {task.status}
                        </span>
                      </TableCell>
                      <TableCell>{task.assignee}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {task.createdAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
}
