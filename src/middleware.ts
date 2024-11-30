import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

import { isRoleAccessToURL } from '@/utils/rbac';

export default withAuth(function middleware(request: NextRequestWithAuth) {
  const token = request.nextauth.token?.data;
  const role = token?.user_groups;

  if (!token) return NextResponse.redirect(new URL('/login', request.url));
  if (!role) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  const isRoleHaveAccess = isRoleAccessToURL(role, request.nextUrl.pathname);

  if (token.profile_status === 'incomplete') {
    if (request.nextUrl.pathname !== '/complete-profile') {
      return NextResponse.redirect(new URL('/complete-profile', request.url));
    }
  }

  if (!isRoleHaveAccess) {
    return NextResponse.redirect(new URL('/', request.url));
  }
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|verify-mail|contact|terms|privacy|forgot-password|articles|favicon|assets|fonts|svg|images|serviceWorker).*)',
  ],
};
