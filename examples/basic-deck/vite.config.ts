import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypeKatex from "rehype-katex";
import rehypeMdxImportMedia from "rehype-mdx-import-media";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeUnwrap from "reveal-react-deck/plugins/remark-slides.js";
import remarkSlides from "reveal-react-deck/plugins/remark-slides.js";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
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
        ,
        react(),
        tailwindcss(),
    ],
});
