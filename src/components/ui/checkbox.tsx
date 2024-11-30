'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { FieldInputProps, FieldMetaProps } from 'formik';
import { Check } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  Partial<FieldInputProps<boolean>> &
  Partial<FieldMetaProps<boolean>> & {
    setValue?: (value: boolean, shouldValidate: boolean) => void;
  };
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, setValue, value, ...props }, ref) => {
  delete props.initialError;
  delete props.initialTouched;
  delete props.initialValue;
  delete props.touched;
  delete props.error;
  delete props.onChange;
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-6 w-6 shrink-0 rounded-full',
        'flex items-center justify-center',
        'border border-primary-green/20 ring-offset-white',
        'data-[state=checked]:bg-primary-green data-[state=checked]:text-white data-[state=checked]:border-primary-green',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-green/20 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
      checked={!!value}
      onCheckedChange={() => {
        setValue && setValue(!value, true);
      }}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-[0.75em]')}
      >
        <Check className='w-4/5 h-auto aspect-square' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
