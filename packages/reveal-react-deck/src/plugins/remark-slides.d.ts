declare module "js-yaml" {
  export function load(input: string): any;
}

declare module "estree-util-value-to-estree" {
  export function valueToEstree(value: any): any;
}

interface Slide {
  frontmatter: Record<string, any>;
  children: any[];
}

interface RemarkSlidesOptions {
  // Add any options if needed
}

declare function remarkSlides(options?: RemarkSlidesOptions): (tree: any) => void;

export default remarkSlides;
