import RevealSlides, { SlideFile } from "reveal-react-deck";
import { options, revealOptions } from "./reveal.config";
import { useBibStore } from "reveal-react-deck/hooks/useBibtex.js";

function loadSlides(): SlideFile[] {
  const slides = import.meta.glob("/slides/*.mdx", { eager: true });
  const files: SlideFile[] = Object.values(slides) as SlideFile[];

  // sort the slides based on per-file frontmatter 'order'
  const sortedFiles = files.sort((a, b) => {
    return (a.frontmatter?.order ?? 1000) - (b.frontmatter?.order ?? 1000);
  });

  return sortedFiles;
}

function App() {
  useBibStore().fetchBibFile(options.bibFile!);

  return (
    <RevealSlides
      slides={loadSlides()}
      options={options}
      revealOptions={revealOptions}
    />
  );
}

export default App;
