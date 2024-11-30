import BriefcaseIcon from '@/components/icons/BriefcaseIcon';
import DashboardIcon from '@/components/icons/DashboardIcon';
import DoctorIcon from '@/components/icons/DoctorIcon';
import PlayIcon from '@/components/icons/PlayIcon';
import ProfileTwoUsersIcon from '@/components/icons/ProfileTwoUsersIcon';
import TickSquareIcon from '@/components/icons/TickSquareIcon';

import { RolesEnum } from '@/app/(authentication)/register/_utils/register.constants';

export const SIDEBAR_LINKS = [
  {
    id: 1,
    href: '/',
    index: true,
    title: 'Dashboard',
    icon: DashboardIcon,
    access: [RolesEnum.MEMBER, RolesEnum.SERVICE_PROVIDER],
  },
  {
    id: 2,
    href: '/projects',
    title: 'My Projects',
    icon: BriefcaseIcon,
    access: [RolesEnum.MEMBER],
  },
  {
    id: 3,
    href: '/appointments',
    title: 'Appointments',
    icon: TickSquareIcon,
    access: [RolesEnum.SERVICE_PROVIDER, RolesEnum.MEMBER],
  },
  {
    id: 6,
    href: '/clients',
    title: 'Clients',
    icon: ProfileTwoUsersIcon,
    access: [RolesEnum.SERVICE_PROVIDER],
  },
  {
    id: 4,
    href: '/specialists',
    title: 'Specialists',
    icon: DoctorIcon,
    access: [RolesEnum.MEMBER],
  },
  {
    id: 5,
    href: '/blogs',
    title: 'Blogs',
    icon: PlayIcon,
    access: [RolesEnum.MEMBER],
  },
];

export const generateRoleAccessMapper = (): Record<RolesEnum, string[]> => {
  const object = {} as Record<RolesEnum, string[]>;

  SIDEBAR_LINKS.forEach((link) => {
    if (link.href && typeof link.href === 'string') {
      link.access.forEach((role) => {
        if (role in object) {
          object[role].push(link.href);
          return;
        }
        object[role] = [link.href];
      });
    }
  });

  return object;
};

export const isRoleAccessToURL = (roles: RolesEnum[], url: string) => {
  const ROLE_ACCESS_MAPPER = generateRoleAccessMapper();

  // if (url === '/') return true;
  //added
  if (url === '/notification') return true;
  if (url === '/complete-profile') return true;
  if (url === '/subscription') return true;
  if (url === '/professional-profile') return true;
  if (url === '/profile') return true;
  if (url === '/tasks') return true;
  return roles.some((role) => {
    const routes = ROLE_ACCESS_MAPPER[role];
    return routes?.some((route) => route.split('/')[1] === url.split('/')[1]);
  });
};
