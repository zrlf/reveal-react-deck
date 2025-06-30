import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Refs } from "../components/Refs.js";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useBibStore } from "../hooks/useBibtex.js";
import { cn } from "../utils.js";
// Create a context to store the present status
const SectionContext = createContext({
    isPresent: false,
    id: "",
    fragment: 0,
    references: [],
    setReferences: (_) => { },
});
// The parent component
const SectionScopeProvider = ({ children, className, ...props }) => {
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
    return (_jsx(SectionContext.Provider, { value: { isPresent, id, fragment, references, setReferences }, children: _jsxs("section", { ref: sectionRef, className: cn("h-full", className), ...props, children: [children, _jsx(Refs, { references: references, bib: bib })] }) }));
};
// Custom hook to use the context
const useSectionContext = () => useContext(SectionContext);
export { SectionScopeProvider, useSectionContext };
