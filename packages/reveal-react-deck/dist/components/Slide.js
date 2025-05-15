import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";
import { SectionScopeProvider, useSectionContext, } from "../context/SectionScopeProvider.js";
import { DummyFragments } from "./DummyFragment.js";
import { cn } from "../utils.js";
function SlideTemplate({ children, frontmatter = {}, className, ...props }) {
    const [scope, animate] = useAnimate();
    if (frontmatter.animateEntry) {
        const { isPresent } = useSectionContext();
        useEffect(() => {
            if (isPresent) {
                animate(scope.current, {
                    opacity: [0, 1],
                    scale: [0, 1],
                }, {});
            }
        }, [isPresent]);
    }
    return (_jsxs("div", { ref: scope, "data-slide-content": true, "data-slide-layout": frontmatter.layout || "default", className: className, ...props, children: [frontmatter.fragments && _jsx(DummyFragments, { n: frontmatter.fragments }), children] }));
}
const Slide = ({ frontmatter, children, footer, header, }) => {
    // Use frontmatter data as needed
    if (frontmatter.hidden) {
        return null;
    }
    return (_jsxs(SectionScopeProvider, { ...frontmatter.reveal, className: cn(frontmatter.dark && "dark"), children: [header, frontmatter.layout !== "full" && frontmatter.layout !== "hero" && (_jsxs("div", { "data-slide-title": true, children: [_jsx("h1", { dangerouslySetInnerHTML: { __html: frontmatter.title || "" } }), frontmatter.subtitle && (_jsx("h2", { dangerouslySetInnerHTML: { __html: frontmatter.subtitle } }))] })), _jsx(SlideTemplate, { frontmatter: frontmatter, className: frontmatter.className, children: children }), footer] }));
};
export { Slide };
