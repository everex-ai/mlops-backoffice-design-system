/**
 * EverEx ThemeToggle — Light/Dark/System theme toggle
 *
 * Uses next-themes for theme management.
 * Sun/Moon icons rotate and scale during transitions.
 *
 * Dependencies:
 *   npm install next-themes lucide-react
 *   Requires shadcn/ui: button, dropdown-menu
 */
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeToggle = ThemeToggle;
const lucide_react_1 = require("lucide-react");
const next_themes_1 = require("next-themes");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
function ThemeToggle() {
    const { setTheme } = (0, next_themes_1.useTheme)();
    return (<dropdown_menu_1.DropdownMenu>
      <dropdown_menu_1.DropdownMenuTrigger asChild>
        <button_1.Button variant="outline" size="icon">
          {/* [EverEx] Sun/Moon icons with rotate+scale transition */}
          <lucide_react_1.Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
          <lucide_react_1.Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </button_1.Button>
      </dropdown_menu_1.DropdownMenuTrigger>
      <dropdown_menu_1.DropdownMenuContent align="end">
        {/* [CUSTOMIZE] Add i18n labels if needed */}
        <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </dropdown_menu_1.DropdownMenuItem>
        <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </dropdown_menu_1.DropdownMenuItem>
        <dropdown_menu_1.DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </dropdown_menu_1.DropdownMenuItem>
      </dropdown_menu_1.DropdownMenuContent>
    </dropdown_menu_1.DropdownMenu>);
}
