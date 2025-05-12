import { jsx as _jsx } from "react/jsx-runtime";
import cn from "clsx";
export const Card = ({ children, className, ...props }) => {
    return (_jsx("div", { ...props, className: cn("border border-muted p-3 rounded-lg bg-neutral-200", className), children: children }));
};
