import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
const UnderlineLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'gray',
] as const;
const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  UnstyledLinkProps & {
    variant?: (typeof UnderlineLinkVariant)[number];
  }
>(({ children, className, variant, ...rest }, ref) => {
  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={cn(
        'animated-underline text-primary-green custom-link inline-flex items-center font-medium',
        'focus-visible:ring-primary-green/10 focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-offset-2',
        'border-b-primary-green border-dotted hover:border-primary-green/0',
        variant === 'gray' && ['text-[#1111117A]', ''],
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
});

export default UnderlineLink;
