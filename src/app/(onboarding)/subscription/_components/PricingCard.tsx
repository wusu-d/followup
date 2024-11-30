import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { PiCheck, PiX } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { SubscriptionType } from '@/slices/service-provider-subscription.slice';
import { formatToCurrency } from '@/utils/forrmatCurrency';

const features = [
  {
    title: 'Lorem ipsum dolor sit amet',
    available: true,
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    available: true,
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    available: true,
  },
];

const PricingCard = ({
  activePlan,
  onSelectPlan,
  ...pricing
}: SubscriptionType & {
  onSelectPlan?: (plan: SubscriptionType, free?: boolean) => void;
  activePlan?: number;
}) => {
  const [spotlight, setSpotlight] = useState<boolean>(false);
  // const { description, features, price, title, discount, spotlight } = pricing;
  const { description, price, name, billing_cycle, id } = pricing;

  function handleSelectPlan(free?: boolean) {
    onSelectPlan && onSelectPlan(pricing, free);
  }
  console.log(activePlan);

  return (
    <Card
      onMouseEnter={() => setSpotlight(true)}
      onMouseLeave={() => setSpotlight(false)}
      className={cn(
        'rounded-2xl py-6 text-[#052536] shrink-0 px-4',
        activePlan === id &&
          'border-[#16C098] border-2 bg-[#F2F5F8CC] pointer-events-none ',
        spotlight && ['primary-gradient text-white']
      )}
    >
      <CardHeader className='text-center'>
        <CardTitle className='text-xl text-start font-bold pb-2 flex-row justify-between items-center relative'>
          {name}

          {activePlan === id && (
            <p className='w-7 h-7 text-white rounded-full bg-primary-green absolute top-0 right-4 flex items-center justify-center'>
              <FaCheck />
            </p>
          )}
        </CardTitle>
        <CardDescription className='text-start'>
          {description ||
            `Billed at ${
              billing_cycle === 'yearly'
                ? formatToCurrency(price * 12)
                : formatToCurrency(price)
            } ${billing_cycle === 'yearly' ? 'yearly' : 'monthly'}`}
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col gap-5 mt-5'>
        <p className='flex items-center gap-4'>
          <span className='h1'>{formatToCurrency(price)}</span>{' '}
          <span> / Month</span>
        </p>

        <Button
          variant={spotlight ? 'white' : 'outline'}
          onClick={() => handleSelectPlan(false)}
        >
          Get Started Now
        </Button>

        <TextButton
          className='underline'
          onClick={() => handleSelectPlan(true)}
        >
          Start with 2 Months Trial
        </TextButton>
      </CardContent>

      <CardFooter>
        <ul className='flex flex-col gap-2 invisible'>
          {features.map(({ available, title }, index) => {
            return (
              <li key={index} className='flex gap-3 items-center'>
                <span
                  className={cn(
                    'block p-2 rounded-full',
                    spotlight && ['bg-light-green text-[#03847A]']
                  )}
                >
                  {available ? <PiCheck /> : <PiX />}
                </span>
                <span>{title}</span>
              </li>
            );
          })}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
