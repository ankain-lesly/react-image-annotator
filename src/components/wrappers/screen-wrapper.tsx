import { ReactNode } from "react";

interface PropsScreen {
  className?: string;
  children: ReactNode;
  idName?: string;
  ngClass?: string;
  style?: object;
}
export const ScreenWrapper = ({
  className = "",
  children,
  idName = "",
  ngClass = "",
  style = {},
}: PropsScreen) => {
  return (
    <section
      className={"section-p antialiased w-full relative " + className}
      data-area-context={idName}
      id={idName}
      style={style}>
      <div className={"container-x " + ngClass}>{children}</div>
    </section>
  );
};

export const AreaContainer = ({ children, className }: PropsScreen) => {
  return (
    <div
      className={`w-full rounded-xl bg-dark-l_ border p-3 md:p-4 min-h-[400px] overflow-auto ${className}`}>
      {children}
    </div>
  );
};
