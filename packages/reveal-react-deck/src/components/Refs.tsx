import { useEffect, useState } from "react";
import { BibFilePresenter, normalizeFieldValue } from "bibtex";
import { useSectionContext } from "@/context/SectionScopeProvider";
import React from "react";

export const Ref = ({ id }: { id: string }) => {
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

  return (
    <span
      className="text-xs text-foreground/50 align-super"
      data-ref={id}
      data-index={index}
    >
      {index + 1}
    </span>
  );
};

function getRefString(id: string, bib: BibFilePresenter) {
  const refItem = bib.getEntry(id.replace(/@/, ""));
  if (!refItem) {
    return <li key={id}>{id}</li>;
  }
  const author = refItem.getField("author");
  // @ts-expect-error
  const authorList = author.authors$.map((author) => author.lastNames);
  const journal = normalizeFieldValue(refItem.getField("journal")) || "arXiv";
  const year = normalizeFieldValue(refItem.getField("year"));
  return (
    <li key={id}>
      <i>{authorList[0]} et al.</i>, <b>{journal}</b>, {year}
    </li>
  );
}

export const Refs = ({
  references,
  bib,
}: {
  references: string[];
  bib: BibFilePresenter | null;
}) => {
  const [refsList, setRefsList] = React.useState<React.ReactNode[]>([]);
  const getRefStringMemo = React.useCallback(getRefString, [bib]);

  useEffect(() => {
    setRefsList(
      references.map((ref) => {
        if (!ref) {
          return;
        }
        if (!bib) {
          return <li key={ref}>{ref}</li>;
        }
        return getRefStringMemo(ref, bib);
      }),
    );
  }, [bib, references]);

  return (
    <div className="absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50">
      <ol>{refsList}</ol>
    </div>
  );
};
