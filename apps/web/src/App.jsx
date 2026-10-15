import { LoginPage, RegisterPage } from './components/pages';

// Minimal path-based routing until a router is added.
const ROUTES = {
  '/cadastro': RegisterPage,
};

export default function App() {
  const Page = ROUTES[window.location.pathname] ?? LoginPage;
  return <Page />;
}
