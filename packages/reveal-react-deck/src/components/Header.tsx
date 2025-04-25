export function Footer({
  left,
  right,
}: {
  left?: React.ReactNode | string;
  right?: React.ReactNode | string;
}) {
  return (
    <div className="footer absolute bottom-0 left-0 right-0 flex justify-between items-center my-1 mx-5 z-10">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

export function Header({
  left,
  right,
}: {
  left?: React.ReactNode | string;
  right?: React.ReactNode | string;
}) {
  return (
    <div className="header absolute top-0 left-0 right-0 flex justify-between items-center mx-5 z-10 h-[var(--title-bar-height)]">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
