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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
const lucide_react_1 = require("lucide-react");
const animated_1 = require("@/components/ui/animated");
const card_1 = require("@/components/ui/card");
const table_1 = require("@/components/ui/table");
const PageLayout_1 = require("@/components/layout/PageLayout");
const stats = [
    { label: 'Total Users', value: '2,420', icon: lucide_react_1.Users, trend: '+12%' },
    { label: 'Active Tasks', value: '145', icon: lucide_react_1.Activity, trend: '+3%' },
    { label: 'Documents', value: '12,842', icon: lucide_react_1.FileText, trend: '+8%' },
    { label: 'Growth', value: '23.1%', icon: lucide_react_1.TrendingUp, trend: '+2.4%' },
];
const recentItems = [
    { id: 1, name: 'Data Analysis Report', status: 'Completed', date: '2024-01-15' },
    { id: 2, name: 'User Research Survey', status: 'In Progress', date: '2024-01-14' },
    { id: 3, name: 'API Integration Test', status: 'Pending', date: '2024-01-13' },
    { id: 4, name: 'Dashboard Redesign', status: 'Completed', date: '2024-01-12' },
    { id: 5, name: 'Performance Audit', status: 'In Progress', date: '2024-01-11' },
];
function DashboardPage() {
    return (<PageLayout_1.PageLayout title="Dashboard">
      {/* Stat Cards with stagger animation */}
      <animated_1.AnimatedList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (<animated_1.AnimatedItem key={stat.label}>
            {/* [EverEx] Card has shadow-sm + hover:shadow-md transition */}
            <card_1.Card className="hover:shadow-md">
              <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
                <card_1.CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </card_1.CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-primary">{stat.trend}</span> from last month
                </p>
              </card_1.CardContent>
            </card_1.Card>
          </animated_1.AnimatedItem>))}
      </animated_1.AnimatedList>

      {/* Recent Items Table */}
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-lg">Recent Items</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <table_1.Table>
            <table_1.TableHeader>
              <table_1.TableRow className="bg-muted/40 hover:bg-muted/40">
                <table_1.TableHead className="font-semibold">Name</table_1.TableHead>
                <table_1.TableHead className="font-semibold">Status</table_1.TableHead>
                <table_1.TableHead className="font-semibold">Date</table_1.TableHead>
              </table_1.TableRow>
            </table_1.TableHeader>
            <table_1.TableBody>
              {recentItems.map((item, i) => (<table_1.TableRow key={item.id} 
        // [EverEx] Table row stagger animation
        className="animate-table-row" style={{ animationDelay: `${i * 30}ms` }}>
                  <table_1.TableCell className="font-medium">{item.name}</table_1.TableCell>
                  <table_1.TableCell>{item.status}</table_1.TableCell>
                  <table_1.TableCell className="text-muted-foreground">{item.date}</table_1.TableCell>
                </table_1.TableRow>))}
            </table_1.TableBody>
          </table_1.Table>
        </card_1.CardContent>
      </card_1.Card>
    </PageLayout_1.PageLayout>);
}
