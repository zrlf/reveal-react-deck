export const DummyFragments = ({ n }: { n: number }) => {
  const fragments = Array.from({ length: n }).map((_, i) => (
    <div key={i} className="fragment hidden appear"></div>
  ));
  return <>{fragments}</>;
};
