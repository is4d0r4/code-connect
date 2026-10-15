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
    <header className={clsx('flex flex-col gap-6', className)}>
      <h1 className="text-[31px] leading-normal font-semibold text-offwhite">{title}</h1>
      {subtitle && <p className="text-[22px] leading-normal text-offwhite">{subtitle}</p>}
    </header>
  );
}
