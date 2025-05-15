import { useSectionContext } from "@/context/SectionScopeProvider";
import cn from "clsx";
import { createPortal } from "react-dom";

export const Overlay = ({
  children,
  variant,
  fragment = true,
  className,
}: {
  children: React.ReactNode;
  variant?: "none" | "conclusion" | "centered";
  fragment?: boolean;
  className: string;
}) => {
  const { overlayRef } = useSectionContext();
  if (!overlayRef?.current) {
    return null;
  }

  const classesCentered = "flex flex-col items-center justify-center";
  const classesConclusion = "bg-background/70";

  return createPortal(
    <div
      className={cn(
        fragment && "fragment",
        "absolute z-10 inset-0 no-margin slide-padding",
        variant == "centered" && classesCentered,
        variant == "conclusion" && cn(classesConclusion, classesCentered),
        className,
      )}
    >
      {variant == "conclusion" ? (
        <div
          className={cn(className, "w-2/3 bg-gray-200 p-4 rounded-xl shadow")}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>,
    overlayRef.current,
  );
};
