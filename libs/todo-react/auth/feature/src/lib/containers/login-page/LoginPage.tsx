import { LoginForm } from '@todo-react/auth-feature-login';
import AuthPageWrapper from '../../components/auth-page-wrapper/AuthPageWrapper';

/* eslint-disable-next-line */
export interface LoginPageProps {}

export function LoginPage(props: LoginPageProps) {
  return (
    <AuthPageWrapper>
      <LoginForm />
    </AuthPageWrapper>
  );
}

export default LoginPage;
