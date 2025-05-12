// plugins/remark-class-marker.js
import { visit, SKIP } from 'unist-util-visit';
export default function remarkClassMarker() {
    return (tree) => {
        visit(tree, 'paragraph', (node, index, parent) => {
            if (!parent)
                return;
            const markerRE = /^%%([\w\s-]+)%%$/;
            /* ---------------------------------------------------------- *
             * 1. Stand-alone marker paragraph                            *
             * ---------------------------------------------------------- */
            if (node.children.length === 1 &&
                node.children[0].type === 'text' &&
                markerRE.test(node.children[0].value.trim())) {
                const classes = node.children[0].value.trim().match(markerRE)[1].split(/\s+/);
                const prev = parent.children[index ? index - 1 : 0];
                if (prev)
                    attachClasses(prev, classes);
                parent.children.splice(index, 1); // remove marker paragraph
                return [SKIP, index];
            }
            /* ---------------------------------------------------------- *
             * 2. Inline marker at end of the same paragraph              *
             * ---------------------------------------------------------- */
            const last = node.children[node.children.length - 1];
            if (last?.type === 'text' &&
                /\s*%%([\w\s-]+)%%\s*$/.test(last.value)) {
                const classes = last.value.match(/\s*%%([\w\s-]+)%%\s*$/)[1].split(/\s+/);
                last.value = last.value.replace(/\s*%%[\w\s-]+%%\s*$/, '');
                // if the paragraph ends with an image + marker → class on the image
                const maybeImg = node.children[node.children.length - 2];
                if (maybeImg?.type === 'image') {
                    attachClasses(maybeImg, classes);
                }
                else {
                    attachClasses(node, classes);
                }
            }
        });
    };
}
/* helper */
function attachClasses(node, classes) {
    node.data ??= {};
    node.data.hProperties ??= {};
    const existing = node.data.hProperties.className ?? [];
    node.data.hProperties.className = [...new Set([...(Array.isArray(existing) ? existing : [existing]), ...classes])];
}
