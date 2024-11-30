'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useAppSelector } from '@/store';

const SpecialistPortfolioHeader = () => {
  const router = useRouter();
  const pathName = usePathname();
  const segments = pathName.split('/');
  const cleanPath = pathName.replace('/specialist/portfolio', '');
  const specialistPath = pathName.replace('/portfolio', '');
  const thirdElement = segments[3];
  const { providerPortfolio } = useAppSelector(
    (state) => state['specialist']
  );
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`${cleanPath}`} className='capitalize'>
              {thirdElement}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`${specialistPath}`} className='capitalize'>
              {providerPortfolio?.work.professional_name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Portfolio</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default SpecialistPortfolioHeader;
