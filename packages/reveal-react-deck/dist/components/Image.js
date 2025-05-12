import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../utils.js";
export const Image = (props) => {
    const altClasses = props.alt
        ?.split(" ")
        .filter((c) => c.startsWith("."))
        .join(" ")
        .replace(/\./g, "");
    const divClasses = cn("relative h-full w-full", altClasses);
    const imgClasses = cn({
        "w-fit h-fit object-contain drop-shadow-lg rounded": props.title === "raw",
        "w-fit h-fit object-contain": props.title !== "raw",
    });
    const { src, ...rest } = props;
    if (props.title === "raw") {
        return _jsx("img", { "data-src": src, ...rest, className: imgClasses });
    }
    return (_jsx("div", { className: divClasses, children: _jsx("img", { "data-src": src, ...rest, className: imgClasses }) }));
};
export const ImageRow = (props) => (_jsx("div", { className: cn(props.className, "flex gap-4 items-center"), children: props.children }));
