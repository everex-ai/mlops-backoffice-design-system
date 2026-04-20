/**
 * Example: Dashboard Page
 *
 * Demonstrates:
 * - PageLayout with default header
 * - AnimatedList + AnimatedItem for card stagger
 * - Card with shadow transition
 * - Chart color tokens
 * - Table with row stagger animation
 */

'use client';

import {
  Activity,
  FileText,
  TrendingUp,
  Users,
} from 'lucide-react';

import { AnimatedItem, AnimatedList } from '@/components/ui/animated';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageLayout } from '@/components/layout/PageLayout';

const stats = [
  { label: 'Total Users', value: '2,420', icon: Users, trend: '+12%' },
  { label: 'Active Tasks', value: '145', icon: Activity, trend: '+3%' },
  { label: 'Documents', value: '12,842', icon: FileText, trend: '+8%' },
  { label: 'Growth', value: '23.1%', icon: TrendingUp, trend: '+2.4%' },
];

const recentItems = [
  { id: 1, name: 'Data Analysis Report', status: 'Completed', date: '2024-01-15' },
  { id: 2, name: 'User Research Survey', status: 'In Progress', date: '2024-01-14' },
  { id: 3, name: 'API Integration Test', status: 'Pending', date: '2024-01-13' },
  { id: 4, name: 'Dashboard Redesign', status: 'Completed', date: '2024-01-12' },
  { id: 5, name: 'Performance Audit', status: 'In Progress', date: '2024-01-11' },
];

export default function DashboardPage() {
  return (
    <PageLayout title="Dashboard">
      {/* Stat Cards with stagger animation */}
      <AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <AnimatedItem key={stat.label}>
            {/* [EverEx] Card has shadow-sm + hover:shadow-md transition */}
            <Card className="hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-primary">{stat.trend}</span> from last month
                </p>
              </CardContent>
            </Card>
          </AnimatedItem>
        ))}
      </AnimatedList>

      {/* Recent Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentItems.map((item, i) => (
                <TableRow
                  key={item.id}
                  // [EverEx] Table row stagger animation
                  className="animate-table-row"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-muted-foreground">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
