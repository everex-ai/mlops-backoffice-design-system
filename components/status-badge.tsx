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

import { Badge } from '@/components/ui/badge';

// [CUSTOMIZE] Example status configuration — replace with your domain types
type StatusConfig = {
  labels: Record<string, string>;
  variants: Record<string, string>;
};

/**
 * Example: Register your status types here.
 *
 * const STATUS_CONFIGS: Record<string, StatusConfig> = {
 *   taskStatus: {
 *     labels: { PENDING: 'Pending', RUNNING: 'Running', DONE: 'Done' },
 *     variants: { PENDING: 'secondary', RUNNING: 'default', DONE: 'outline' },
 *   },
 *   priority: {
 *     labels: { LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' },
 *     variants: { LOW: 'secondary', MEDIUM: 'default', HIGH: 'outline', CRITICAL: 'destructive' },
 *   },
 * };
 */
const STATUS_CONFIGS: Record<string, StatusConfig> = {
  // [CUSTOMIZE] Add your status configurations here
  example: {
    labels: {
      ACTIVE: 'Active',
      INACTIVE: 'Inactive',
      PENDING: 'Pending',
    },
    variants: {
      ACTIVE: 'default',
      INACTIVE: 'secondary',
      PENDING: 'outline',
    },
  },
};

interface StatusBadgeProps {
  type: string;
  value: string;
  className?: string;
}

export function StatusBadge({ type, value, className }: StatusBadgeProps) {
  const config = STATUS_CONFIGS[type];

  if (!config) return null;

  const variant = (config.variants[value] || 'default') as
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline';
  const label = config.labels[value] || value;

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}
