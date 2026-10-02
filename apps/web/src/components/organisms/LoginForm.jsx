import { useState } from 'react';
import clsx from 'clsx';
import { Button, Checkbox, Icon, TextLink } from '../atoms';
import { FormField } from '../molecules';

/**
 * Controlled login form (email/usuário, senha, lembrar-me).
 * @param {Object} props
 * @param {(values: { login: string, password: string, remember: boolean }) => void} [props.onSubmit] - Called with the form values on submit
 * @param {string} [props.forgotPasswordHref='/recuperar-senha'] - "Esqueci a senha" destination
 * @param {string} [props.className] - Extra classes
 */
export function LoginForm({ onSubmit, forgotPasswordHref = '/recuperar-senha', className }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ login, password, remember });
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-4', className)}>
      <FormField
        label="Email ou usuário"
        name="login"
        placeholder="usuario123"
        autoComplete="username"
        required
        value={login}
        onChange={(event) => setLogin(event.target.value)}
      />
      <FormField
        label="Senha"
        name="password"
        type="password"
        placeholder="******"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className="flex items-center justify-between gap-4">
        <Checkbox
          label="Lembrar-me"
          name="remember"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
        <TextLink href={forgotPasswordHref}>Esqueci a senha</TextLink>
      </div>
      <Button type="submit" fullWidth className="mt-4">
        Login
        <Icon name="arrow-right" />
      </Button>
    </form>
  );
}
