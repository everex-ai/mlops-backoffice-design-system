/**
 * EverEx Login Page — Standard login page for all backoffice services
 *
 * This is the CANONICAL login page layout. All EverEx backoffice services
 * MUST use this exact layout to maintain visual consistency.
 *
 * Fixed elements (DO NOT change):
 * - EverEx logo (top-left of brand panel, mobile header)
 * - Split layout structure (brand panel + login form)
 * - Grid pattern background on brand panel
 * - Google OAuth button (outline, h-11)
 * - "EverEx Innovation Office" footer text
 *
 * Props for service-specific customization:
 * - serviceName, serviceDescription — text only
 * - onGoogleLogin — OAuth handler
 * - additionalActions — extra login buttons
 * - headerActions — ThemeToggle, LanguageSwitcher slots
 *
 * Required asset:
 *   /public/everex-logo.png — EverEx 로고 파일 (디자인 시스템에 포함)
 *
 * Dependencies:
 *   shadcn/ui: button, alert, spinner (from design-system)
 *   lucide-react: AlertCircle
 *   next/image
 */

'use client';

import { AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

// Google SVG icon — shared across all services, do not change
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      />
    </svg>
  );
}

interface LoginPageProps {
  /** Service name displayed in brand panel heading and mobile header */
  serviceName?: string;
  /** Short service description shown below the heading */
  serviceDescription?: string;
  /** Callback for Google login — should handle the full OAuth flow */
  onGoogleLogin?: () => Promise<void>;
  /** Additional login buttons rendered below Google button */
  additionalActions?: React.ReactNode;
  /** Header-right slot for ThemeToggle, LanguageSwitcher, etc. */
  headerActions?: React.ReactNode;
}

export default function LoginPage({
  serviceName = 'Service Name',
  serviceDescription = 'EverEx Innovation Office 백오피스 서비스',
  onGoogleLogin,
  additionalActions,
  headerActions,
}: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (onGoogleLogin) {
        await onGoogleLogin();
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(
        err instanceof Error ? err.message : '로그인에 실패했습니다. 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Theme & language toggles — fixed top-right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
        {headerActions}
      </div>

      {/* =============================================
       * Left Brand Panel (desktop only, lg+)
       * DO NOT modify layout, logo, or grid pattern.
       * ============================================= */}
      <div className="hidden lg:flex lg:w-[440px] xl:w-[520px] relative overflow-hidden bg-card border-r border-border">
        {/* Subtle grid pattern background — fixed design element */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Brand content — top: EverEx logo, middle: service name, bottom: footer */}
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* EverEx logo — FIXED, do not replace with service logo */}
          <div>
            <Image
              src="/everex-logo.png"
              alt="EverEx"
              width={120}
              height={24}
              className="dark:brightness-0 dark:invert opacity-60"
            />
          </div>

          <div className="space-y-4">
            {/* Service name as large heading — line-breaks on space */}
            <h1 className="text-3xl xl:text-4xl font-bold tracking-tight leading-tight text-foreground">
              {serviceName.includes(' ') ? (
                <>
                  {serviceName.split(' ')[0]}
                  <br />
                  {serviceName.split(' ').slice(1).join(' ')}
                </>
              ) : (
                serviceName
              )}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              {serviceDescription}
            </p>
          </div>

          <p className="text-xs text-muted-foreground/60">
            EverEx Innovation Office
          </p>
        </div>
      </div>

      {/* =============================================
       * Right Login Form
       * ============================================= */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile header (hidden on desktop) — EverEx logo + service name */}
          <div className="lg:hidden flex flex-col items-center space-y-3">
            <Image
              src="/everex-logo.png"
              alt="EverEx"
              width={100}
              height={20}
              className="dark:brightness-0 dark:invert opacity-60"
            />
            <h1 className="text-xl font-semibold tracking-tight text-center">
              {serviceName}
            </h1>
          </div>

          {/* Desktop heading (hidden on mobile) */}
          <div className="hidden lg:block space-y-1.5">
            <h2 className="text-2xl font-semibold tracking-tight">
              로그인
            </h2>
            <p className="text-sm text-muted-foreground">
              계속하려면 Google 계정으로 로그인하세요
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Google login button — outline variant, h-11, full width */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-11 text-sm"
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="mr-3" />
              ) : (
                <GoogleIcon className="mr-3 h-4 w-4" />
              )}
              {isLoading ? '로그인 중...' : 'Continue with Google'}
            </Button>

            {/* Additional login methods (if any) */}
            {additionalActions}
          </div>

          {/* Mobile footer */}
          <p className="lg:hidden text-center text-xs text-muted-foreground/60">
            EverEx Innovation Office
          </p>
        </div>
      </div>
    </div>
  );
}
