import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useSectionContext } from "../context/SectionScopeProvider.js";
const OnFragment = ({ children, fragmentNumber, }) => {
    const { isPresent, fragment } = useSectionContext();
    const trigger = isPresent && fragment >= fragmentNumber;
    if (!trigger) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
};
export default OnFragment;
