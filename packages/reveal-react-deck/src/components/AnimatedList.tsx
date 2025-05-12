import {
  DOMKeyframesDefinition,
  useAnimate,
  AnimatePresence,
} from "framer-motion";
import { motion, stagger } from "framer-motion";
import cn from "clsx";
import { useAnimation } from "../hooks/useAnimation";
import { useSectionContext } from "../context/SectionScopeProvider";
import { Children, isValidElement, useEffect, useState } from "react";

const defaultAnimate = { y: [-20, 0], opacity: [0, 1] };

const FragmentList = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { fragment } = useSectionContext();
  const [items, setItems] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const items = Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        const element = child as React.ReactElement<any>;
        const fragmentIndex = parseInt(
          element.props["data-fragment-index"] || "0",
          10,
        );
        if (fragment >= fragmentIndex) {
          return (
            <motion.li
              key={index}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {element.props.children}
            </motion.li>
          );
        }
        return null;
      }
    });
    setItems(items ?? []);
  }, [fragment, children]);

  return (
    <AnimatePresence key={fragment}>
      <ul className={cn("space-y-5", className)} {...props}>
        {items}
      </ul>
    </AnimatePresence>
  );
};

const AnimatedList = ({
  children,
  on = "slide",
  className,
  animate = defaultAnimate,
  startDelay = 0.2,
  delay = 0.1,
  ...props
}: {
  children: React.ReactNode;
  on?: "slide" | "fragment" | number;
  className?: string;
  animate?: DOMKeyframesDefinition;
  startDelay?: number;
  delay?: number;
}) => {
  const [scope, animateFunction] = useAnimate();

  useAnimation(
    scope,
    () =>
      animateFunction("li", animate, {
        delay: stagger(delay, { startDelay: startDelay }),
      }),
    on,
  );

  return (
    <motion.div ref={scope} className={cn("space-y-5", className)} {...props}>
      {children}
    </motion.div>
  );
};

const AnimatedStagger = ({
  children,
  on = "slide",
  className,
  animate = defaultAnimate,
  startDelay = 0.2,
  delay = 0.1,
  selector = ":scope > *",
}: {
  children: React.ReactNode;
  on: "slide" | "fragment" | number;
  className?: string;
  animate?: DOMKeyframesDefinition;
  startDelay?: number;
  delay?: number;
  selector?: string;
}) => {
  const [scope, animateFunction] = useAnimate();

  useAnimation(
    scope,
    () =>
      animateFunction(selector, animate, {
        delay: stagger(delay, { startDelay: startDelay }),
      }),
    on,
  );

  return (
    <motion.div ref={scope} className={cn("", className)}>
      {children}
    </motion.div>
  );
};

export { AnimatedList, AnimatedStagger, FragmentList };
