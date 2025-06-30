import React, { isValidElement, useCallback } from "react";
import { Options } from "@/config";
import { Slide } from "./Slide";
import { Footer, Header } from "./Header";
import Video from "./Video";
import OnFragment from "./OnFragment";
import { DummyFragments } from "./DummyFragment";
import { Conclusion } from "./Conclusion";
import { Card } from "./Card";
import { Ref } from "./Refs";
import { Img, ImgHTML } from "./Img";
import { Overlay } from "./Overlay";
import { Admonition } from "./Admonition";
import { Tabs } from "./Tabs";

export { SlideNumber } from "./SlideNumber";

const components = {
  Admonition,
  Video,
  OnFragment,
  DummyFragments,
  Fragment: (props) => <div className="fragment" {...props} />,
  Conclusion,
  Overlay,
  Card,
  Ref,
  code: (props: any) => {
    return <code {...props} className={`language-${props.className}`} />;
  },
  img: ImgHTML,
  Img,
  Tabs,
};

export type MDXProvidedComponents = typeof components;

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

  const __components = {
    Slide: SlideWrapWithFooter,
    ...components,
  };

  return { ...__components };
};

export default mdxComponents;
