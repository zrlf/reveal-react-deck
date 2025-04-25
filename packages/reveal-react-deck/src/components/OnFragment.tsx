import { useSectionContext } from "@/context/SectionScopeProvider";

const OnFragment = ({
  children,
  fragmentNumber,
}: {
  children: React.ReactNode;
  fragmentNumber: number;
}) => {
  const { isPresent, fragment } = useSectionContext();
  const trigger = isPresent && fragment >= fragmentNumber;
  if (!trigger) {
    return null;
  }
  return <>{children}</>;
};

export default OnFragment;
