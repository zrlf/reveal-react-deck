import { cn } from "@/utils";

export const Image = (props: any) => {
  const altClasses = props.alt
    ?.split(" ")
    .filter((c: string) => c.startsWith("."))
    .join(" ")
    .replace(/\./g, "");

  const divClasses = cn("relative h-full w-full", altClasses);
  const imgClasses = cn({
    "w-fit h-fit object-contain drop-shadow-lg rounded": props.title === "raw",
    "w-fit h-fit object-contain": props.title !== "raw",
  });

  const { src, ...rest } = props;

  if (props.title === "raw") {
    return <img data-src={src} {...rest} className={imgClasses} />;
  }
  return (
    <div className={divClasses}>
      <img data-src={src} {...rest} className={imgClasses} />
    </div>
  );
};

export const ImageRow = (props: any) => (
  <div className={cn(props.className, "flex gap-4 items-center")}>
    {props.children}
  </div>
);
