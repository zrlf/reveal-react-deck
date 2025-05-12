import { parseBibFile } from "bibtex";
import { useEffect } from "react";
import { create } from "zustand";
const useBibStore = create((set) => ({
    refs: null,
    fetchBibFile: (url) => {
        useEffect(() => {
            const fetchBibFile = async () => {
                try {
                    const response = await fetch(url);
                    const text = await response.text();
                    // remove month field from bib file because it can not be parsed
                    const modifiedText = text
                        .split("\n")
                        .filter((line) => !line.trim().startsWith("month = "))
                        .join("\n");
                    set({ refs: parseBibFile(modifiedText) });
                }
                catch (error) {
                    console.error("Error fetching bib file:", error);
                }
            };
            fetchBibFile();
        }, [url]);
    },
}));
export { useBibStore };
