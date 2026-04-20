/**
 * EverEx Button — shadcn/ui override
 *
 * Changes from default shadcn/ui:
 * [EverEx] Added `active:scale-[0.97]` micro-interaction on press
 * [EverEx] Changed `transition-colors` → `transition-all duration-150` for scale animation
 */
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "destructive" | "ghost" | "outline" | null | undefined;
    size?: "default" | "lg" | "sm" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map