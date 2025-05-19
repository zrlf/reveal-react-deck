import React from "react";
import { cn } from "@/utils";
import { Ref } from "./Refs";

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  /** The image URL injected by our remark plugin */
  src?: string;
  realSrc?: string;
  caption?: string;
  containerClass?: string;
  fillHeight?: boolean;
};

function getCaption(caption: string): React.ReactNode {
  const match = caption.match(/^(.*?)\s\^(@\S+)/); // captures text before ^ and the cite key
  if (match) {
    const [, text, citeKey] = match;
    return (
      <span>
        {text}
        <Ref id={citeKey} />
      </span>
    );
  } else {
    return <span>{caption}</span>; // no citation found
  }
}

export default function Img({ src, realSrc, caption, containerClass, fillHeight, ...rest }: ImgProps) {
  const { className, ...restProps } = rest;
  const srcToUse = src || realSrc;

  return (
    <figure className={cn("m-0 flex flex-col", fillHeight && "h-full", containerClass)}>
      {/* image shrinks/grows to fill the remaining space */}
      <img
        data-src={srcToUse}
        {...restProps}
        className={cn("flex-1 min-h-0 w-full object-contain", className)}
      />

      {/* caption keeps its own height */}
      {caption && (
        <figcaption className="p-1 text-sm w-full mt-2 flex-none self-start">
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
