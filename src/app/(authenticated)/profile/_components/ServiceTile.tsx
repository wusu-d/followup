import React, { useState } from 'react';
import { toast } from 'sonner';

import logger from '@/lib/logger';

import DeleteServiceButton from '@/app/(authenticated)/profile/_components/DeleteServiceButton';
import { useDeleteServiceMutation } from '@/rtk-query/professional-profile';
import { UserServices } from '@/rtk-query/professional-profile/types';

const ServiceTile = ({
  name,
  id,
  refetch,
  services,
}: {
  name: string;
  id: number;
  services: UserServices[];
  refetch: () => void;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteService, { isLoading }] = useDeleteServiceMutation();

  const handleDelete = async () => {
    if (services.length === 1) {
      toast.error('You need at least one service');
      return;
    }
    try {
      await deleteService(`${id}`).unwrap();
      refetch();
      setIsDeleteModalOpen(false);
      toast.error('Wellness Service deleted successfully');
    } catch (error) {
      logger(error);
    }
  };

  return (
    <div className='bg-[#16C09814] border-primary-green rounded-[10px] border px-6 py-4 flex justify-between font-medium text-lg text-black'>
      {name}
      <DeleteServiceButton
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ServiceTile;
