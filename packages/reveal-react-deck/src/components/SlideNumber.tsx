import { useDeckStore } from "@/hooks/useDeck";
import { cn } from "@/utils";

export const SlideNumber = ({
  showTotal = false,
  className,
}: {
  showTotal: boolean;
  className: string;
}) => {
  const { currentSlide, totalNumberOfSlides } = useDeckStore((s) => s);

  return (
    <div className={cn("text-sm", className)}>
      {currentSlide + 1} {showTotal && `/ ${totalNumberOfSlides}`}
    </div>
  );
};
