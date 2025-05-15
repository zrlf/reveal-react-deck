import {visit} from 'unist-util-visit'

export default function rehypeRemoveLonelyParagraph() {
  return (tree: any) => {
    visit(tree, 'element', (node, _i, parent) => {
      if (
        node.tagName === 'p' &&          // it’s a <p>
        parent?.type === 'element' &&    // parent is an element
        parent.children.length === 1     // and it’s the only child
      ) {
        parent.children = node.children  // lift its children up
      }
    })
  }
}
