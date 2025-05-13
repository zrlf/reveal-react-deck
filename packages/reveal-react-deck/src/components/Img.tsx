import React from "react";
import { cn } from "@/utils";
import { Ref } from "./Refs";

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  /** The image URL injected by our remark plugin */
  src: string;
  caption?: string;
};

export default function Img({ src, caption, ...rest }: ImgProps) {
  const { className, ...restProps } = rest;

  function getCaption(caption: string): React.ReactNode {
    const match = caption.match(/^(.*?)\s\^(@\S+)/); // captures text before ^ and the cite key
    if (match) {
      const [, text, citeKey] = match;
      return (
        <span>
          {text}<Ref id={citeKey} />
        </span>
      );
    } else {
      return <span>{caption}</span>; // no citation found
    }
  }

  return (
    <figure className={cn("relative w-full h-full m-0", className)}>
      <img
        data-src={src}
        {...restProps}
        className={cn("w-fit h-fit object-contain", rest.className)}
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 p-2 text-sm">
          {getCaption(caption)}
        </figcaption>
      )}
    </figure>
  );
}

const ImgHTML = (props: any) => {
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

const ImageRow = (props: any) => (
  <div className={cn(props.className, "flex gap-4 items-center")}>
    {props.children}
  </div>
);

export { Img, ImgHTML, ImageRow };
