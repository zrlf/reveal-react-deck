import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement, useCallback } from "react";
import { Slide } from "./Slide.js";
import { Footer, Header } from "./Header.js";
import Video from "./Video.js";
import OnFragment from "./OnFragment.js";
import { DummyFragments } from "./DummyFragment.js";
import { Conclusion } from "./Conclusion.js";
import { Card } from "./Card.js";
import { Refs } from "./Refs.js";
import { Image } from "./Image.js";
export { SlideNumber } from "./SlideNumber.js";
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
    const components = {
        Slide: SlideWrapWithFooter,
        Video,
        OnFragment,
        DummyFragments,
        Conclusion,
        Card,
        Refs,
        code: (props) => {
            return _jsx("code", { ...props, className: `language-${props.className}` });
        },
        img: Image,
    };
    return { ...components };
};
export default mdxComponents;
