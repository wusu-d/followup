'use client';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';

import ActiveLink from '@/components/links/ActiveLink';
import ButtonLink from '@/components/links/ButtonLink';
import { Button } from '@/components/ui/button';
import FollowUpLogo from '@/components/ui/followup-logo';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function TopNavbar() {
  const { data: session } = useSession();
  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70'>
      <div className='container mix-blend-normal h-20 flex items-center'>
        <div className='max-w-7xl w-full flex items-center justify-between mx-auto'>
          <div className='flex items-center gap-2'>
            <FollowUpLogo href='https://followu.ca' className='w-32' />
            <span className='sr-only'>FollowUp</span>
          </div>
          <nav className='hidden items-center gap-8 text-sm font-medium lg:flex'>
            <ActiveLink
              openNewTab={false}
              href='https://followu.ca'
              className='text-xl font-medium'
              activeClassName='text-primary-green font-bold'
              index
              variant='basic'
            >
              Home
            </ActiveLink>
            <ActiveLink
              openNewTab={false}
              href='https://followu.ca/about'
              className='text-xl font-medium'
              activeClassName='text-primary-green font-bold'
              variant='basic'
            >
              About Us
            </ActiveLink>
            <ActiveLink
              href='/articles'
              className='text-xl font-medium'
              activeClassName='text-primary-green font-bold'
              variant='basic'
            >
              Blogs
            </ActiveLink>

            {!session?.access_token && (
              <ButtonLink
                target='_blank'
                href='https://dashboard.followu.ca/'
                className='px-8 py-2.5 font-bold text-xl'
              >
                Sign Up
              </ButtonLink>
            )}
          </nav>
          <div className='flex items-center gap-4 lg:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='rounded-full lg:hidden'
                >
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='lg:hidden'>
                <div className='grid gap-4 p-4'>
                  <ActiveLink
                    openNewTab={false}
                    href='https://followu.ca/'
                    className='text-xl font-medium'
                    activeClassName='text-primary-green font-bold'
                    index
                    variant='basic'
                  >
                    Home
                  </ActiveLink>
                  <ActiveLink
                    openNewTab={false}
                    href='https://followu.ca/about'
                    className='text-xl font-medium'
                    activeClassName='text-primary-green font-bold'
                    variant='basic'
                  >
                    About Us
                  </ActiveLink>
                  <ActiveLink
                    href='/articles'
                    className='text-xl font-medium'
                    activeClassName='text-primary-green font-bold'
                    variant='basic'
                  >
                    Blogs
                  </ActiveLink>

                  {!session?.access_token && (
                    <ButtonLink
                      target='_blank'
                      href='https://dashboard.followu.ca/'
                      className='px-8 font-bold text-xl'
                    >
                      Sign Up
                    </ButtonLink>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
