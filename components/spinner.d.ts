/**
 * EverEx Spinner — Logo mask spinner with progress support
 *
 * Uses CSS mask-image with the service logo. The logo silhouette is filled
 * with the primary color via gradient animation.
 *
 * Features:
 * - Indeterminate mode: infinite fill animation (default)
 * - Determinate mode: pass `progress` (0~1) for fill percentage
 *
 * [CUSTOMIZE] The logo mask is defined in globals.css `.logo-spinner` class.
 * Update the mask-image URL to your service's logo.
 *
 * Dependencies: class-variance-authority
 */
import { type VariantProps } from 'class-variance-authority';
declare const spinnerVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    variant?: "default" | "primary" | "muted" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface SpinnerProps extends React.ComponentProps<'div'>, VariantProps<typeof spinnerVariants> {
    /** 0~1 value. When provided, switches from infinite animation to fill percentage */
    progress?: number;
}
declare function Spinner({ className, size, variant, progress, style, ...props }: SpinnerProps): import("react").JSX.Element;
export { Spinner, spinnerVariants };
//# sourceMappingURL=spinner.d.ts.map