import React from "react";
interface Frontmatter {
    title?: string;
    subtitle?: string;
    index?: number;
    layout?: string;
    animateEntry?: boolean;
    reveal?: Record<string, any>;
    hidden?: boolean;
    fragments?: number;
    dark?: boolean;
    className?: string;
    sectionClassName?: string;
    backup?: boolean;
}
interface SlideProps {
    frontmatter: Frontmatter;
    children: React.ReactNode;
    footer?: React.ReactNode;
    header?: React.ReactNode;
}
declare const Slide: React.FC<SlideProps>;
export { Slide };
export type { Frontmatter, SlideProps };
//# sourceMappingURL=Slide.d.ts.map