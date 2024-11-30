import { PropsWithChildren } from 'react';

import RegisterWrapper from '@/app/(authentication)/register/_components/register-wrapper';

const RegisterLayout = ({ children }: PropsWithChildren) => {
  return <RegisterWrapper>{children}</RegisterWrapper>;
};

export default RegisterLayout;
