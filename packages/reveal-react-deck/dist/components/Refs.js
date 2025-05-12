import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import { useBibStore } from "../hooks/useBibtex.js";
import { normalizeFieldValue } from "bibtex";
export const Refs = ({ refs }) => {
    const [refsList, setRefsList] = React.useState([]);
    const bib = useBibStore((s) => s.refs);
    useEffect(() => {
        if (!bib) {
            return;
        }
        setRefsList(refs.map((ref) => {
            const refItem = bib.getEntry(ref.replace(/@/, ""));
            if (!refItem) {
                return _jsx("li", { children: ref }, ref);
            }
            const author = refItem.getField("author");
            // @ts-expect-error
            const authorList = author.authors$.map((author) => author.lastNames);
            const journal = normalizeFieldValue(refItem.getField("journal")) || "arXiv";
            const year = normalizeFieldValue(refItem.getField("year"));
            return (_jsxs("li", { children: [_jsxs("i", { children: [authorList[0], " et al."] }), ", ", _jsx("b", { children: journal }), ", ", year] }, ref));
        }));
    }, [bib]);
    return (_jsx("div", { className: "absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50", children: _jsx("ol", { children: refsList }) }));
};
