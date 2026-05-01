import Reveal from "reveal.js";

export type RevealOptions = Reveal.Options;

export interface Options {
    bibFile?: string;
    mdxComponents?: Record<string, React.ComponentType<any>>;
    footer?: {
        left?: React.ReactNode;
        right?: React.ReactNode;
    };
    header?: {
        left?: React.ReactNode;
        right?: React.ReactNode;
    };
    colors?: {
        titleBackground: string;
        titleColor: string;
        subtitleColor: string;
    };
}
