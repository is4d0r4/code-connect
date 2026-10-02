import clsx from 'clsx';

/**
 * Social login button: provider logo with its name below.
 * @param {Object} props
 * @param {string} props.iconSrc - Provider logo URL
 * @param {string} props.label - Provider name (e.g. "Github")
 * @param {() => void} [props.onClick] - Click handler
 * @param {string} [props.className] - Extra classes
 */
export function SocialButton({ iconSrc, label, onClick, className, ...props }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex flex-col items-center gap-2 rounded p-2 text-offwhite transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        className
      )}
      {...props}
    >
      <img src={iconSrc} alt="" className="h-8 w-8 object-contain" />
      <span>{label}</span>
    </button>
  );
}
