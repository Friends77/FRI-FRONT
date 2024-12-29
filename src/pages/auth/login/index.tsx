import LoginForm from '@/components/auth/Form/LoginForm';
import SocialLoginForm from '@/components/auth/Form/SocialLoginForm';

const LoginPage = () => {
  return (
    <main>
      <LoginForm />
      <SocialLoginForm />
    </main>
  );
};

export default LoginPage;
