import cn from "clsx";

export const Overlay = ({
  children,
  variant,
  fragment = true,
  className,
}: {
  children: React.ReactNode;
  variant?: "none" | "conclusion" | "centered";
  fragment?: boolean;
  className?: string;
}) => {
  const classesCentered = "flex flex-col items-center justify-center";
  const classesConclusion = "bg-background/70";

  return (
    <div
      className={cn(
        fragment && "fragment",
        "overlay absolute z-10 inset-0 no-margin slide-padding",
        variant == "centered" && classesCentered,
        variant == "conclusion" && cn(classesConclusion, classesCentered),
        className,
      )}
    >
      {variant == "conclusion" ? (
        <div
          className={cn(className, "conclusion-overlay")}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
