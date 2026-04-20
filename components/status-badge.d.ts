/**
 * EverEx StatusBadge — Polymorphic status badge reference
 *
 * This is a REFERENCE implementation showing the pattern for
 * polymorphic status badges. Adapt the status types and label
 * maps to your service's domain.
 *
 * Pattern:
 * 1. Define enum + labels + badge variants in a types file
 * 2. Register in STATUS_CONFIGS
 * 3. Use <StatusBadge type="yourType" value={enumValue} />
 *
 * [CUSTOMIZE] Replace the status types below with your service's domain types.
 */
interface StatusBadgeProps {
    type: string;
    value: string;
    className?: string;
}
export declare function StatusBadge({ type, value, className }: StatusBadgeProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=status-badge.d.ts.map