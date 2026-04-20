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
import type { ReactNode } from 'react';
interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    headerContent?: ReactNode;
    headerActions?: ReactNode;
    headerNavigation?: ReactNode;
    showNavigation?: boolean;
    showDefaultActions?: boolean;
}
export declare function PageLayout({ children, title, headerContent, headerActions, headerNavigation, showDefaultActions, }: PageLayoutProps): import("react").JSX.Element;
/**
 * Loading skeleton state for pages
 */
interface LoadingStateProps {
    title?: string;
}
export declare function LoadingState({ title }: LoadingStateProps): import("react").JSX.Element;
/**
 * Centered spinner loading state
 */
export declare function LoadingSpinner(): import("react").JSX.Element;
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
export declare function ErrorState({ title, error, onBack, onRetry, backLabel, retryLabel, }: ErrorStateProps): import("react").JSX.Element;
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
export declare function EmptyState({ icon, title, description, action, variant, }: EmptyStateProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PageLayout.d.ts.map