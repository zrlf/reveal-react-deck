# reveal-react-deck

A React + MDX integration layer for [Reveal.js](https://revealjs.com) with ready-made slide layouts, fragment-aware animations, bibliographies, and Tailwind-first styling.

## Installation

```bash
npm install reveal-react-deck
# or
pnpm add reveal-react-deck
# or
yarn add reveal-react-deck
```

## Quick Start

```tsx
import "reveal-react-deck/style.css";
import RevealSlides, { type SlideFile } from "reveal-react-deck";
import { options, revealOptions } from "./reveal.config";

const slides = import.meta.glob<SlideFile>("/slides/*.mdx", { eager: true });

function App() {
  return (
    <RevealSlides
      slides={Object.values(slides)}
      options={options}
      revealOptions={revealOptions}
    />
  );
}
```

## Features

- **MDX-powered slides** - Author decks in MDX with YAML frontmatter
- **Rich React components** - Headers, footers, admonitions, animated lists, tabbed fragments, and more
- **Reveal.js lifecycle helpers** - `useDeckStore` Zustand store exposes slide state and fragment counters
- **Citations built-in** - Fetch BibTeX files and render live references per slide
- **Tailwind 4 support** - Modern CSS with `@import`/`@source` directives
- **TypeScript first** - Full type safety and IDE support

## Components

Available in `reveal-react-deck/components/*`:

- `Slide`, `Header`, `Footer`, `SlideNumber` - Layout primitives
- `AnimatedList`, `AnimatedStagger`, `FragmentList` - Animation helpers
- `Tabs` - Fragment-based content switching
- `Admonition`, `Card`, `Overlay`, `Conclusion` - Content utilities
- `Img`, `ImgHTML` - Responsive figures with auto-import
- `SvgSteps` - Progressive SVG reveals
- `Ref`, `Refs` - Citation components

## Hooks

Available in `reveal-react-deck/hooks/*`:

- `useDeckStore` - Subscribe to Reveal.js state
- `useBibStore` - Fetch and parse BibTeX files
- `useAnimation` - Fragment-aware animations

## MDX Plugins

Available from `reveal-react-deck/plugins`:

- `remarkSlides` - Groups markdown into `<Slide>` components
- `remarkImgAutoImport` - Transforms image sources into ES imports
- `rehypeRemoveLonelyParagraph` - Unwraps redundant paragraphs
- `rehypeRemoveWrappingP` - Removes wrapping paragraphs

## CSS Files

Available in `reveal-react-deck/css/`:

- `preset.css` - Tailwind setup and Reveal overrides
- `style.css` - Base theme
- `style-eth.css` - ETH-branded variant
- `layouts.css` - Layout utilities
- `admonition.css` - Admonition styles

## Documentation

For detailed documentation, examples, and guides, see the [main repository](https://github.com/zrlf/reveal-react-deck).

## License

MIT
