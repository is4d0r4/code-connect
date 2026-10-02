import clsx from 'clsx';

/**
 * Text input styled for the auth forms.
 * Forwards every native input prop (type, id, name, autoComplete, value...).
 * @param {Object} props
 * @param {string} [props.type='text'] - Native input type
 * @param {string} [props.className] - Extra classes
 */
export function Input({ type = 'text', className, ...props }) {
  return (
    <input
      type={type}
      className={clsx(
        'h-10 w-full rounded bg-field px-4 text-surface placeholder:text-surface/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        className
      )}
      {...props}
    />
  );
}
