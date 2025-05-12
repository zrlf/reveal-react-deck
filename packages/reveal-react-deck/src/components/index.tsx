import React, { isValidElement, useCallback } from "react";
import { Slide } from "./Slide";
import { Options } from "@/config";
import { Footer, Header } from "./Header";
import Video from "./Video";
import OnFragment from "./OnFragment";
import { DummyFragments } from "./DummyFragment";
import { Conclusion } from "./Conclusion";
import { Card } from "./Card";
import { Refs } from "./Refs";
import { Image } from "./Image";

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
    Conclusion,
    Card,
    Refs,
    code: (props: any) => {
      return <code {...props} className={`language-${props.className}`} />;
    },
    img: Image,
  };

  return { ...components };
};

export default mdxComponents;
