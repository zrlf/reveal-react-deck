import { jsx as _jsx } from "react/jsx-runtime";
import cn from "clsx";
export const Overlay = ({ children, variant, fragment = true, className, ...props }) => {
    const classesCentered = "flex flex-col items-center justify-center";
    const classesConclusion = "bg-background/70";
    return (_jsx("div", { className: cn(className, fragment && "fragment", "overlay absolute z-20 inset-0 no-margin slide-padding", variant == "centered" && classesCentered, variant == "conclusion" && cn(classesConclusion, classesCentered)), ...props, children: variant == "conclusion" ? (_jsx("div", { className: "conclusion-overlay", children: children })) : (children) }));
};
