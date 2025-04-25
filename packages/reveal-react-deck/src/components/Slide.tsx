import { useAnimate } from "framer-motion";
import React, { useEffect } from "react";
import {
  SectionScopeProvider,
  useSectionContext,
} from "@/context/SectionScopeProvider";
import { DummyFragments } from "./DummyFragment";

interface Frontmatter {
  title?: string;
  subtitle?: string;
  index?: number;
  layout?: string;
  animateEntry?: boolean;
  reveal?: Record<string, any>;
  hidden?: boolean;
  fragments?: number;
}

interface SlideProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

function SlideTemplate({
  children,
  frontmatter = {},
  className,
  ...props
}: SlideProps & { className?: string }) {
  const [scope, animate] = useAnimate();

  if (frontmatter.animateEntry) {
    const { isPresent } = useSectionContext();
    useEffect(() => {
      if (isPresent) {
        animate(
          scope.current,
          {
            opacity: [0, 1],
            scale: [0, 1],
          },
          {},
        );
      }
    }, [isPresent]);
  }

  return (
    <div
      ref={scope}
      data-slide-content
      data-slide-layout={frontmatter.layout || "default"}
      className={className}
      {...props}
    >
      {frontmatter.fragments && <DummyFragments n={frontmatter.fragments} />}
      {children}
    </div>
  );
}

const Slide: React.FC<SlideProps> = ({
  frontmatter,
  children,
  footer,
  header,
}) => {
  // Use frontmatter data as needed
  if (frontmatter.hidden) {
    return null;
  }
  return (
    <SectionScopeProvider {...frontmatter.reveal}>
      {/* Optionally render frontmatter content */}
      {header}
      {frontmatter.layout !== "full" && frontmatter.layout !== "hero" && (
        <div data-slide-title>
          <div>
            <h1 dangerouslySetInnerHTML={{ __html: frontmatter.title || "" }} />
            {frontmatter.subtitle && (
              <h2 dangerouslySetInnerHTML={{ __html: frontmatter.subtitle }} />
            )}
          </div>
        </div>
      )}
      <SlideTemplate frontmatter={frontmatter}>{children}</SlideTemplate>
      {footer}
    </SectionScopeProvider>
  );
};

export { Slide };

export type { Frontmatter, SlideProps };
