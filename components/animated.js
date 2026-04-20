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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideUpVariants = exports.fadeVariants = exports.itemVariants = exports.containerVariants = void 0;
exports.AnimatedList = AnimatedList;
exports.AnimatedItem = AnimatedItem;
exports.AnimatedContent = AnimatedContent;
const framer_motion_1 = require("framer-motion");
// Stagger container for list animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.02,
        },
    },
};
exports.containerVariants = containerVariants;
// Individual item animation
const itemVariants = {
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
exports.itemVariants = itemVariants;
// Fade animation for content transitions
const fadeVariants = {
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
exports.fadeVariants = fadeVariants;
// Slide up fade animation
const slideUpVariants = {
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
exports.slideUpVariants = slideUpVariants;
/**
 * Animated container for lists — applies stagger to children.
 * Each child should be wrapped in <AnimatedItem>.
 */
function AnimatedList({ children, className }) {
    return (<framer_motion_1.motion.div variants={containerVariants} initial="hidden" animate="visible" className={className}>
      {children}
    </framer_motion_1.motion.div>);
}
/**
 * Animated list item — must be used inside AnimatedList.
 */
function AnimatedItem({ children, className }) {
    return (<framer_motion_1.motion.div variants={itemVariants} className={className}>
      {children}
    </framer_motion_1.motion.div>);
}
/**
 * Animated content with presence — for tab content, modals, etc.
 * Content smoothly transitions when `presenceKey` changes.
 */
function AnimatedContent({ children, presenceKey, className, mode = 'fade', }) {
    const variants = mode === 'slideUp' ? slideUpVariants : fadeVariants;
    return (<framer_motion_1.AnimatePresence mode="wait">
      <framer_motion_1.motion.div key={presenceKey} variants={variants} initial="hidden" animate="visible" exit="exit" className={className}>
        {children}
      </framer_motion_1.motion.div>
    </framer_motion_1.AnimatePresence>);
}
