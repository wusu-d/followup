'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useGetServicesQuery } from '@/rtk-query/professional-profile';
import { useGetServicesChallengesQuery } from '@/rtk-query/services';

const ChallengeSpecialistsHeader = () => {
  const { categoryId, challengeId } = useParams();
  const { data } = useGetServicesQuery(undefined);
  const { data: challenges } = useGetServicesChallengesQuery(challengeId);

  const category = data?.find((service) => service.id === Number(categoryId));
  const challenge = challenges?.find(
    (challenge) => challenge.id === Number(challengeId)
  );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/specialists'>Specialists</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href='/specialists'>Categories</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/specialists/${categoryId}`}>
              {category?.name || 'Category'}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{challenge?.name || 'Challenge'}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ChallengeSpecialistsHeader;
