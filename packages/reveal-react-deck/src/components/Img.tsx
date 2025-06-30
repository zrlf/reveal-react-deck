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
  lazy?: boolean;
  children?: React.ReactNode;
};

function getCaption(caption: string): React.ReactNode {
  const match = caption.match(/^(.*?)\s\^(@[\w\d,-@]+)/); // match text and ^@ref1,@ref2

  if (match) {
    const [, text, citeGroup] = match;
    const citeKeys = citeGroup
      .split(",") // split by comma
      .map((key) => key.replace(/^@/, "").trim());

    return (
      <span>
        {text}
        <Ref id={citeKeys} />
      </span>
    );
  } else {
    return <span>{caption}</span>;
  }
}

export default function Img({
  children,
  src,
  realSrc,
  caption,
  containerClass,
  fillHeight,
  lazy = true,
  ...rest
}: ImgProps) {
  const { className, ...restProps } = rest;
  const srcToUse = src || realSrc;

  if (lazy) {
    restProps["data-src"] = srcToUse;
  } else {
    restProps["src"] = srcToUse;
  }

  return (
    <figure
      className={cn(
        "m-0 flex flex-col",
        fillHeight && "h-full",
        containerClass,
      )}
    >
      {/* image shrinks/grows to fill the remaining space */}
      {srcToUse ? (
        <img
          {...restProps}
          className={cn("flex-1 min-h-0 w-full object-contain", className)}
        />
      ) : (
        children
      )}

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
