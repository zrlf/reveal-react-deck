import cn from "clsx";

export const Overlay = ({
  children,
  variant,
  fragment = true,
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "none" | "conclusion" | "centered";
  fragment?: boolean;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}) => {
  const classesCentered = "flex flex-col items-center justify-center";
  const classesConclusion = "bg-background/70";

  return (
    <div
      className={cn(
        className,
        fragment && "fragment",
        "overlay absolute z-20 inset-0 no-margin slide-padding",
        variant == "centered" && classesCentered,
        variant == "conclusion" && cn(classesConclusion, classesCentered),
      )}
      {...props}
    >
      {variant == "conclusion" ? (
        <div
          className="conclusion-overlay"
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
