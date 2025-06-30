import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { normalizeFieldValue } from "bibtex";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import React from "react";
export const Ref = ({ id }) => {
    const [index, setIndex] = useState([]);
    const { references, setReferences } = useSectionContext();
    useEffect(() => {
        const ids = Array.isArray(id) ? id : [id];
        const newIndexes = [];
        let updatedReferences = [...references];
        for (const refId of ids) {
            const refIdStr = refId.replace(/@/, "");
            let idx = updatedReferences.indexOf(refIdStr);
            if (idx === -1) {
                updatedReferences = [refIdStr, ...updatedReferences];
                idx = updatedReferences.length - 1;
            }
            newIndexes.push(idx);
        }
        if (updatedReferences.length !== references.length) {
            setReferences(updatedReferences);
        }
        setIndex(newIndexes);
    }, [id, references, setReferences]);
    return (_jsx("span", { className: "text-xs text-foreground/50 align-super", "data-ref": Array.isArray(id) ? id.join(",") : id, "data-index": index.join(","), children: index.map((s) => s + 1).join(",") }));
};
function getRefString(id, bib) {
    const refItem = bib.getEntry(id.replace(/@/, ""));
    if (!refItem) {
        return _jsx("li", { children: id }, id);
    }
    const author = refItem.getField("author");
    // @ts-expect-error
    const authorList = author.authors$.map((author) => author.lastNames);
    const journal = normalizeFieldValue(refItem.getField("journal")) || "arXiv";
    const year = normalizeFieldValue(refItem.getField("year"));
    return (_jsxs("li", { children: [_jsxs("i", { children: [authorList[0], " et al."] }), ", ", _jsx("b", { children: journal }), ", ", year] }, id));
}
export const Refs = ({ references, bib, }) => {
    const [refsList, setRefsList] = React.useState([]);
    const getRefStringMemo = React.useCallback(getRefString, [bib]);
    useEffect(() => {
        setRefsList(references.map((ref) => {
            if (!ref) {
                return;
            }
            if (!bib) {
                return _jsx("li", { children: ref }, ref);
            }
            return getRefStringMemo(ref, bib);
        }));
    }, [bib, references]);
    return (_jsx("div", { className: "reference-container absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50 [&_ol]:leading-tight", children: _jsx("ol", { children: refsList }) }));
};
