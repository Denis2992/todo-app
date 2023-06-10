import { SignUpForm } from '@todo-react/auth-feature-sign-up';
import AuthPageWrapper from '../../components/auth-page-wrapper/AuthPageWrapper';

/* eslint-disable-next-line */
export interface SignUpPageProps {}

export function SignUpPage(props: SignUpPageProps) {
  return (
    <AuthPageWrapper>
      <SignUpForm />
    </AuthPageWrapper>
  );
}

export default SignUpPage;
