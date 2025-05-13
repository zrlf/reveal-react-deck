import { visit } from 'unist-util-visit';
import { parse } from 'acorn';

export default function remarkImgAutoImport() {
  return (tree: any) => {
    let i = 0;
    const importNodes: Array<any> = [];

    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      if (node.name !== 'Img') return;

      const attrIdx = (node.attributes || []).findIndex(
        (a: any) => a.type === 'mdxJsxAttribute' && a.name === 'src'
      );
      if (attrIdx === -1) return;

      const srcAttr = node.attributes[attrIdx];
      if (typeof srcAttr.value !== 'string') return;               // skip dynamic

      const id  = `__img${i++}`;
      const rel = srcAttr.value;                                   // "./fig.png"

      /* ---------- 1 · add real import ---------- */
      const importCode = `import ${id} from ${JSON.stringify(rel)};`;
      importNodes.push({
        type: 'mdxjsEsm',
        value: importCode,
        data: { estree: parse(importCode, { ecmaVersion: 2020, sourceType: 'module' }) },
      });

      /* ---------- 2 · replace src attr ---------- */
      const estreeExpr = parse(id, { ecmaVersion: 2020 });         // Program → expr
      srcAttr.value = {
        type: 'mdxJsxAttributeValueExpression',
        value: id,
        data: { estree: estreeExpr },
      };
    });

    if (importNodes.length) tree.children.unshift(...importNodes);
  };
}
