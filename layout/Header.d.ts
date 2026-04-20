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
export declare function Header({ title, children, actions, navigation, }: HeaderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Header.d.ts.map