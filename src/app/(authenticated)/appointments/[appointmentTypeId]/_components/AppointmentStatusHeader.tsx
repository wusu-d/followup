'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { useAppSelector } from '@/store';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';
import { APPOINTMENTS_SLICE_REDUCER_NAME } from '@/slices/appointments.slice';

const AppointmentStatusHeader = () => {
  const { appointmentTypeId } = useParams();
  const { data: session } = useSession();
  const isClient = session?.user_groups.includes(RolesEnum.MEMBER);
  const { appointment } = useAppSelector(
    (state) => state[APPOINTMENTS_SLICE_REDUCER_NAME]
  );

  // const appointmentType = useMemo(() => {
  //   if (appointmentTypeId) {
  //     const currCategory = appointmentStatus.find(({ href }) => {
  //       return appointmentTypeId === href;
  //     });

  //     if (currCategory) {
  //       return currCategory;
  //     }
  //   }

  //   return notFound();
  // }, [appointmentTypeId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/appointments'>Appointments</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem className='capitalize'>
          <BreadcrumbLink asChild>
            <Link
              href={`/appointments?type=${
                ['pending', 'upcoming'].includes(
                  appointment?.status?.toLowerCase() || ''
                )
                  ? appointment?.status?.toLowerCase()
                  : 'past'
              }`}
            >
              {appointment?.status}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {isClient ? appointment?.provider_name : appointment?.client_name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppointmentStatusHeader;
