import { createContext, useContext, useEffect, useState, useRef } from "react";

// Create a context to store the present status
const SectionContext = createContext({
  isPresent: false,
  id: "",
  fragment: 0,
});

// The parent component
const SectionScopeProvider: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
> = ({ children, ...props }) => {
  const [isPresent, setIsPresent] = useState(false);
  const [id, setId] = useState("");
  const [fragment, setFragment] = useState(-1);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateContext = () => {
      const sectionElement = sectionRef.current;
      if (!sectionElement) return;

      const hasPresentClass = sectionElement.classList.contains("present");
      setIsPresent(hasPresentClass);
      setId(sectionElement.id);
      setFragment(
        sectionElement.hasAttribute("data-fragment")
          ? Number(sectionElement.getAttribute("data-fragment"))
          : -1,
      );
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

  return (
    <SectionContext.Provider value={{ isPresent, id, fragment }}>
      <section ref={sectionRef} className="h-full" {...props}>
        {children}
      </section>
    </SectionContext.Provider>
  );
};

// Custom hook to use the context
const useSectionContext = () => useContext(SectionContext);

export { SectionScopeProvider, useSectionContext };
