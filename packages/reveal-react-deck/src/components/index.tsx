// import { cn } from "@/utils";
// import { normalizeFieldValue } from "bibtex";
import { MDXComponents } from "mdx/types";
import React, { isValidElement, useCallback, useEffect } from "react";
import { Slide } from "./Slide";
import { Options } from "@/config";
import { Footer, Header } from "./Header";
import Video from "./Video";
import OnFragment from "./OnFragment";
import { DummyFragments } from "./DummyFragment";
// import { Conclusion } from "./components/Conclusion";
// import { Footer, Header } from "./components/Footer";
// import { OnFragment } from "./components/OnFragment";
// import { useSectionContext } from "./hooks/SectionScopeProvider";
// import { useBibStore } from "./hooks/useBibtex";
// import { Options } from "./types";
// import { ImageRow } from "./components/ImageRow";

export { SlideNumber } from "./SlideNumber";

const mdxComponents = (options: Options) => {
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

  const SlideWrapWithFooter = useCallback((props: any) => {
    return <Slide {...props} footer={footer} header={header} />;
  }, []);

  const components = {
    Slide: SlideWrapWithFooter,
    Video,
    OnFragment,
    DummyFragments,
    code: (props: any) => {
      return <code {...props} className={`language-${props.className}`} />;
    },
  };

  return { ...components };
};

export default mdxComponents;
