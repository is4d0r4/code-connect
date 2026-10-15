import { useState } from 'react';
import clsx from 'clsx';
import { Button, Checkbox, Icon } from '../atoms';
import { FormField } from '../molecules';

/**
 * Controlled sign-up form (nome, email, senha, lembrar-me).
 * @param {Object} props
 * @param {(values: { name: string, email: string, password: string, remember: boolean }) => void} [props.onSubmit] - Called with the form values on submit
 * @param {string} [props.className] - Extra classes
 */
export function RegisterForm({ onSubmit, className }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.({ name, email, password, remember });
  }

  return (
    <form onSubmit={handleSubmit} className={clsx('flex flex-col gap-4', className)}>
      <FormField
        label="Nome"
        name="name"
        placeholder="Nome completo"
        autoComplete="name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="Digite seu email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="flex flex-col gap-2">
        <FormField
          label="Senha"
          name="password"
          type="password"
          placeholder="******"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Checkbox
          label="Lembrar-me"
          name="remember"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
        />
      </div>
      <Button type="submit" fullWidth className="mt-4">
        Cadastrar
        <Icon name="arrow-right" />
      </Button>
    </form>
  );
}
