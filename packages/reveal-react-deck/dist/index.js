import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDeckStore } from "./hooks/useDeck.js";
import { useCallback, useEffect, useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm";
import mdxComponents from "./components/index.js";
import "katex/dist/katex.css";
const Slides = ({ slides, revealRef, }) => {
    const currentSlide = useDeckStore().currentSlide;
    const currentFragment = useDeckStore().currentFragment;
    useEffect(() => {
        if (revealRef.current) {
            revealRef.current.sync();
            revealRef.current.slide(currentSlide, 0, currentFragment[currentSlide]);
        }
    }, [revealRef, slides]);
    return (_jsx(_Fragment, { children: slides.map((SlideContent, index) => {
            return _jsx(SlideContent.default, {}, index);
        }) }));
};
function RevealSlides({ slides, options, revealOptions, }) {
    const deckDivRef = useRef(null);
    const deckRef = useRef(null);
    useReveal({
        options: revealOptions,
        deckDivRef,
        deckRef,
    });
    return (_jsx("div", { className: "reveal", ref: deckDivRef, children: _jsx(MDXProvider, { components: mdxComponents(options || {}), children: _jsx("div", { className: "slides", children: _jsx(Slides, { slides: slides, revealRef: deckRef }) }) }) }));
}
const useReveal = ({ options, deckDivRef, deckRef, }) => {
    // Load zustand store
    const deckStore = useDeckStore((s) => s);
    useEffect(() => {
        if (deckRef.current)
            return;
        if (!deckDivRef.current)
            return;
        deckRef.current = new Reveal(deckDivRef.current, {
            ...options,
        });
        deckRef.current.initialize({
            plugins: [RevealHighlight],
        }).then(() => {
            const deck = deckRef.current;
            deckStore.setDeck(deck);
            deck.on("overviewshown", () => {
                useDeckStore.setState({ isOverview: true });
                window.localStorage.setItem("isOverview", "true");
            });
            deck.on("overviewhidden", () => {
                useDeckStore.setState({ isOverview: false });
                window.localStorage.setItem("isOverview", "false");
            });
            deck.on("slidechanged", (_event) => {
                const event = _event;
                deckStore.setCurrentSlide(event.indexh, event.currentSlide.id);
            });
            deck.on("fragmentshown", (_event) => {
                const event = _event;
                let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex);
                deckStore.setFragmentCurrentSlide(fragmentIndex + 1);
            });
            deck.on("fragmenthidden", (_event) => {
                const event = _event;
                let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex);
                deckStore.setFragmentCurrentSlide(fragmentIndex);
            });
        });
        return () => {
            try {
                if (deckRef.current) {
                    deckRef.current.destroy();
                    deckRef.current = null;
                }
            }
            catch (e) {
                console.warn("Reveal.js destroy call failed");
            }
        };
    }, []);
    const handleKeyPress = useCallback((event) => {
        if (event.key === "B") {
            deckDivRef.current
                ?.querySelector(".slides")
                .classList.toggle("slides-border");
        }
        if (event.key === "M") {
            deckStore.toggleMotion();
        }
    }, []);
    useEffect(() => {
        if (typeof window !== "undefined" && document) {
            // attach the event listener
            document.addEventListener("keydown", handleKeyPress);
            // remove the event listener
            return () => {
                document.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [handleKeyPress]);
};
export default RevealSlides;
