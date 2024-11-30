import { getServerSession } from 'next-auth';

import PageComponentWrapper from '@/components/PageComponentWrapper';

import { authOptions } from '@/app/_lib/auth';
import ClientDashboard from '@/app/(authenticated)/_components/client/ClientDashboard';
import DashboardHeader from '@/app/(authenticated)/_components/DashboardHeader';
import ProviderDashboard from '@/app/(authenticated)/_components/provider/ProviderDashboard';
import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <PageComponentWrapper headerComponent={<DashboardHeader />}>
      <>
        {session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER) && (
          <ProviderDashboard />
        )}

        {session?.user_groups.includes(RolesEnum.MEMBER) && <ClientDashboard />}
      </>
    </PageComponentWrapper>
  );
}
