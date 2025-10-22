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
  const [slideNumber, setSlideNumber] = useState('#');

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!reveal) return;
    const slides = reveal.getSlidesElement()
    const nbBackupSlides = slides?.querySelectorAll("section.backup").length;
    const totalSlides = reveal.getTotalSlides() - (nbBackupSlides || 0);

    // find the parent section of the element
    const parentSection = elementRef.current?.closest("section");
    if (!parentSection) return;

    const currentSlideNumber = reveal.getSlidePastCount(parentSection) + 1;

    if (parentSection.classList.contains("backup")) {
      // If the current slide is a backup slide, we need to adjust the current slide number
      setSlideNumber(`appx. ${currentSlideNumber - totalSlides}`);
      return;
    }

    setSlideNumber(
      `${currentSlideNumber} ${showTotal ? ` / ${totalSlides}` : ''}`,
    );
  }, [reveal]);

  return <div ref={elementRef} className={cn("text-sm", className)}>{slideNumber}</div>;
};
