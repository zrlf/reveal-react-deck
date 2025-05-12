import { jsx as _jsx } from "react/jsx-runtime";
import { useAnimate, AnimatePresence, } from "framer-motion";
import { motion, stagger } from "framer-motion";
import cn from "clsx";
import { useAnimation } from "../hooks/useAnimation.js";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import { Children, isValidElement, useEffect, useState } from "react";
const defaultAnimate = { y: [-20, 0], opacity: [0, 1] };
const FragmentList = ({ children, className, ...props }) => {
    const { fragment } = useSectionContext();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const items = Children.map(children, (child, index) => {
            if (isValidElement(child)) {
                const element = child;
                const fragmentIndex = parseInt(element.props["data-fragment-index"] || "0", 10);
                if (fragment >= fragmentIndex) {
                    return (_jsx(motion.li, { animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, children: element.props.children }, index));
                }
                return null;
            }
        });
        setItems(items ?? []);
    }, [fragment, children]);
    return (_jsx(AnimatePresence, { children: _jsx("ul", { className: cn("space-y-5", className), ...props, children: items }) }, fragment));
};
const AnimatedList = ({ children, on = "slide", className, animate = defaultAnimate, startDelay = 0.2, delay = 0.1, ...props }) => {
    const [scope, animateFunction] = useAnimate();
    useAnimation(scope, () => animateFunction("li", animate, {
        delay: stagger(delay, { startDelay: startDelay }),
    }), on);
    return (_jsx(motion.div, { ref: scope, className: cn("space-y-5", className), ...props, children: children }));
};
const AnimatedStagger = ({ children, on = "slide", className, animate = defaultAnimate, startDelay = 0.2, delay = 0.1, selector = ":scope > *", }) => {
    const [scope, animateFunction] = useAnimate();
    useAnimation(scope, () => animateFunction(selector, animate, {
        delay: stagger(delay, { startDelay: startDelay }),
    }), on);
    return (_jsx(motion.div, { ref: scope, className: cn("", className), children: children }));
};
export { AnimatedList, AnimatedStagger, FragmentList };
