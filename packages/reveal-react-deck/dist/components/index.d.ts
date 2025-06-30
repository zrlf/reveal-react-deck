import React from "react";
import { Options } from "../config.js";
import { Img } from "./Img.js";
export { SlideNumber } from "./SlideNumber.js";
declare const components: {
    Admonition: (props: {
        type: string;
        iconType?: string;
        title?: string;
        hideTitle?: boolean;
        contentClasses?: string;
        className?: string;
        children: React.ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
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
    Fragment: (props: any) => import("react/jsx-runtime").JSX.Element;
    Conclusion: ({ children, fragment, className, }: {
        children: React.ReactNode;
        fragment?: boolean;
        className: string;
    }) => import("react/jsx-runtime").JSX.Element;
    Overlay: ({ children, variant, fragment, className, ...props }: {
        children: React.ReactNode;
        variant?: "none" | "conclusion" | "centered";
        fragment?: boolean;
        className?: string;
        props?: React.HTMLProps<HTMLDivElement>;
    }) => import("react/jsx-runtime").JSX.Element;
    Card: ({ children, className, ...props }: {
        children: React.ReactNode;
    } & React.ComponentProps<"div">) => import("react/jsx-runtime").JSX.Element;
    Ref: ({ id }: {
        id: string | string[];
    }) => import("react/jsx-runtime").JSX.Element;
    code: (props: any) => import("react/jsx-runtime").JSX.Element;
    img: (props: any) => import("react/jsx-runtime").JSX.Element;
    Img: typeof Img;
    Tabs: ({ children, breakpoints, className, }: {
        children: React.ReactNode;
        breakpoints: number[];
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
};
export type MDXProvidedComponents = typeof components;
declare const mdxComponents: (options: Options) => {
    Admonition: (props: {
        type: string;
        iconType?: string;
        title?: string;
        hideTitle?: boolean;
        contentClasses?: string;
        className?: string;
        children: React.ReactNode;
    }) => import("react/jsx-runtime").JSX.Element;
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
    Fragment: (props: any) => import("react/jsx-runtime").JSX.Element;
    Conclusion: ({ children, fragment, className, }: {
        children: React.ReactNode;
        fragment?: boolean;
        className: string;
    }) => import("react/jsx-runtime").JSX.Element;
    Overlay: ({ children, variant, fragment, className, ...props }: {
        children: React.ReactNode;
        variant?: "none" | "conclusion" | "centered";
        fragment?: boolean;
        className?: string;
        props?: React.HTMLProps<HTMLDivElement>;
    }) => import("react/jsx-runtime").JSX.Element;
    Card: ({ children, className, ...props }: {
        children: React.ReactNode;
    } & React.ComponentProps<"div">) => import("react/jsx-runtime").JSX.Element;
    Ref: ({ id }: {
        id: string | string[];
    }) => import("react/jsx-runtime").JSX.Element;
    code: (props: any) => import("react/jsx-runtime").JSX.Element;
    img: (props: any) => import("react/jsx-runtime").JSX.Element;
    Img: typeof Img;
    Tabs: ({ children, breakpoints, className, }: {
        children: React.ReactNode;
        breakpoints: number[];
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
    Slide: (props: any) => import("react/jsx-runtime").JSX.Element;
};
export default mdxComponents;
//# sourceMappingURL=index.d.ts.map