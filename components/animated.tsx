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

'use client';

import { AnimatePresence, motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// Stagger container for list animations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

// Individual item animation
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
    },
  },
};

// Fade animation for content transitions
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

// Slide up fade animation
const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

/**
 * Animated container for lists — applies stagger to children.
 * Each child should be wrapped in <AnimatedItem>.
 */
export function AnimatedList({ children, className }: AnimatedListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Animated list item — must be used inside AnimatedList.
 */
export function AnimatedItem({ children, className }: AnimatedItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

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
export function AnimatedContent({
  children,
  presenceKey,
  className,
  mode = 'fade',
}: AnimatedPresenceContainerProps) {
  const variants = mode === 'slideUp' ? slideUpVariants : fadeVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={presenceKey}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Export variants for custom usage
export { containerVariants, itemVariants, fadeVariants, slideUpVariants };
