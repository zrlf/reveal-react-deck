import { jsxs as _jsxs } from "react/jsx-runtime";
import { useDeckStore } from "../hooks/useDeck.js";
import { cn } from "../utils.js";
import { useEffect, useRef, useState } from "react";
export const SlideNumber = ({ showTotal = false, className, }) => {
    const reveal = useDeckStore((s) => s.deck);
    const totalSlides = useDeckStore((s) => s.totalNumberOfSlides);
    const [slideNumber, setSlideNumber] = useState(0);
    const elementRef = useRef(null);
    useEffect(() => {
        if (!reveal)
            return;
        // find the parent section of the element
        const parentSection = elementRef.current?.closest("section");
        if (!parentSection)
            return;
        setSlideNumber(reveal.getSlidePastCount(parentSection) + 1);
    }, [reveal]);
    return (_jsxs("div", { ref: elementRef, className: cn("text-sm", className), children: [slideNumber, showTotal && ` / ${totalSlides}`] }));
};
