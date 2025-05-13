import { useSectionContext } from "@/context/SectionScopeProvider";
import cn from "clsx";
import { createPortal } from "react-dom";

export const Conclusion = ({
  children,
  fragment,
  className,
}: {
  children: React.ReactNode;
  fragment?: boolean;
  className: string;
}) => {
  const { overlayRef } = useSectionContext();
  if (!overlayRef?.current) {
    return null;
  }

  return createPortal(
    <div
      className={cn(
        fragment && "fragment",
        "absolute z-10 inset-0 no-margin slide-padding backdrop-blur-sm flex flex-col items-center justify-center",
      )}
    >
      <div className={cn(className, "w-2/3 bg-gray-200 p-4 rounded-xl shadow")}>
        {children}
      </div>
    </div>,
    overlayRef.current,
  );
};
