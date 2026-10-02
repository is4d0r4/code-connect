import { useId } from 'react';
import clsx from 'clsx';
import { Input, Label } from '../atoms';

/**
 * Label + Input pair, linked by id.
 * Remaining props are forwarded to the Input (type, name, value, onChange...).
 * @param {Object} props
 * @param {React.ReactNode} props.label - Field label
 * @param {string} [props.id] - Input id (generated when omitted)
 * @param {string} [props.className] - Extra classes for the wrapper
 */
export function FormField({ label, id, className, ...inputProps }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} {...inputProps} />
    </div>
  );
}
