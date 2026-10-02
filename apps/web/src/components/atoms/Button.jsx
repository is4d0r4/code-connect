import clsx from 'clsx';

/**
 * Button component
 * @param {Object} props
 * @param {'primary'|'secondary'|'danger'} [props.variant='primary'] - Button style variant
 * @param {boolean} [props.fullWidth=false] - Stretch to the container width
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} props.children - Button content (text and/or icon)
 */
export function Button({
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

  const variants = {
    primary: 'bg-accent text-surface hover:brightness-110 focus-visible:ring-accent',
    secondary:
      'border border-accent text-accent hover:bg-accent/10 focus-visible:ring-accent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        {
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
}
