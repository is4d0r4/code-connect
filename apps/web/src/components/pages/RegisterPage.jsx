import { Logo } from '../atoms';
import { AuthHeader, AuthRedirect } from '../molecules';
import { RegisterForm, SocialLogin } from '../organisms';
import { AuthTemplate } from '../templates';

/**
 * Cadastro (sign-up) page. Auth integration is pending (the API has no auth yet),
 * so the handlers are injectable and default to no-ops.
 * @param {Object} props
 * @param {(values: { name: string, email: string, password: string, remember: boolean }) => void} [props.onRegister] - Form submit handler
 * @param {(providerId: string) => void} [props.onSocialLogin] - Social provider handler
 */
export function RegisterPage({ onRegister, onSocialLogin }) {
  return (
    <AuthTemplate
      bannerSrc="/IMG_2%20-%20Desktop.png"
      bannerAlt="Mulher de óculos programando em frente a telas com interfaces verdes"
      bannerClassName="object-[60%_center]"
      bannerOverlay={<Logo />}
    >
      <AuthHeader title="Cadastro" subtitle="Olá! Preencha seus dados." />
      <RegisterForm onSubmit={onRegister} />
      <SocialLogin onSelect={onSocialLogin} />
      <AuthRedirect question="Já tem conta?" linkText="Faça seu login!" href="/login" icon="login" />
    </AuthTemplate>
  );
}
