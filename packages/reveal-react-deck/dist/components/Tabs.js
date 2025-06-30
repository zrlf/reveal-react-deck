import { jsx as _jsx } from "react/jsx-runtime";
import { useSectionContext } from "../context/SectionScopeProvider.js";
import React, { useEffect, useState } from "react";
const Tabs = ({ children, breakpoints, className, }) => {
    // displays one of the immediate children based on the fragment number
    // The one to display is determined from the breakpoint list
    const { fragment, isPresent } = useSectionContext();
    const [selectedChild, setSelectedChild] = useState(0);
    const childrenArray = React.Children.toArray(children);
    useEffect(() => {
        if (!isPresent) {
            return;
        }
        const index = [...breakpoints, 100].findIndex((breakpoint) => fragment < breakpoint);
        setSelectedChild(index);
    }, [fragment, isPresent]);
    return _jsx("div", { className: className, children: childrenArray[selectedChild] });
};
export { Tabs };
