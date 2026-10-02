import clsx from 'clsx';

/**
 * Title and subtitle at the top of an auth form.
 * @param {Object} props
 * @param {string} props.title - Main heading (e.g. "Login")
 * @param {string} [props.subtitle] - Supporting text (e.g. "Boas-vindas! Faça seu login.")
 * @param {string} [props.className] - Extra classes
 */
export function AuthHeader({ title, subtitle, className }) {
  return (
    <header className={clsx('flex flex-col gap-2', className)}>
      <h1 className="text-3xl font-semibold text-offwhite">{title}</h1>
      {subtitle && <p className="text-lg text-offwhite">{subtitle}</p>}
    </header>
  );
}
