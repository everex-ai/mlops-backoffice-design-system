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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLayout = PageLayout;
exports.LoadingState = LoadingState;
exports.LoadingSpinner = LoadingSpinner;
exports.ErrorState = ErrorState;
exports.EmptyState = EmptyState;
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const spinner_1 = require("@/components/ui/spinner");
const Header_1 = require("./Header");
function PageLayout({ children, title, headerContent, headerActions, headerNavigation, showDefaultActions = true, }) {
    // [CUSTOMIZE] Replace with your auth hook
    const handleLogout = () => {
        // logout logic
    };
    const defaultActions = showDefaultActions ? (<>
      <button_1.Button variant="ghost" onClick={handleLogout}>
        <lucide_react_1.LogOut className="h-4 w-4 mr-2"/>
        Logout
      </button_1.Button>
    </>) : null;
    const actions = headerActions !== undefined ? headerActions : defaultActions;
    return (<div className="min-h-screen bg-background">
      <Header_1.Header title={title} actions={actions} navigation={headerNavigation}>
        {headerContent}
      </Header_1.Header>
      {/* [EverEx] animate-fade-in-up for page content entry */}
      <main className="container mx-auto px-4 py-8 animate-fade-in-up">
        {children}
      </main>
    </div>);
}
function LoadingState({ title }) {
    return (<div className="min-h-screen bg-background">
      <Header_1.Header title={title}/>
      <main className="container mx-auto px-4 py-8">
        <card_1.Card className="max-w-4xl mx-auto animate-pulse">
          <card_1.CardHeader>
            <div className="h-8 bg-muted rounded w-1/2 mb-2"/>
            <div className="h-4 bg-muted rounded w-1/3"/>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded"/>
              <div className="h-4 bg-muted rounded w-5/6"/>
              <div className="h-4 bg-muted rounded w-4/6"/>
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </main>
    </div>);
}
/**
 * Centered spinner loading state
 */
function LoadingSpinner() {
    return (<div className="min-h-screen flex items-center justify-center bg-background">
      <spinner_1.Spinner size="lg" variant="primary"/>
    </div>);
}
function ErrorState({ title, error, onBack, onRetry, backLabel = 'Back', retryLabel = 'Retry', }) {
    return (<div className="min-h-screen bg-background">
      <Header_1.Header title={title}/>
      <main className="container mx-auto px-4 py-8">
        <card_1.Card className="max-w-md mx-auto">
          <card_1.CardContent className="pt-6">
            <p className="text-destructive text-center mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              {onBack && (<button_1.Button variant="outline" onClick={onBack}>
                  <lucide_react_1.ArrowLeft className="h-4 w-4 mr-2"/>
                  {backLabel}
                </button_1.Button>)}
              {onRetry && (<button_1.Button onClick={onRetry}>{retryLabel}</button_1.Button>)}
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </main>
    </div>);
}
function EmptyState({ icon, title, description, action, variant = 'card', }) {
    const content = (<>
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (<p className="text-sm text-muted-foreground mb-4">{description}</p>)}
      {action}
    </>);
    if (variant === 'inline') {
        return (<div className="text-center py-12 border rounded-lg bg-muted/10">
        {content}
      </div>);
    }
    return (<card_1.Card>
      <card_1.CardContent className="text-center py-12">{content}</card_1.CardContent>
    </card_1.Card>);
}
