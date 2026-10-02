import clsx from 'clsx';

/**
 * Inline text link.
 * @param {Object} props
 * @param {string} props.href - Link destination
 * @param {'underline'|'accent'} [props.variant='underline'] - Visual style
 * @param {React.ReactNode} props.children - Link content (text and/or icon)
 * @param {string} [props.className] - Extra classes
 */
export function TextLink({ href, variant = 'underline', className, children, ...props }) {
  const variants = {
    underline: 'text-offwhite underline underline-offset-2 hover:text-accent',
    accent: 'font-semibold text-accent hover:underline',
  };

  return (
    <a
      href={href}
      className={clsx('inline-flex items-center gap-2', variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
}
