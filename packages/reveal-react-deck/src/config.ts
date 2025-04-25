import Reveal from "reveal.js";

export type RevealOptions = Reveal.Options;

export interface Options {
    bibFile?: string;
    mdxComponents?: {};
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
