/**
 * EverEx Backoffice Design System — Utility Functions
 * ====================================================
 * Standard cn() utility used by all shadcn/ui components.
 *
 * Dependencies:
 *   npm install clsx tailwind-merge
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
