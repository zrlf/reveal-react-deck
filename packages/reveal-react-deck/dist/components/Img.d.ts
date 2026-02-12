import React from "react";
type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
    /** The image URL injected by our remark plugin */
    src?: string;
    realSrc?: string;
    caption?: string;
    containerClass?: string;
    fillHeight?: boolean;
    lazy?: boolean;
    children?: React.ReactNode;
};
export default function Img({ children, src, realSrc, caption, containerClass, fillHeight, lazy, ...rest }: ImgProps): import("react/jsx-runtime").JSX.Element;
type ImgHTMLProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    alt?: string;
    title?: string;
};
declare const ImgHTML: (props: ImgHTMLProps) => import("react/jsx-runtime").JSX.Element;
type ImageRowProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};
declare const ImageRow: (props: ImageRowProps) => import("react/jsx-runtime").JSX.Element;
export { Img, ImgHTML, ImageRow };
//# sourceMappingURL=Img.d.ts.map