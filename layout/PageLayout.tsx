/**
 * EverEx PageLayout — Standard page wrapper reference
 *
 * Includes:
 * - PageLayout: Main page layout with header and content area
 * - LoadingState: Card-based skeleton loading
 * - LoadingSpinner: Centered logo spinner
 * - ErrorState: Error with retry/back actions
 * - EmptyState: Empty data state (card or inline variant)
 *
 * [CUSTOMIZE] Replace auth, router, and i18n with your service's implementations.
 */

'use client';

import { ArrowLeft, LogOut } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Header } from './Header';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  headerContent?: ReactNode;
  headerActions?: ReactNode;
  headerNavigation?: ReactNode;
  showNavigation?: boolean;
  showDefaultActions?: boolean;
}

export function PageLayout({
  children,
  title,
  headerContent,
  headerActions,
  headerNavigation,
  showDefaultActions = true,
}: PageLayoutProps) {
  // [CUSTOMIZE] Replace with your auth hook
  const handleLogout = () => {
    // logout logic
  };

  const defaultActions = showDefaultActions ? (
    <>
      <Button variant="ghost" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </>
  ) : null;

  const actions = headerActions !== undefined ? headerActions : defaultActions;

  return (
    <div className="min-h-screen bg-background">
      <Header
        title={title}
        actions={actions}
        navigation={headerNavigation}
      >
        {headerContent}
      </Header>
      {/* [EverEx] animate-fade-in-up for page content entry */}
      <main className="container mx-auto px-4 py-8 animate-fade-in-up">
        {children}
      </main>
    </div>
  );
}

/**
 * Loading skeleton state for pages
 */
interface LoadingStateProps {
  title?: string;
}

export function LoadingState({ title }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto animate-pulse">
          <CardHeader>
            <div className="h-8 bg-muted rounded w-1/2 mb-2" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
              <div className="h-4 bg-muted rounded w-4/6" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/**
 * Centered spinner loading state
 */
export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Spinner size="lg" variant="primary" />
    </div>
  );
}

/**
 * Error state with retry option
 */
interface ErrorStateProps {
  title?: string;
  error: string;
  onBack?: () => void;
  onRetry?: () => void;
  backLabel?: string;
  retryLabel?: string;
}

export function ErrorState({
  title,
  error,
  onBack,
  onRetry,
  backLabel = 'Back',
  retryLabel = 'Retry',
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-destructive text-center mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {backLabel}
                </Button>
              )}
              {onRetry && (
                <Button onClick={onRetry}>{retryLabel}</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/**
 * Empty state component
 */
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: 'card' | 'inline';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'card',
}: EmptyStateProps) {
  const content = (
    <>
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {action}
    </>
  );

  if (variant === 'inline') {
    return (
      <div className="text-center py-12 border rounded-lg bg-muted/10">
        {content}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="text-center py-12">{content}</CardContent>
    </Card>
  );
}
