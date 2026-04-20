/**
 * EverEx AdminLayout — Sidebar + header admin shell reference
 *
 * Features:
 * - Collapsible sidebar (icon-only on mobile, full on desktop)
 * - Active route highlighting
 * - Blur header with back navigation
 *
 * [CUSTOMIZE] Replace navItems, auth, and routing with your service's needs.
 */

'use client';

import {
  ArrowLeft,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
}

// [CUSTOMIZE] Define your service's admin navigation items
const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // [CUSTOMIZE] Replace with your auth hook
  const handleLogout = () => {
    // logout logic
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header — fixed 49px height (py-2.5). Do NOT change vertical padding. */}
      <header className="sticky top-0 z-10">
        <div className="border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
          <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <div className="flex items-center gap-2.5">
                {/* [CUSTOMIZE] Replace with your service's logo */}
                <Image
                  src="/everex-logo-icon.png"
                  alt="EverEx"
                  width={20}
                  height={20}
                  className="dark:brightness-0 dark:invert"
                />
                <h1 className="text-base font-semibold tracking-tight">
                  {/* [CUSTOMIZE] Admin page title */}
                  Admin
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* [CUSTOMIZE] Add ThemeToggle, LanguageSwitcher here */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — icon-only on mobile (w-14), full on desktop (md:w-56) */}
        <aside className="w-14 md:w-56 min-h-[calc(100vh-49px)] border-r border-border bg-card/50 shrink-0">
          <nav className="p-2 md:p-3 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      'flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                      isActive
                        ? 'bg-secondary text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                    )}
                    title={item.label}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}
