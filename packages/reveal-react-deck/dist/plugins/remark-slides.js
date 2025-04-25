import yaml from "js-yaml";
import { valueToEstree } from "estree-util-value-to-estree";
function remarkSlides() {
    return (tree) => {
        const slides = [];
        const esmNodes = [];
        let currentSlide = null;
        // Iterate over the tree's children nodes
        for (let index = 0; index < tree.children.length; index++) {
            const node = tree.children[index];
            // Collect frontmatter nodes and do nothing -> they are already handled by remark-mdx-frontmatter
            if (node.type === "yaml") {
                continue;
            }
            // Collect mdxjsEsm nodes (import/export statements)
            if (node.type === "mdxjsEsm") {
                esmNodes.push(node);
                continue;
            }
            // Check if the node is a code block with the language "slide"
            if (node.type === "code" && node.lang === "slide") {
                // Extract the text content of the paragraph
                // Extract the content inside the delimiters
                const frontmatterContent = node.value;
                // Parse the extracted content as YAML
                const frontmatter = yaml.load(frontmatterContent) || {};
                // Prepend "data-" to keys in frontmatter.reveal that don't start with "data-"
                if (frontmatter.reveal && typeof frontmatter.reveal === "object") {
                    frontmatter.reveal = Object.fromEntries(Object.entries(frontmatter.reveal).map(([key, value]) => [
                        key.startsWith("data-") ? key : `data-${key}`,
                        value,
                    ]));
                }
                // Start a new slide
                if (currentSlide) {
                    slides.push(currentSlide);
                }
                currentSlide = {
                    frontmatter,
                    children: [],
                };
                // Skip adding this node to the current slide's children
                continue;
            }
            // If no current slide, initialize one
            if (!currentSlide) {
                currentSlide = {
                    frontmatter: {},
                    children: [],
                };
            }
            // Add the node to the current slide's children
            currentSlide.children.push(node);
        }
        // Push the last slide if it exists
        if (currentSlide) {
            slides.push(currentSlide);
        }
        // Replace the tree's children with the slides
        tree.children = [
            ...esmNodes,
            ...slides.map((slide) => ({
                type: "mdxJsxFlowElement",
                name: "Slide",
                attributes: [
                    {
                        type: "mdxJsxAttribute",
                        name: "frontmatter",
                        value: {
                            type: "mdxJsxAttributeValueExpression",
                            value: "", // Placeholder
                            data: {
                                estree: {
                                    type: "Program",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: valueToEstree(slide.frontmatter),
                                        },
                                    ],
                                    sourceType: "module",
                                },
                            },
                        },
                    },
                ],
                children: slide.children,
            })),
        ];
    };
}
export default remarkSlides;
