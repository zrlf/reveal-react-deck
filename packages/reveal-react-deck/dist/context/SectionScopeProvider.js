import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Refs } from "../components/Refs.js";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useBibStore } from "../hooks/useBibtex.js";
// Create a context to store the present status
const SectionContext = createContext({
    isPresent: false,
    id: "",
    fragment: 0,
    overlayRef: null,
    references: [],
    setReferences: (_) => { },
});
// The parent component
const SectionScopeProvider = ({ children, ...props }) => {
    const [isPresent, setIsPresent] = useState(false);
    const [id, setId] = useState("");
    const [fragment, setFragment] = useState(-1);
    const [references, setReferences] = useState([]);
    const sectionRef = useRef(null);
    const bib = useBibStore((s) => s.refs);
    useEffect(() => {
        const updateContext = () => {
            const sectionElement = sectionRef.current;
            if (!sectionElement)
                return;
            const hasPresentClass = sectionElement.classList.contains("present");
            setIsPresent(hasPresentClass);
            setId(sectionElement.id);
            setFragment(sectionElement.hasAttribute("data-fragment")
                ? Number(sectionElement.getAttribute("data-fragment"))
                : -1);
        };
        if (sectionRef.current) {
            // Check if it has className "present"
            updateContext();
            // Use MutationObserver to watch for class changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === "attributes" && sectionRef.current) {
                        updateContext();
                    }
                });
            });
            observer.observe(sectionRef.current, {
                attributes: true,
                attributeFilter: ["class", "data-fragment"],
            });
            // Clean up
            return () => {
                observer.disconnect();
            };
        }
    }, []);
    const overlayRef = useRef(null);
    return (_jsx(SectionContext.Provider, { value: { isPresent, id, fragment, overlayRef, references, setReferences }, children: _jsxs("section", { ref: sectionRef, className: "h-full", ...props, children: [children, _jsx("div", { ref: overlayRef, className: "absolute inset-0 pointer-events-none" }), _jsx(Refs, { references: references, bib: bib })] }) }));
};
// Custom hook to use the context
const useSectionContext = () => useContext(SectionContext);
export { SectionScopeProvider, useSectionContext };
