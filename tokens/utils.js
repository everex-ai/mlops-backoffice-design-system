"use strict";
/**
 * EverEx Backoffice Design System — Utility Functions
 * ====================================================
 * Standard cn() utility used by all shadcn/ui components.
 *
 * Dependencies:
 *   npm install clsx tailwind-merge
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
