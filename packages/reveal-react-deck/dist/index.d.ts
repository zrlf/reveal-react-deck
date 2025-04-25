import Reveal from "reveal.js";
import "katex/dist/katex.css";
import { Options } from "./config.js";
export interface SlideFile {
    default: React.FC;
    frontmatter: {
        order?: number;
        title?: string;
        hidden?: boolean;
        [key: string]: any;
    };
}
declare function RevealSlides({ slides, options, revealOptions, }: {
    slides: SlideFile[];
    options?: Options;
    revealOptions?: Reveal.Options;
}): import("react/jsx-runtime").JSX.Element;
export default RevealSlides;
//# sourceMappingURL=index.d.ts.map