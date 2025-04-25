import { visit } from "unist-util-visit";
export default function rehypeRemoveWrappingP() {
    return (tree) => {
        visit(tree, "element", (node, index, parent) => {
            if (!parent || typeof index !== "number")
                return;
            const tag = node.tagName;
            if (tag !== "p")
                return;
            const nonTextChildren = node.children.filter((child) => child.type === "element");
            // Case 1: <p><div/><element/></p> -> wrap in div
            if (nonTextChildren.length === 2 &&
                ["div", "img", "video"].includes(nonTextChildren[0].tagName)) {
                parent.children.splice(index, 1, {
                    type: "element",
                    tagName: "div",
                    properties: { style: "height: 100%" },
                    children: node.children,
                });
                return;
            }
            if (node.tagName === "p" &&
                node.children.length === 1 &&
                ["div", "img", "video"].includes(node.children[0]?.tagName)) {
                // Replace the <p> node with its child
                if (parent && typeof index === "number") {
                    parent.children.splice(index, 1, node.children[0]);
                }
            }
        });
    };
}
