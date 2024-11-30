import LoginRegisterWrapper from '@/app/(authentication)/_components/login-register.wrapper';
import SignUpForm from '@/app/(authentication)/register/_components/SignUpForm';

const SignUpUser = () => {
  return (
    <LoginRegisterWrapper>
      <SignUpForm />
    </LoginRegisterWrapper>
  );
};

export default SignUpUser;
