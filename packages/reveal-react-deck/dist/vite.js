import mdx from "@mdx-js/rollup";
import rehypeKatex from "rehype-katex";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeUnwrap from "./plugins/rehype-unwrap.js";
import remarkSlides from "./plugins/remark-slides.js";
export default function RevealPreset() {
    return [
        mdx({
            remarkPlugins: [
                remarkFrontmatter,
                [remarkMdxFrontmatter, { name: "frontmatter" }],
                remarkSlides,
                remarkGfm,
                remarkMath,
            ],
            rehypePlugins: [
                rehypeUnwrap,
                rehypeMdxImportMedia,
                rehypeKatex,
                [rehypePrettyCode, { theme: "vitesse-dark" }],
            ],
            providerImportSource: "@mdx-js/react",
        }),
    ];
}
