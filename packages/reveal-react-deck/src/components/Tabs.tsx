import { useSectionContext } from "@/context/SectionScopeProvider";
import React, { useEffect, useState } from "react";

const Tabs = ({
  children,
  breakpoints,
  className,
}: {
  children: React.ReactNode;
  breakpoints: number[];
  className?: string;
}) => {
  // displays one of the immediate children based on the fragment number
  // The one to display is determined from the breakpoint list
  const { fragment, isPresent } = useSectionContext();
  const [selectedChild, setSelectedChild] = useState(0);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (!isPresent) {
      return;
    }
    const index = [...breakpoints, 100].findIndex(
      (breakpoint) => fragment < breakpoint,
    );
    setSelectedChild(index);
  }, [fragment, isPresent]);

  return <div className={className}>{childrenArray[selectedChild]}</div>;
};

export { Tabs };
