import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

export default function rehypeRemoveLonelyParagraph() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, _i, parent) => {
      if (
        node.tagName === "p" &&
        parent?.type === "element" &&
        (parent as Element).children.length === 1
      ) {
        (parent as Element).children = node.children;
      }
    });
  };
}
