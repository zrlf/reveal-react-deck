import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
const SvgSteps = ({ component: Component, groups, ...props }) => {
    // const { fragment, isPresent } = useSectionContext();
    const svgRef = useRef(null);
    useEffect(() => {
        const svgElement = svgRef.current;
        if (svgElement) {
            // Find the <g> element with id="show_2" and hide it
            Object.entries(groups).forEach(([key, value]) => {
                const groupElement = svgElement.querySelector(`#${key}`);
                if (groupElement) {
                    // groupElement.style.display = fragment >= value ? "block" : "none";
                    groupElement.classList.add("fragment");
                    groupElement.classList.add("appear");
                    groupElement.setAttribute("data-fragment-index", value.toString());
                }
            });
        }
    }, []);
    // if (!isPresent) return null;
    return _jsx(Component, { ref: svgRef, ...props });
};
export { SvgSteps };
