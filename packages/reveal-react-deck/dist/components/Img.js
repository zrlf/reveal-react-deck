import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils.js";
import { Ref } from "./Refs.js";
function getCaption(caption) {
    const match = caption.match(/^(.*?)\s\^(@\S+)/); // captures text before ^ and the cite key
    if (match) {
        const [, text, citeKey] = match;
        return (_jsxs("span", { children: [text, _jsx(Ref, { id: citeKey })] }));
    }
    else {
        return _jsx("span", { children: caption }); // no citation found
    }
}
export default function Img({ src, caption, containerClass, fillHeight, ...rest }) {
    const { className, ...restProps } = rest;
    return (_jsxs("figure", { className: cn("m-0 flex flex-col", fillHeight && "h-full", containerClass), children: [_jsx("img", { "data-src": src, ...restProps, className: cn("flex-1 min-h-0 w-full object-contain", className) }), caption && (_jsx("figcaption", { className: "p-1 text-sm w-full mt-2 flex-none self-start", children: getCaption(caption) }))] }));
}
const ImgHTML = (props) => {
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
const ImageRow = (props) => (_jsx("div", { className: cn(props.className, "flex gap-4 items-center"), children: props.children }));
export { Img, ImgHTML, ImageRow };
