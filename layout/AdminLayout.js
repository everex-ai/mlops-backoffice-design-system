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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLayout = AdminLayout;
const lucide_react_1 = require("lucide-react");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const utils_1 = require("@/lib/utils");
// [CUSTOMIZE] Define your service's admin navigation items
const navItems = [
    { href: '/admin', label: 'Dashboard', icon: lucide_react_1.LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: lucide_react_1.Users },
    { href: '/admin/settings', label: 'Settings', icon: lucide_react_1.Settings },
];
function AdminLayout({ children }) {
    const pathname = (0, navigation_1.usePathname)();
    // [CUSTOMIZE] Replace with your auth hook
    const handleLogout = () => {
        // logout logic
    };
    return (<div className="min-h-screen bg-background">
      {/* Header — fixed 49px height (py-2.5). Do NOT change vertical padding. */}
      <header className="sticky top-0 z-10">
        <div className="border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
          <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <link_1.default href="/">
                <button_1.Button variant="ghost" size="sm" className="text-muted-foreground">
                  <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
                  Home
                </button_1.Button>
              </link_1.default>
              <div className="flex items-center gap-2.5">
                {/* [CUSTOMIZE] Replace with your service's logo */}
                <image_1.default src="/everex-logo-icon.png" alt="EverEx" width={20} height={20} className="dark:brightness-0 dark:invert"/>
                <h1 className="text-base font-semibold tracking-tight">
                  {/* [CUSTOMIZE] Admin page title */}
                  Admin
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {/* [CUSTOMIZE] Add ThemeToggle, LanguageSwitcher here */}
              <button_1.Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground">
                <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
                Logout
              </button_1.Button>
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
            return (<link_1.default key={item.href} href={item.href}>
                  <div className={(0, utils_1.cn)('flex items-center justify-center md:justify-start gap-3 px-3 py-2 rounded-md text-sm transition-colors', isActive
                    ? 'bg-secondary text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground')} title={item.label}>
                    <Icon className="h-4 w-4 shrink-0"/>
                    <span className="hidden md:inline whitespace-nowrap">
                      {item.label}
                    </span>
                  </div>
                </link_1.default>);
        })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">{children}</main>
      </div>
    </div>);
}
