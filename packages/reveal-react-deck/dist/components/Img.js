import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils.js";
import { Ref } from "./Refs.js";
function getCaption(caption) {
    const match = caption.match(/^(.*?)\s\^(@[\w\d,-@]+)/); // match text and ^@ref1,@ref2
    if (match) {
        const [, text, citeGroup] = match;
        const citeKeys = citeGroup
            .split(",") // split by comma
            .map((key) => key.replace(/^@/, "").trim());
        return (_jsxs("span", { children: [text, _jsx(Ref, { id: citeKeys })] }));
    }
    else {
        return _jsx("span", { children: caption });
    }
}
export default function Img({ children, src, realSrc, caption, containerClass, fillHeight, lazy = true, ...rest }) {
    const { className, ...restProps } = rest;
    const srcToUse = src || realSrc;
    if (lazy) {
        restProps["data-src"] = srcToUse;
    }
    else {
        restProps["src"] = srcToUse;
    }
    return (_jsxs("figure", { className: cn("m-0 flex flex-col", fillHeight && "h-full", containerClass), children: [srcToUse ? (_jsx("img", { ...restProps, className: cn("flex-1 min-h-0 w-full object-contain", className) })) : (children), caption && (_jsx("figcaption", { className: "p-1 text-sm w-full mt-2 flex-none self-start", children: getCaption(caption) }))] }));
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
