import React from "react";
import { Options } from "../config.js";
export { SlideNumber } from "./SlideNumber.js";
declare const mdxComponents: (options: Options) => {
    Slide: (props: any) => import("react/jsx-runtime").JSX.Element;
    Video: ({ playOnFragment, playbackRate, ...props }: React.VideoHTMLAttributes<HTMLVideoElement> & {
        playOnFragment?: number;
        playbackRate?: number;
    }) => import("react/jsx-runtime").JSX.Element;
    OnFragment: ({ children, fragmentNumber, }: {
        children: React.ReactNode;
        fragmentNumber: number;
    }) => import("react/jsx-runtime").JSX.Element | null;
    DummyFragments: ({ n }: {
        n: number;
    }) => import("react/jsx-runtime").JSX.Element;
    Conclusion: ({ children, fragment, className, }: {
        children: React.ReactNode;
        fragment?: boolean;
        className: string;
    }) => import("react/jsx-runtime").JSX.Element;
    Card: ({ children, className, ...props }: {
        children: React.ReactNode;
    } & React.ComponentProps<"div">) => import("react/jsx-runtime").JSX.Element;
    Refs: ({ refs }: {
        refs: string[];
    }) => import("react/jsx-runtime").JSX.Element;
    code: (props: any) => import("react/jsx-runtime").JSX.Element;
    img: (props: any) => import("react/jsx-runtime").JSX.Element;
};
export default mdxComponents;
//# sourceMappingURL=index.d.ts.map