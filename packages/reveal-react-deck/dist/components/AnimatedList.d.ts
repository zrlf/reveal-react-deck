import { DOMKeyframesDefinition } from "framer-motion";
declare const FragmentList: ({ children, className, ...props }: {
    children: React.ReactNode;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
declare const AnimatedList: ({ children, on, className, animate, startDelay, delay, ...props }: {
    children: React.ReactNode;
    on?: "slide" | "fragment" | number;
    className?: string;
    animate?: DOMKeyframesDefinition;
    startDelay?: number;
    delay?: number;
}) => import("react/jsx-runtime").JSX.Element;
declare const AnimatedStagger: ({ children, on, className, animate, startDelay, delay, selector, }: {
    children: React.ReactNode;
    on: "slide" | "fragment" | number;
    className?: string;
    animate?: DOMKeyframesDefinition;
    startDelay?: number;
    delay?: number;
    selector?: string;
}) => import("react/jsx-runtime").JSX.Element;
export { AnimatedList, AnimatedStagger, FragmentList };
//# sourceMappingURL=AnimatedList.d.ts.map