import { useEffect, useState } from "react";
import { BibFilePresenter, normalizeFieldValue } from "bibtex";
import { useSectionContext } from "@/context/SectionScopeProvider";
import React from "react";

export const Ref = ({ id }: { id: string | string[] }) => {
  const [index, setIndex] = useState<number[]>([]);
  const { references, setReferences } = useSectionContext();

  useEffect(() => {
    const ids = Array.isArray(id) ? id : [id];

    const newIndexes: number[] = [];

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

  return (
    <span
      className="text-xs text-foreground/50 align-super"
      data-ref={Array.isArray(id) ? id.join(",") : id}
      data-index={index.join(",")}
    >
      {index.map((s) => s + 1).join(",")}
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
    <div className="reference-container absolute bottom-0 left-0 mx-4 my-0 text-xs text-foreground/50 [&_ol]:leading-tight">
      <ol>{refsList}</ol>
    </div>
  );
};
