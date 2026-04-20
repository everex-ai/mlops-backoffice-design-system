/**
 * EverEx Kbd — Keyboard shortcut display
 *
 * Displays keyboard shortcuts in a styled inline element.
 * Adapts to both regular and tooltip contexts.
 *
 * Usage:
 *   <Kbd>R</Kbd>
 *   <KbdGroup><Kbd>Ctrl</Kbd><Kbd>S</Kbd></KbdGroup>
 */
declare function Kbd({ className, ...props }: React.ComponentProps<'kbd'>): import("react").JSX.Element;
declare function KbdGroup({ className, ...props }: React.ComponentProps<'div'>): import("react").JSX.Element;
export { Kbd, KbdGroup };
//# sourceMappingURL=kbd.d.ts.map