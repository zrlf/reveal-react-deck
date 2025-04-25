import { AnimationScope } from "framer-motion";
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
declare function useAnimation(scope: AnimationScope, animateFunction: () => void, onAction: "slide" | "fragment" | number): void;
export { useAnimation };
//# sourceMappingURL=useAnimation.d.ts.map