import { BibFilePresenter } from "bibtex";
interface BibStore {
    refs: BibFilePresenter | null;
    fetchBibFile: (url: string) => void;
}
declare const useBibStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BibStore>>;
export { useBibStore };
//# sourceMappingURL=useBibtex.d.ts.map