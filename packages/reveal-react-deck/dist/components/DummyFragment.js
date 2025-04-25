import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
export const DummyFragments = ({ n }) => {
    const fragments = Array.from({ length: n }).map((_, i) => (_jsx("div", { className: "fragment hidden appear" }, i)));
    return _jsx(_Fragment, { children: fragments });
};
