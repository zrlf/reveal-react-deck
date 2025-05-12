import cn from "clsx";
import { ComponentProps } from "react";

export const Card = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "border border-muted p-3 rounded-lg bg-neutral-200",
        className,
      )}
    >
      {children}
    </div>
  );
};
