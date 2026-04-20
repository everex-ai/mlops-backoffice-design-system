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
export default function LoginPage({ serviceName, serviceDescription, onGoogleLogin, additionalActions, headerActions, }: LoginPageProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=LoginPage.d.ts.map