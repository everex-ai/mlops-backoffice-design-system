/**
 * EverEx Animated Primitives — Framer Motion wrappers
 *
 * Provides reusable animation patterns:
 * - AnimatedList + AnimatedItem: Stagger list animation
 * - AnimatedContent: Presence-based content transitions (tabs, modals)
 * - Exported variant objects for custom motion usage
 *
 * Dependencies: framer-motion
 */
import { type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
declare const containerVariants: Variants;
declare const itemVariants: Variants;
declare const fadeVariants: Variants;
declare const slideUpVariants: Variants;
interface AnimatedListProps {
    children: ReactNode;
    className?: string;
}
/**
 * Animated container for lists — applies stagger to children.
 * Each child should be wrapped in <AnimatedItem>.
 */
export declare function AnimatedList({ children, className }: AnimatedListProps): import("react").JSX.Element;
interface AnimatedItemProps {
    children: ReactNode;
    className?: string;
}
/**
 * Animated list item — must be used inside AnimatedList.
 */
export declare function AnimatedItem({ children, className }: AnimatedItemProps): import("react").JSX.Element;
interface AnimatedPresenceContainerProps {
    children: ReactNode;
    presenceKey: string | number;
    className?: string;
    mode?: 'fade' | 'slideUp';
}
/**
 * Animated content with presence — for tab content, modals, etc.
 * Content smoothly transitions when `presenceKey` changes.
 */
export declare function AnimatedContent({ children, presenceKey, className, mode, }: AnimatedPresenceContainerProps): import("react").JSX.Element;
export { containerVariants, itemVariants, fadeVariants, slideUpVariants };
//# sourceMappingURL=animated.d.ts.map