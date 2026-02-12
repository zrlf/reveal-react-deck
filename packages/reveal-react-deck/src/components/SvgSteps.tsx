import { cloneElement, isValidElement, useEffect, useRef } from "react";

interface GroupProps {
  [key: string]: number;
}

const SvgSteps = ({
  groups,
  children,
  currentVisible = false,
  ...props
}: {
  groups: GroupProps;
  children?: React.ReactElement;
  currentVisible?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      Object.entries(groups).forEach(([key, value]) => {
        const groupElement = svgElement.querySelector(`#${key}`);
        if (groupElement) {
          groupElement.classList.add("fragment");
          groupElement.classList.add("appear");
          if (currentVisible) {
            groupElement.classList.add("current-visible");
          }
          groupElement.setAttribute("data-fragment-index", value.toString());
        }
      });
    }
  }, [groups]);

  if (!children || !isValidElement(children)) {
    return null;
  }
  return cloneElement(children, { ref: svgRef, ...props } as any);
};

export { SvgSteps };
