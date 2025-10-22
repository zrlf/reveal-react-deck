import { useDeckStore } from "@/hooks/useDeck";
import { useCallback, useEffect, useRef } from "react";
import { MDXProvider } from "@mdx-js/react";
import Reveal from "reveal.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm";
import mdxComponents from "@/components";
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

const Slides = ({ slides }: { slides: SlideFile[] }) => {
  useEffect(() => {
    const reveal = useDeckStore.getState().deck;
    if (reveal) {
      const { indexh, indexf } = reveal.getState();
      reveal.sync();
      reveal.slide(indexh, 0, indexf);
    }
  }, [slides]);

  return (
    <>
      {slides.map((SlideContent, index) => {
        if (SlideContent.frontmatter.hidden) return null;
        return <SlideContent.default key={index} />;
      })}
    </>
  );
};

function RevealSlides({
  slides,
  options,
  revealOptions,
  plugins = [RevealHighlight],
}: {
  slides: SlideFile[];
  options?: Options;
  revealOptions?: Reveal.Options;
  plugins?: Reveal.PluginFunction[];
}) {
  const deckDivRef = useRef<HTMLDivElement>(null);

  useReveal({
    options: revealOptions,
    deckDivRef,
    plugins,
  });

  return (
    <div className="reveal" ref={deckDivRef}>
      <MDXProvider components={mdxComponents(options || {})}>
        <div className="slides">
          <Slides slides={slides} />
        </div>
      </MDXProvider>
    </div>
  );
}

const useReveal = ({
  options,
  deckDivRef,
  plugins,
}: {
  options?: any;
  deckDivRef: React.RefObject<HTMLDivElement | null>;
  plugins: Reveal.PluginFunction[];
}) => {
  const deck = useDeckStore((state) => state.deck);

  useEffect(() => {
    if (deck) return;
    if (!deckDivRef.current) return;

    const newdeck = new Reveal(deckDivRef.current, {
      ...options,
    });

    newdeck
      .initialize({
        plugins,
      })
      .then(() => {
        useDeckStore.getState().setDeck(newdeck);
        newdeck.on("overviewshown", () => {
          useDeckStore.setState({ isOverview: true });
          window.localStorage.setItem("isOverview", "true");
        });
        newdeck.on("overviewhidden", () => {
          useDeckStore.setState({ isOverview: false });
          window.localStorage.setItem("isOverview", "false");
        });
        newdeck.on("slidechanged", (_event: Event) => {
          const event = _event as RevealEvent;
          useDeckStore
            .getState()
            .setCurrentSlide(event.indexh, event.currentSlide.id);
          const notesElement = document.querySelector(".reveal-notes");
          if (notesElement) {
            notesElement.innerHTML = newdeck.getSlideNotes(newdeck.getCurrentSlide()) || "no notes";
          }
        });
        newdeck.on("fragmentshown", (_event: Event) => {
          const event = _event as Event & { fragment: HTMLElement };
          let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex!);
          useDeckStore.getState().setFragmentCurrentSlide(fragmentIndex + 1);
        });
        newdeck.on("fragmenthidden", (_event: Event) => {
          const event = _event as Event & { fragment: HTMLElement };
          let fragmentIndex = parseInt(event.fragment.dataset.fragmentIndex!);
          useDeckStore.getState().setFragmentCurrentSlide(fragmentIndex);
        });
      });

    return () => {
      try {
        if (newdeck) {
          newdeck.destroy();
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
    if (event.key === "i") {
      function showNotes(notes: string | null) {
        const notesElement = document.createElement("div");
        notesElement.className = "reveal-notes";
        notesElement.innerHTML = notes || "no notes";
        document.body.appendChild(notesElement);
      }
      const notesElement = document.querySelector(".reveal-notes");
      if (notesElement) {
        notesElement.remove();
      } else {
        const reveal = useDeckStore.getState().deck!;
        const notes = reveal.getSlideNotes(reveal.getCurrentSlide());
        showNotes(notes);
      }
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
