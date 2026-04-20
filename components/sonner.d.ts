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
import { Toaster as Sonner } from 'sonner';
type ToasterProps = React.ComponentProps<typeof Sonner>;
declare const Toaster: ({ ...props }: ToasterProps) => import("react").JSX.Element;
export { Toaster };
//# sourceMappingURL=sonner.d.ts.map