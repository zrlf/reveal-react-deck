# Reveal React Deck

This workspace hosts two related packages:

- `packages/reveal-react-deck`: a React + MDX integration layer for
  [Reveal.js](https://revealjs.com) with ready-made slide layouts,
  fragment-aware animations, bibliographies, and Tailwind-first styling.
- `packages/create-deck`: a CLI that scaffolds a Reveal + React deck using the
  library above, Tailwind CSS v4, and MDX-based slides.

There is an example deck in `examples/basic-deck`.

## Highlights

- **MDX-powered slides** - author decks in MDX, annotate slides with YAML, and
  the remark/rehype pipeline converts them into `<Slide>` components
  automatically.
- **Rich React components** - headers/footers, admonitions, animated lists,
  tabbed fragments, references, overlays, cards, and more live under
  `reveal-react-deck/components`.
- **Reveal.js lifecycle helpers** - the `useDeckStore` Zustand store exposes
  slide state, fragment counters, motion toggles, and keyboard shortcuts (`B` to
  outline slides, `i` to toggle speaker notes).
- **Citations built-in** - fetch BibTeX files with `useBibStore`, drop
  `<Ref id="@key" />` in slides, and render a live reference list per slide.
- **Using Tailwind 4** - the preset CSS exports (`css/preset.css`,
  `css/layouts.css`, `css/style.css`, `css/style-eth.css`) are consumable via
  modern `@import`/`@source` directives.
- **Scaffolding CLI** - `create-deck` copies the template, rewrites the package
  name, installs dependencies, and leaves you with a runnable deck.

## Requirements

- Node.js 20+
- [pnpm](https://pnpm.io) `10.9.0` (matching the workspace lockfile)

## Getting Started

```bash
pnpm install
```

Common workspace commands:

```bash
# Build the Reveal integration
pnpm --filter reveal-react-deck build

# Type-check only
pnpm --filter reveal-react-deck types:check

# Run the CLI in watch mode during development
pnpm --filter create-deck dev

# Build the CLI bundle
pnpm --filter create-deck build

# Launch the example deck (Vite dev server)
pnpm --filter examples/basic-deck dev
```

## Using `reveal-react-deck`

1. Install the package (local link when working in the monorepo, published
   package when released).
2. Import the CSS preset alongside your own Tailwind styles.
3. Load MDX slides with `import.meta.glob`, sort them by frontmatter, and render
   `RevealSlides`.

```tsx
// src/main.tsx / src/App.tsx
import "reveal-react-deck/style.css";
import RevealSlides, { type SlideFile } from "reveal-react-deck";
import { options, revealOptions } from "./reveal.config";
import { useBibStore } from "reveal-react-deck/hooks/useBibtex";

const slides = import.meta.glob<SlideFile>("/slides/*.mdx", { eager: true });

function App() {
  // Load references once; safe to call inside render because the store wraps the effect.
  useBibStore().fetchBibFile(options.bibFile!);

  return (
    <RevealSlides
      slides={Object.values(slides)}
      options={options}
      revealOptions={revealOptions}
    />
  );
}
```

### Slide authoring

Slides are separated by fenced code blocks tagged `slide`. YAML inside the block
becomes the slide frontmatter, which the MDX plugin transforms into props for
the `<Slide>` component.

````jsx
```slide
title: My First Slide
subtitle: Fragments & citations
layout: center
reveal:
  background: "#101820"
  data-transition: convex
```

<AnimatedList>
  <li>Introduce idea</li>
  <li>
    Cite a paper <Ref id="@smith2024" />
  </li>
  <li>Wrap up</li>
</AnimatedList>
````

Key frontmatter fields:

- `title` / `subtitle` - rendered automatically unless `layout` is `full` or
  `hero`.
- `layout` - toggles layout-specific CSS (`default`, `center`, `full`, `left`,
  `hero`, etc.).
- `fragments` - inserts invisible fragments so the progress bar aligns with your
  narrative. Useful if you trigger animations manually on a specific fragment.
- `reveal` - mapped to `data-*` attributes on the `<section>` (e.g.
  `background`, `transition`). All revealjs options can be set here.
- `hidden` - hide a slide (useful for drafts).
- `dark` - use dark styling via a `dark` class on the `<section>`.

### Built-in components & hooks

- `Slide`, `Header`, `Footer`, `SlideNumber` - layout primitives with fragment
  awareness.
- `AnimatedList`, `AnimatedStagger`, `FragmentList` - Framer Motion helpers tied
  to fragments or slide entry via `useAnimation`.
- `Tabs` - swap content as fragments advance using breakpoint indices.
- `Admonition`, `Card`, `Overlay`, `Conclusion`, `DummyFragments`,
  `OnFragment` - drop-in utilities for richer content.
- `Img` / `ImgHTML` - responsive figures that auto-import referenced files and
  expand citations from captions (thanks to `remark-img-auto-import`).
- `SvgSteps` - progressive SVG reveals by assigning fragment indices to `<g>`
  groups.
- `useDeckStore` - subscribe to Reveal.js state (current slide, fragments,
  overview mode, motion toggle).
- `useBibStore` - fetch and parse BibTeX, powering `<Ref>` and `<Refs>` within
  each slide.

### MDX plugins

Located in `packages/reveal-react-deck/src/plugins` and exported via the package
entrypoints:

- `remarkSlides` - groups markdown nodes between
  ```slide fences into `<Slide>`elements with frontmatter props and normalises`reveal._`keys into`data-_`
  attributes.
- `remarkImgAutoImport` - transforms `<Img src="./figure.png" />` into real ES
  module imports.
- `rehypeRemoveLonelyParagraph` & `rehypeRemoveWrappingP` - unwrap redundant
  `<p>` containers around block elements for cleaner markup.

These plugins are bundled with the `create-deck` template configuration, and can
be imported individually when wiring a custom MDX pipeline.

## Styling & Theming

The library ships multiple CSS files in `reveal-react-deck/css/`:

- `preset.css` - Tailwind layer setup, Reveal overrides, and base variables
  (used by the example deck).
- `style.css` - base theme.
- `style-eth.css` - ETH-branded variant.
- `layouts.css` - layout-specific utilities.
- `admonition.css` - admonition styles matching Docusaurus semantics.

Import them using modern Tailwind directives, e.g. inside `src/index.css`:

```css
@import "tailwindcss";
@import "reveal.js/dist/reveal.css";
@import "reveal-react-deck/css/preset.css";

@source "../node_modules/reveal-react-deck/";
```

## `create-deck` CLI

The CLI lives at `packages/create-deck` and exposes a `create-deck` binary (ESM,
Node 20). When executed it:

1. Prompts for a project name.
2. Copies `packages/create-deck/template` into the target directory.
3. Rewrites the generated `package.json` name.
4. Runs `pnpm install` inside the new project.

Run it locally with:

```bash
pnpm --filter create-deck build
pnpm --filter create-deck exec create-deck
```

The template contains:

- Vite + React + TypeScript setup with Tailwind CSS v4.
- A starter `slides/` folder with MDX decks separated by `order` frontmatter.
- A `reveal.config.tsx` file that defines Reveal.js options plus header/footer
  React nodes (e.g. `SlideNumber`).
- Branding assets stored under `public/`.

## Example deck

`examples/basic-deck` showcases how to wire everything together. Useful
commands:

```bash
pnpm --filter examples/basic-deck dev     # start the Vite dev server
pnpm --filter examples/basic-deck build   # produce a static bundle
```

The example demonstrates:

- Sorting MDX slides by `order`.
- Custom header/footer composition.
- Tailwind 4 integration with the exported preset.
- Referencing slides via keyboard controls and fragments.

## Development Notes

- TypeScript paths (`@/*`) are resolved by `tsc-alias` during builds.
- Plugin bundles are produced with `tsup`
  (`pnpm --filter reveal-react-deck build:mdx-plugins`).
- `pnpm changeset` can be enabled by adding release notes under `.changeset/`
  (Changesets CLI already configured).
- Avoid running `pnpm` scripts from inside package directories; prefer
  workspace-aware commands with `--filter`.

## License

Both packages currently declare the **MIT** license.
