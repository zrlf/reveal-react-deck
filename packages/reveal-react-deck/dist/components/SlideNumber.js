import { jsxs as _jsxs } from "react/jsx-runtime";
import { useDeckStore } from "../hooks/useDeck.js";
import { cn } from "../utils.js";
export const SlideNumber = ({ showTotal = false, className, }) => {
    const { currentSlide, totalNumberOfSlides } = useDeckStore((s) => s);
    return (_jsxs("div", { className: cn("text-sm", className), children: [currentSlide + 1, " ", showTotal && `/ ${totalNumberOfSlides}`] }));
};
