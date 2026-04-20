/**
 * EverEx Header — Sticky blur header reference
 *
 * IMPORTANT: Header height is fixed at 49px across all EverEx services.
 * This is achieved by: py-2.5 (20px) + content (~29px) = 49px.
 * Do NOT change the vertical padding — other components depend on this
 * height (e.g., sidebar min-h-[calc(100vh-49px)]).
 *
 * Features:
 * - Sticky positioning with backdrop blur
 * - Fixed height: 49px (py-2.5 + border-b)
 * - Logo + title on the left
 * - Navigation slot in the middle
 * - Action buttons on the right
 *
 * [CUSTOMIZE] Replace logo, title, and navigation with your service's content.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface HeaderProps {
  /** [CUSTOMIZE] Service name displayed next to the logo */
  title?: string;
  /** Override the default logo + title with custom content */
  children?: ReactNode;
  /** Right-side action buttons (theme toggle, logout, etc.) */
  actions?: ReactNode;
  /** Navigation component between logo and actions */
  navigation?: ReactNode;
}

export function Header({
  // [CUSTOMIZE] Change default title to your service name
  title = 'EverEx Service',
  children,
  actions,
  navigation,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10">
      {/* [EverEx] Blur header: bg/95 default, bg/80 with backdrop-filter support */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {children || (
              <Link
                href="/"
                className="flex items-center gap-2.5 group shrink-0"
              >
                {/* [CUSTOMIZE] Replace with your service's logo */}
                <Image
                  src="/everex-logo-icon.png"
                  alt="EverEx"
                  width={22}
                  height={22}
                  className="shrink-0"
                />
                <h1 className="text-base font-semibold text-foreground tracking-tight whitespace-nowrap">
                  {title}
                </h1>
              </Link>
            )}
            {navigation}
          </div>
          <div className="flex items-center gap-1.5">
            {actions}
            {/* [CUSTOMIZE] Add ThemeToggle, LanguageSwitcher, etc. */}
          </div>
        </div>
      </div>
    </header>
  );
}
