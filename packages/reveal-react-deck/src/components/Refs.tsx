import React, { useEffect } from "react";
import { useBibStore } from "@/hooks/useBibtex";
import { normalizeFieldValue } from "bibtex";

export const Refs = ({ refs }: { refs: string[] }) => {
  const [refsList, setRefsList] = React.useState<React.ReactNode[]>([]);
  const bib = useBibStore((s) => s.refs);

  useEffect(() => {
    if (!bib) {
      return;
    }

    setRefsList(
      refs.map((ref) => {
        const refItem = bib.getEntry(ref.replace(/@/, ""));
        if (!refItem) {
          return <li key={ref}>{ref}</li>;
        }
        const author = refItem.getField("author");
        // @ts-expect-error
        const authorList = author.authors$.map((author) => author.lastNames);
        const journal =
          normalizeFieldValue(refItem.getField("journal")) || "arXiv";
        const year = normalizeFieldValue(refItem.getField("year"));
        return (
          <li key={ref}>
            <i>{authorList[0]} et al.</i>, <b>{journal}</b>, {year}
          </li>
        );
      }),
    );
  }, [bib]);

  return (
    <div className="absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50">
      <ol>{refsList}</ol>
    </div>
  );
};
