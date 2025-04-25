import { useSectionContext } from "@/context/SectionScopeProvider";
import { AnimationScope } from "framer-motion";
import { useEffect, useState } from "react";
import { useDeckStore } from "./useDeck";

/**
 * Calls the provided animateFunction based on the specified onAction trigger.
 *
 * @param {AnimationScope} scope - The animation scope to monitor for triggers.
 * @param {() => void} animateFunction - The function to call when the trigger condition is met.
 * @param {"slide" | "fragment" | number} onAction - The trigger condition for calling the animateFunction.
 *   If "slide", the animateFunction will be called when the slide comes into view.
 *   If "fragment", the animateFunction will be called when the fragment is shown.
 *   If a number, the animateFunction will be called when the fragment with that number is shown.
 *
 * @throws {Error} If the onAction parameter is not one of the specified values.
 */
function useAnimation(
    scope: AnimationScope,
    animateFunction: () => void,
    onAction: "slide" | "fragment" | number,
) {
    const { isPresent, fragment } = useSectionContext();
    const [previousFragment, setPreviousFragment] = useState(-1);

    if (onAction === "slide") {
        // if onAction="slide", the animateFunction will be called when the slide comes into view
        useEffect(() => {
            if (!isPresent || !useDeckStore.getState().motion) return;

            animateFunction();
        }, [isPresent]);
    } else {
        // if onAction="fragment", the animateFunction will be called when the fragment is shown
        // this requires that the component this hook is used in is a fragment (class="fragment")
        // if onAction is a number, the animateFunction will be called when the fragment with that number is shown
        useEffect(() => {
            if (!isPresent || !useDeckStore.getState().motion) return;

            if (onAction === "fragment") {
                if (scope.current) {
                    const fragmentNumber = Number(
                        scope.current.getAttribute("data-fragment-index"),
                    );
                    if (
                        fragment === fragmentNumber &&
                        previousFragment < fragmentNumber
                    ) {
                        animateFunction();
                    }
                }
            } else if (
                typeof onAction === "number" &&
                fragment === onAction &&
                previousFragment < onAction
            ) {
                animateFunction();
            }

            setPreviousFragment(fragment);
        }, [isPresent, fragment, onAction, scope, animateFunction]);
    }
}

export { useAnimation };
