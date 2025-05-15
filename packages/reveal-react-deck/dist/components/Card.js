import { jsx as _jsx } from "react/jsx-runtime";
import cn from "clsx";
export const Card = ({ children, className, ...props }) => {
    return (_jsx("div", { ...props, className: cn("border-current border-l-4 shadow p-3 rounded-lg bg-neutral-200", className), children: children }));
};
