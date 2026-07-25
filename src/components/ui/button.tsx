import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/*
  Solid variants carry no border and outlined variants carry no shadow. Pairing
  a 1px border with a wide soft shadow is the "ghost card" look and it reads as
  filler decoration rather than elevation.

  Every size clears the 44px touch target.
*/
const buttonVariants = cva(
  [
    'group relative inline-flex items-center justify-center gap-2 rounded-full',
    'font-medium whitespace-nowrap select-none',
    'transition-[transform,background-color,color,border-color,opacity] duration-200',
    '[transition-timing-function:var(--ease-out)]',
    'active:scale-[0.97]',
    'disabled:pointer-events-none disabled:opacity-45',
    'aria-disabled:pointer-events-none aria-disabled:opacity-45',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper hover:bg-night-soft',
        outline:
          'border border-line-strong text-ink hover:border-ink hover:bg-sunken',
        ghost: 'text-ink-soft hover:bg-sunken hover:text-ink',
        onDark:
          'bg-paper text-ink hover:bg-accent-wash',
      },
      size: {
        sm: 'h-11 px-5 text-sm',
        md: 'h-12 px-6 text-[0.9375rem]',
        lg: 'h-14 px-8 text-base',
      },
      block: {
        true: 'w-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    children?: ReactNode
  }

export function Button({
  className,
  variant,
  size,
  block,
  asChild,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, block }), className)

  if (asChild) {
    return (
      <Slot className={classes} {...props}>
        {children}
      </Slot>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}
