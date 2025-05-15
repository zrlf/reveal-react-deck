import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement, useCallback } from "react";
import { Slide } from "./Slide.js";
import { Footer, Header } from "./Header.js";
import Video from "./Video.js";
import OnFragment from "./OnFragment.js";
import { DummyFragments } from "./DummyFragment.js";
import { Conclusion } from "./Conclusion.js";
import { Card } from "./Card.js";
import { Ref } from "./Refs.js";
import { Img, ImgHTML } from "./Img.js";
import { Overlay } from "./Overlay.js";
import { Admonition } from "./Admonition.js";
export { SlideNumber } from "./SlideNumber.js";
const components = {
    Admonition,
    Video,
    OnFragment,
    DummyFragments,
    Fragment: (props) => _jsx("div", { className: "fragment", ...props }),
    Conclusion,
    Overlay,
    Card,
    Ref,
    code: (props) => {
        return _jsx("code", { ...props, className: `language-${props.className}` });
    },
    img: ImgHTML,
    Img,
};
const mdxComponents = (options) => {
    const footer = options.footer
        ? isValidElement(options.footer)
            ? options.footer
            : Footer(options.footer)
        : null;
    const header = options.header
        ? isValidElement(options.header)
            ? options.header
            : Header(options.header)
        : null;
    const SlideWrapWithFooter = useCallback((props) => {
        return _jsx(Slide, { ...props, footer: footer, header: header });
    }, []);
    const __components = {
        Slide: SlideWrapWithFooter,
        ...components,
    };
    return { ...__components };
};
export default mdxComponents;
