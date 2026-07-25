import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

/*
  Labels sit above the control, never inside it as a placeholder: a placeholder
  disappears the moment someone starts typing, which is exactly when they need
  to check what the field wanted.

  Errors render below and are wired with aria-describedby so screen readers
  announce them with the field rather than as loose text.
*/

/*
  Inputs sit inside a white card, so a white fill plus a border would be a box
  drawn on a box. A recessed fill reads as an input without adding another
  rectangle outline; the border only appears to carry focus and error state.
*/
const controlClasses = [
  'w-full rounded-inset border border-transparent bg-sunken/70 px-4 text-ink',
  'placeholder:text-muted/70',
  'transition-[border-color,background-color] duration-200',
  '[transition-timing-function:var(--ease-out)]',
  'hover:bg-sunken',
  'focus:border-ink focus:bg-surface focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-60',
]

type BaseProps = {
  label: string
  error?: string
  hint?: string
}

export const Field = forwardRef<
  HTMLInputElement,
  BaseProps & InputHTMLAttributes<HTMLInputElement>
>(function Field({ label, error, hint, className, id, ...props }, ref) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={cn(
          controlClasses,
          'h-12',
          error ? 'border-accent-strong' : '',
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-accent-strong">
          {error}
        </p>
      )}
    </div>
  )
})

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextareaField({ label, error, hint, className, id, ...props }, ref) {
  const autoId = useId()
  const fieldId = id ?? autoId
  const errorId = `${fieldId}-error`
  const hintId = `${fieldId}-hint`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        ref={ref}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          [error ? errorId : null, hint ? hintId : null]
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={cn(
          controlClasses,
          'resize-y py-3 leading-relaxed',
          error ? 'border-accent-strong' : '',
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-accent-strong">
          {error}
        </p>
      )}
    </div>
  )
})
