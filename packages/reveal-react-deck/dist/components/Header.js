import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Footer({ left, right, }) {
    return (_jsxs("div", { className: "footer absolute bottom-0 left-0 right-0 flex justify-between items-center my-1 mx-5 z-10", children: [_jsx("div", { children: left }), _jsx("div", { children: right })] }));
}
export function Header({ left, right, }) {
    return (_jsxs("div", { className: "header absolute top-0 left-0 right-0 flex justify-between items-center mx-5 z-10 h-[var(--title-bar-height)]", children: [_jsx("div", { children: left }), _jsx("div", { children: right })] }));
}
