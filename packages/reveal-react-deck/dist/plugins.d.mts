import { Root } from 'hast';

declare function rehypeRemoveLonelyParagraph(): (tree: Root) => void;

declare function rehypeRemoveWrappingP(): (tree: any) => void;

declare function remarkImgAutoImport(): (tree: any) => void;

declare function remarkSlides(): (tree: any) => void;

export { rehypeRemoveLonelyParagraph, rehypeRemoveWrappingP, remarkImgAutoImport, remarkSlides };
