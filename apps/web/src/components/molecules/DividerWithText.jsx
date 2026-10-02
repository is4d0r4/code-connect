import clsx from 'clsx';

/**
 * Horizontal rule with centered text.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text shown between the lines
 * @param {string} [props.className] - Extra classes
 */
export function DividerWithText({ children, className }) {
  return (
    <div className={clsx('flex items-center gap-3 text-muted', className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-muted/40" />
      <span className="text-sm">{children}</span>
      <span aria-hidden="true" className="h-px flex-1 bg-muted/40" />
    </div>
  );
}
