import { useId } from 'react';
import clsx from 'clsx';

/**
 * Checkbox with an inline label.
 * @param {Object} props
 * @param {React.ReactNode} props.label - Text shown next to the checkbox
 * @param {string} [props.id] - Input id (generated when omitted)
 * @param {string} [props.className] - Extra classes for the wrapper
 */
export function Checkbox({ label, id, className, ...props }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <input
        type="checkbox"
        id={inputId}
        className="h-4 w-4 cursor-pointer rounded border border-accent accent-accent"
        {...props}
      />
      <label htmlFor={inputId} className="cursor-pointer text-offwhite">
        {label}
      </label>
    </div>
  );
}
