'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { useGetProjectDetailsQuery } from '@/rtk-query/projects';

const MyProjectsHeader = ({ projectId }: { projectId: string }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { data: projectDetails } = useGetProjectDetailsQuery(projectId);

  const clientId = pathname.includes('/clients/')
    ? pathname.split('/clients/')[1].split('/')[0]
    : null;

  const backLink =
    session?.user_groups.includes(RolesEnum.SERVICE_PROVIDER) && clientId
      ? `/clients/${clientId}`
      : '/projects';

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={backLink}>My Projects</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{projectDetails?.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MyProjectsHeader;
