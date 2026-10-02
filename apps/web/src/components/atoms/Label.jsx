import clsx from 'clsx';

/**
 * Form label.
 * @param {Object} props
 * @param {string} props.htmlFor - Id of the associated control
 * @param {React.ReactNode} props.children - Label text
 * @param {string} [props.className] - Extra classes
 */
export function Label({ htmlFor, className, children, ...props }) {
  return (
    <label htmlFor={htmlFor} className={clsx('text-offwhite', className)} {...props}>
      {children}
    </label>
  );
}
