declare const SectionScopeProvider: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>>;
declare const useSectionContext: () => {
    isPresent: boolean;
    id: string;
    fragment: number;
    references: string[];
    setReferences: (_: string[]) => void;
};
export { SectionScopeProvider, useSectionContext };
//# sourceMappingURL=SectionScopeProvider.d.ts.map