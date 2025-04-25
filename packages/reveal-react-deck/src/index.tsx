import { useDeckStore } from "@/hooks/useDeck";
import { useCallback, useEffect, useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm";
import mdxComponents from "@/components";

import "katex/dist/katex.css";
import { Slide } from "./components/Slide";
import { Options } from "./config";

interface RevealEvent extends Event {
  previousSlide: HTMLElement;
  currentSlide: HTMLElement;
  indexh: number;
  indexv: number;
}

export interface SlideFile {
  default: React.FC; // MDXComponent
  frontmatter: {
    order?: number;
    title?: string;
    hidden?: boolean;
    [key: string]: any;
  };
}

const Slides = ({
  slides,
  revealRef,
}: {
  slides: SlideFile[];
  revealRef: any;
}) => {
  const currentSlide = useDeckStore().currentSlide;
  const currentFragment = useDeckStore().currentFragment;

  useEffect(() => {
    if (revealRef.current) {
      revealRef.current.sync();
      revealRef.current.slide(currentSlide, 0, currentFragment[currentSlide]);
    }
  }, [revealRef, slides]);

  return (
    <>
      {slides.map((SlideContent, index) => {
        return <SlideContent.default key={index} />;
      })}
    </>
  );
};

function RevealSlides({
  slides,
  options,
  revealOptions,
}: {
  slides: SlideFile[];
  options?: Options;
  revealOptions?: Reveal.Options;
}) {
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);

  useReveal({
    options: revealOptions,
    deckDivRef,
    deckRef,
  });

  return (
    <div className="reveal" ref={deckDivRef}>
      <MDXProvider components={mdxComponents(options || {})}>
        <div className="slides">
          <Slides slides={slides} revealRef={deckRef} />
        </div>
      </MDXProvider>
    </div>
  );
}

const useReveal = ({
  options,
  deckDivRef,
  deckRef,
}: {
  options?: any;
  deckDivRef: React.RefObject<HTMLDivElement | null>;
  deckRef: React.MutableRefObject<Reveal.Api | null>;
}) => {
  // Load zustand store
  const deckStore = useDeckStore((s) => s);

  useEffect(() => {
    if (deckRef.current) return;
    if (!deckDivRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current, {
      ...options,
    });

    deckRef.current.initialize({
      plugins: [RevealHighlight],
    }).then(() => {
      const deck = deckRef.current!;
      deckStore.setDeck(deck);
      deck.on("overviewshown", () => {
        useDeckStore.setState({ isOverview: true });
        window.localStorage.setItem("isOverview", "true");
      });
      deck.on("overviewhidden", () => {
        useDeckStore.setState({ isOverview: false });
        window.localStorage.setItem("isOverview", "false");
      });
      deck.on("slidechanged", (_event: Event) => {
        const event = _event as RevealEvent;
        deckStore.setCurrentSlide(event.indexh, event.currentSlide.id);
      });
      deck.on("fragmentshown", (_event: Event) => {
        const event = _event as Event & { fragment: HTMLElement };
        let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex!);
        deckStore.setFragmentCurrentSlide(fragmentIndex + 1);
      });
      deck.on("fragmenthidden", (_event: Event) => {
        const event = _event as Event & { fragment: HTMLElement };
        let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex!);
        deckStore.setFragmentCurrentSlide(fragmentIndex);
      });
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed");
      }
    };
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "B") {
      deckDivRef.current
        ?.querySelector(".slides")!
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
