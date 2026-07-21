import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AFC5E5]/70 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-black/20 bg-white/80 text-black backdrop-blur-xl hover:translate-y-[-1px] hover:border-[#bfd4ef] hover:bg-[#eaf3ff] hover:text-[#1b2a3d]",
        outline:
          "border border-black/20 bg-white/80 text-black backdrop-blur-xl hover:border-[#bfd4ef] hover:bg-[#eaf3ff] hover:text-[#1b2a3d]",
      },
      size: {
        default: "h-12 px-6 text-sm font-medium",
        lg: "h-14 px-8 text-base font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
