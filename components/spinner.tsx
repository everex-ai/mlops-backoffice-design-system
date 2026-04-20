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

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const spinnerVariants = cva('logo-spinner', {
  variants: {
    size: {
      sm: 'size-6', // 24px — inline in buttons
      md: 'size-9', // 36px — dialog/card loading
      lg: 'size-[72px]', // 72px — full-page loading
    },
    variant: {
      default: '',
      muted: '',
      primary: '',
    },
  },
  defaultVariants: {
    size: 'sm',
    variant: 'default',
  },
});

interface SpinnerProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof spinnerVariants> {
  /** 0~1 value. When provided, switches from infinite animation to fill percentage */
  progress?: number;
}

function Spinner({
  className,
  size,
  variant,
  progress,
  style,
  ...props
}: SpinnerProps) {
  const isProgressMode = progress !== undefined && progress !== null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        spinnerVariants({ size, variant }),
        isProgressMode && 'logo-spinner-progress',
        className,
      )}
      style={
        isProgressMode
          ? {
              ...style,
              backgroundPosition: `${(1 - Math.min(1, Math.max(0, progress))) * 100}% 0`,
            }
          : style
      }
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
