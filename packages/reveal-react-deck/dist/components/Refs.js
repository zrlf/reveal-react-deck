import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { normalizeFieldValue } from "bibtex";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import React from "react";
export const Ref = ({ id }) => {
    const [index, setIndex] = useState(0);
    const { references, setReferences } = useSectionContext();
    useEffect(() => {
        // get index of the id in refs
        let index = references.findIndex((ref) => ref === id);
        if (index == -1) {
            setReferences([id, ...references]);
            index = 0;
        }
        setIndex(index);
    }, [references]);
    return (_jsx("span", { className: "text-xs text-foreground/50 align-super", "data-ref": id, "data-index": index, children: index + 1 }));
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
    return (_jsx("div", { className: "absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50", children: _jsx("ol", { children: refsList }) }));
};
