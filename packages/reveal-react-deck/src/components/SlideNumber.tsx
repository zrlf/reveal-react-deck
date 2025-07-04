import { useDeckStore } from "@/hooks/useDeck";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";

export const SlideNumber = ({
  showTotal = false,
  className,
}: {
  showTotal: boolean;
  className: string;
}) => {
  const reveal = useDeckStore((s) => s.deck);
  const totalSlides = useDeckStore((s) => s.totalNumberOfSlides);
  const [slideNumber, setSlideNumber] = useState(0);

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reveal) return;

    // find the parent section of the element
    const parentSection = elementRef.current?.closest("section");
    if (!parentSection) return;

    setSlideNumber(reveal.getSlidePastCount(parentSection) + 1);
  }, [reveal]);

  return (
    <div ref={elementRef} className={cn("text-sm", className)}>
      {slideNumber}
      {showTotal && ` / ${totalSlides}`}
    </div>
  );
};
