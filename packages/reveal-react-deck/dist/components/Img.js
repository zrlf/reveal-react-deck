import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../utils.js";
import { Ref } from "./Refs.js";
export default function Img({ src, caption, ...rest }) {
    const { className, ...restProps } = rest;
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
    return (_jsxs("figure", { className: cn("relative w-full h-full m-0", className), children: [_jsx("img", { "data-src": src, ...restProps, className: cn("w-fit h-fit object-contain", rest.className) }), caption && (_jsx("figcaption", { className: "absolute bottom-0 left-0 p-2 text-sm", children: getCaption(caption) }))] }));
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
