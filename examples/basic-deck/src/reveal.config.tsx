import { Options, RevealOptions } from "reveal-react-deck/config";
import { SlideNumber } from "reveal-react-deck/components/SlideNumber.js";

export const revealOptions: RevealOptions = {
  hash: true,
  slideNumber: false,
  transition: "none",
  backgroundTransition: "fade",
  transitionSpeed: "fast",
  width: 1920,
  height: 1080,
  margin: 0,
  center: false,
  disableLayout: false,
  controlsLayout: "edges",
  progress: true,
  mouseWheel: false,

  autoAnimateEasing: "ease",
  autoAnimateDuration: 0.25,
  autoAnimateUnmatched: false,

  controls: true,
  highlight: {
    highlightOnLoad: false,
  },
};

export const options: Options = {
  footer: {
    right: <SlideNumber showTotal={true} className="text-xs" />,
  },
  header: {
    right: (
      <div className="flex h-[5vh] items-center gap-4">
        <img src="/eth_logo_kurz_pos.svg" alt="eth" className="h-3" />
        <img src="/cmbm_logo.svg" className="h-8" alt="cmbm" />
      </div>
    ),
  },
};
