/**
 * EverEx Sonner (Toast) — shadcn/ui override
 *
 * Changes from default shadcn/ui:
 * [EverEx] Token-based styling (bg-background, text-foreground, border-border)
 * [EverEx] Custom lucide-react icons for each toast type
 * [EverEx] Recommended: position="top-center" when using in your layout
 *
 * Usage in layout:
 *   <Toaster position="top-center" />
 */

'use client';

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      // [EverEx] Custom lucide-react icons
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      // [EverEx] Token-based class names (not richColors)
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
