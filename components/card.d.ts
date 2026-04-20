/**
 * EverEx Card — shadcn/ui override
 *
 * Changes from default shadcn/ui:
 * [EverEx] Added `shadow-sm` (default shadcn has no shadow)
 * [EverEx] Added `transition-shadow duration-200` for hover shadow transition
 */
import * as React from 'react';
declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, };
//# sourceMappingURL=card.d.ts.map