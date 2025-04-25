import { jsx as _jsx } from "react/jsx-runtime";
import { isValidElement, useCallback } from "react";
import { Slide } from "./Slide.js";
import { Footer, Header } from "./Header.js";
import Video from "./Video.js";
import OnFragment from "./OnFragment.js";
import { DummyFragments } from "./DummyFragment.js";
// import { Conclusion } from "./components/Conclusion";
// import { Footer, Header } from "./components/Footer";
// import { OnFragment } from "./components/OnFragment";
// import { useSectionContext } from "./hooks/SectionScopeProvider";
// import { useBibStore } from "./hooks/useBibtex";
// import { Options } from "./types";
// import { ImageRow } from "./components/ImageRow";
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
        code: (props) => {
            return _jsx("code", { ...props, className: `language-${props.className}` });
        },
    };
    return { ...components };
};
export default mdxComponents;
