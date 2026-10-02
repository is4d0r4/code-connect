import clsx from 'clsx';
import { DividerWithText, SocialButton } from '../molecules';

const DEFAULT_PROVIDERS = [
  { id: 'github', label: 'Github', iconSrc: '/Github.png' },
  { id: 'google', label: 'Gmail', iconSrc: '/Google.png' },
];

/**
 * Divider + list of social login providers. Shared by login and cadastro.
 * @param {Object} props
 * @param {{ id: string, label: string, iconSrc: string }[]} [props.providers] - Providers to show
 * @param {(providerId: string) => void} [props.onSelect] - Called with the chosen provider id
 * @param {string} [props.dividerText='ou entre com outras contas'] - Divider label
 * @param {string} [props.className] - Extra classes
 */
export function SocialLogin({
  providers = DEFAULT_PROVIDERS,
  onSelect,
  dividerText = 'ou entre com outras contas',
  className,
}) {
  return (
    <section className={clsx('flex flex-col gap-4', className)}>
      <DividerWithText>{dividerText}</DividerWithText>
      <ul className="flex justify-center gap-8">
        {providers.map((provider) => (
          <li key={provider.id}>
            <SocialButton
              iconSrc={provider.iconSrc}
              label={provider.label}
              onClick={() => onSelect?.(provider.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
