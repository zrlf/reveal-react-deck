interface GroupProps {
    [key: string]: number;
}
type SvgStepsProps = {
    groups: GroupProps;
    children?: React.ReactElement;
    currentVisible?: boolean;
};
declare const SvgSteps: ({ groups, children, currentVisible, ...props }: SvgStepsProps) => import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | null;
export { SvgSteps };
//# sourceMappingURL=SvgSteps.d.ts.map