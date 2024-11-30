'use client';

import {
  ComponentType,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { useAppSelector } from '@/store';

import { useGetServicesQuery } from '@/rtk-query/professional-profile';
type ServiceContextType = {
  areas:
    | {
        id: number;
        name: string;
        Icon: ComponentType;
        color: string;
        href: string;
      }[]
    | undefined;
  isLoading: boolean;
  challenges: ServiceChallengeType[];
  setChallenges: (challenges: ServiceChallengeType[]) => void;
  serviceId: string;
  setServiceId: (id: string) => void;
};

type ServiceChallengeType = {
  id: number;
  service_id: number;
  name: string;
  Icon: ComponentType;
  color: string;
  href: string;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServiceContext must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [serviceId, setServiceIdInternal] = useState<string>('');
  const [challenges, setChallengesInternal] = useState<ServiceChallengeType[]>(
    []
  );
  const { isLoading } = useGetServicesQuery(undefined);

  const setChallenges = useCallback((challenges: ServiceChallengeType[]) => {
    setChallengesInternal(challenges);
  }, []);

  const setServiceId = useCallback((id: string) => {
    setServiceIdInternal(id);
  }, []);

  const { areas } = useAppSelector((state) => state['specialist']);

  return (
    <ServiceContext.Provider
      value={{
        areas,
        isLoading,
        challenges,
        setChallenges,
        serviceId,
        setServiceId,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
