import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-3xl border border-white/50 bg-white/65 p-6 shadow-[0_20px_80px_rgba(9,17,27,0.1)] backdrop-blur-2xl sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
