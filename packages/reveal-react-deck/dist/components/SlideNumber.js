import { jsx as _jsx } from "react/jsx-runtime";
import { useDeckStore } from "../hooks/useDeck.js";
import { cn } from "../utils.js";
import { useEffect, useRef, useState } from "react";
export const SlideNumber = ({ showTotal = false, className, }) => {
    const reveal = useDeckStore((s) => s.deck);
    const [slideNumber, setSlideNumber] = useState('#');
    const elementRef = useRef(null);
    useEffect(() => {
        if (!reveal)
            return;
        const slides = reveal.getSlidesElement();
        const nbBackupSlides = slides?.querySelectorAll("section.backup").length;
        const totalSlides = reveal.getTotalSlides() - (nbBackupSlides || 0);
        // find the parent section of the element
        const parentSection = elementRef.current?.closest("section");
        if (!parentSection)
            return;
        const currentSlideNumber = reveal.getSlidePastCount(parentSection) + 1;
        if (parentSection.classList.contains("backup")) {
            // If the current slide is a backup slide, we need to adjust the current slide number
            setSlideNumber(`appx. ${currentSlideNumber - totalSlides}`);
            return;
        }
        setSlideNumber(`${currentSlideNumber} ${showTotal ? ` / ${totalSlides}` : ''}`);
    }, [reveal]);
    return _jsx("div", { ref: elementRef, className: cn("text-sm", className), children: slideNumber });
};
