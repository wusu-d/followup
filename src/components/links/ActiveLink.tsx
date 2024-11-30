'use client';

import { cn } from '@/lib/utils';
import useCheckLinkActive from '@/hooks/useCheckLinkActive';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';

type ActiveLinkProps<C extends React.ElementType> = {
  componentAs?: C;
  as?: string;
  activeClassName?: string;
  index?: boolean;
} & UnstyledLinkProps &
  React.ComponentProps<C>;

function ActiveLink<C extends React.ElementType>({
  children,
  componentAs,
  as,
  className,
  activeClassName,
  href,
  index = false,
  ...rest
}: ActiveLinkProps<C>) {
  const isActive = useCheckLinkActive(href.toString(), as, index);

  const Component = componentAs || UnstyledLink;
  return (
    <Component
      {...rest}
      href={href}
      className={cn(
        'focus-visible:ring-primary-green/10 focus:outline-none focus-visible:ring focus-visible:ring-offset-2',
        [className && className],
        [isActive && activeClassName && activeClassName]
      )}
    >
      {children}
    </Component>
  );
}

export default ActiveLink;
