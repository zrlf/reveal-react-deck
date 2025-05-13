import { jsx as _jsx } from "react/jsx-runtime";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import cn from "clsx";
import { createPortal } from "react-dom";
export const Conclusion = ({ children, fragment, className, }) => {
    const { overlayRef } = useSectionContext();
    if (!overlayRef?.current) {
        return null;
    }
    return createPortal(_jsx("div", { className: cn(fragment && "fragment", "absolute z-10 inset-0 no-margin slide-padding backdrop-blur-sm flex flex-col items-center justify-center"), children: _jsx("div", { className: cn(className, "w-2/3 bg-gray-200 p-4 rounded-xl shadow"), children: children }) }), overlayRef.current);
};
