import clsx from 'clsx';
import { Icon, TextLink } from '../atoms';

/**
 * Footer prompt linking to the other auth page (login <-> cadastro).
 * @param {Object} props
 * @param {string} props.question - Leading text (e.g. "Ainda não tem conta?")
 * @param {string} props.linkText - Link label (e.g. "Crie seu cadastro!")
 * @param {string} props.href - Link destination
 * @param {string} [props.icon] - Icon name shown after the link text
 * @param {string} [props.className] - Extra classes
 */
export function AuthRedirect({ question, linkText, href, icon, className }) {
  return (
    <p
      className={clsx(
        'flex flex-wrap items-center justify-center gap-2 text-offwhite',
        className
      )}
    >
      <span>{question}</span>
      <TextLink href={href} variant="accent">
        {linkText}
        {icon && <Icon name={icon} className="h-5 w-5" />}
      </TextLink>
    </p>
  );
}
