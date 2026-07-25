import { type ElementType, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

/*
  A card is its own lighter surface sitting on the tinted canvas, plus a soft
  shadow. No border.

  Pairing a 1px border with a wide drop shadow is the "ghost card" pattern and
  it reads as filler decoration; the fill difference alone is enough separation
  once the page behind it is tinted.
*/

type CardProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Adds a hover lift. Only for cards that are themselves interactive. */
  interactive?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

const paddings = {
  none: '',
  sm: 'p-5',
  md: 'p-6 sm:p-7',
  lg: 'p-7 sm:p-9',
}

export function Card({
  as: Tag = 'div',
  children,
  className,
  interactive = false,
  padding = 'md',
  ...rest
}: CardProps & Record<string, unknown>) {
  return (
    <Tag
      className={cn(
        'rounded-card bg-surface shadow-[var(--shadow-card)]',
        paddings[padding],
        interactive && [
          'transition-[transform,box-shadow] duration-300',
          '[transition-timing-function:var(--ease-out)]',
          'hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]',
        ],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
