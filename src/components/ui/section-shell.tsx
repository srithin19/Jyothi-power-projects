import { forwardRef, type ReactNode } from "react";
import { layoutClasses } from "../../constants/layout";
import { cn } from "../../utils/cn";

type SectionShellProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell({ id, className, children }, ref) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(layoutClasses.section, className)}
      >
        {children}
      </section>
    );
  },
);
