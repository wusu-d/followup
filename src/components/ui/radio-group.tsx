'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { FieldInputProps, FieldMetaProps } from 'formik';
import * as React from 'react';
import { PiCheckCircleFill } from 'react-icons/pi';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
    Partial<FieldInputProps<string>> &
    Partial<FieldMetaProps<string>>
>(({ className, ...props }, ref) => {
  delete props.initialError;
  delete props.initialTouched;
  delete props.initialValue;
  delete props.touched;
  delete props.onChange;

  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, onClick, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'peer h-6 w-6 shrink-0 rounded-full',
        'border border-primary-green',
        'text-primary-green ring-offset-white',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <RadioGroupPrimitive.Indicator
        className={cn('flex items-center justify-center text-[0.75em]')}
      >
        <PiCheckCircleFill className='w-full h-auto aspect-square' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
