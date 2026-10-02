import { AuthHeader, AuthRedirect } from '../molecules';
import { LoginForm, SocialLogin } from '../organisms';
import { AuthTemplate } from '../templates';

/**
 * Login page. Auth integration is pending (the API has no auth yet),
 * so the handlers are injectable and default to no-ops.
 * @param {Object} props
 * @param {(values: { login: string, password: string, remember: boolean }) => void} [props.onLogin] - Form submit handler
 * @param {(providerId: string) => void} [props.onSocialLogin] - Social provider handler
 */
export function LoginPage({ onLogin, onSocialLogin }) {
  return (
    <AuthTemplate
      bannerSrc="/IMG_1%20-%20Desktop.png"
      bannerAlt="Mulher sorridente programando em frente a telas com interfaces verdes, com o logo code connect"
    >
      <AuthHeader title="Login" subtitle="Boas-vindas! Faça seu login." />
      <LoginForm onSubmit={onLogin} />
      <SocialLogin onSelect={onSocialLogin} />
      <AuthRedirect
        question="Ainda não tem conta?"
        linkText="Crie seu cadastro!"
        href="/cadastro"
        icon="clipboard"
      />
    </AuthTemplate>
  );
}
