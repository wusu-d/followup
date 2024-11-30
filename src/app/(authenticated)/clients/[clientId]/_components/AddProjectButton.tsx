'use client';
import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import { usePathname } from 'next/navigation';

const AddProjectButton = () => {
  const pathname = usePathname();
  return (
    <UnstyledLink href={`${pathname}/add-project`}>
      <Button className='px-[50px]'>Add Project</Button>;
    </UnstyledLink>
  );
};

export default AddProjectButton;
