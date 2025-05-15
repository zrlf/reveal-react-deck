import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@mdx-js/rollup";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
// import remarkSlides from "reveal-react-deck/plugins/remark-slides";
// import remarkImgAutoImport from "reveal-react-deck/plugins/remark-img-auto-import";
// import rehypeRemoveLonelyParagraph from "reveal-react-deck/plugins/rehype-remove-lonely-p";
//
import { remarkSlides, remarkImgAutoImport, rehypeRemoveLonelyParagraph } from "reveal-react-deck/plugins";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "frontmatter" }],
        remarkSlides,
        remarkImgAutoImport,
        remarkGfm,
        remarkMath,
      ],
      rehypePlugins: [
        rehypeRemoveLonelyParagraph,
        rehypeKatex,
        [rehypePrettyCode, { theme: "vitesse-dark" }],
      ],
      providerImportSource: "@mdx-js/react",
      jsxImportSource: "react",
    }),
    react(),
    tailwindcss(),
  ],
});
