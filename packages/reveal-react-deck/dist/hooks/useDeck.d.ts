import Reveal from "reveal.js";
import { AnimationControls, TargetAndTransition, VariantLabels } from "framer-motion";
interface DeckStore {
    deck: Reveal.Api | null;
    totalNumberOfSlides: number;
    currentSlide: number;
    backupSlides: number;
    currentSlideId: string;
    isOverview: boolean;
    currentFragment: number[];
    fragmentOfSlide: {
        [key: string]: number;
    };
    fragment: number;
    motion: boolean;
    setDeck: (newdeck: Reveal.Api) => void;
    setCurrentSlide: (newSlide: number, id: string) => void;
    getCurrentSlide: () => number;
    setFragmentCurrentSlide: (newFragment: number) => void;
    toggleMotion: () => void;
    getFragmentCurrentSlide: () => number;
    onFragment: (index: number, only?: boolean) => boolean;
    onFragmentAnimate: () => (index: number, props?: AnimationControls, fallbackProps?: AnimationControls, only?: boolean) => AnimationControls | VariantLabels | TargetAndTransition;
}
declare const useDeckStore: import("zustand").UseBoundStore<import("zustand").StoreApi<DeckStore>>;
export { useDeckStore };
//# sourceMappingURL=useDeck.d.ts.map