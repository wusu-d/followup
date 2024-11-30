import { FieldInputProps, FieldMetaProps } from 'formik';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';

const InputVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const InputSize = ['sm', 'base'] as const;

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldInputProps<string> &
  Partial<FieldMetaProps<string>> & {
    error?: string;
    variant?: (typeof InputVariant)[number];
    size_variant?: (typeof InputSize)[number];
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
  };

const Textarea = ({
  className,
  error,
  variant = 'primary',
  size_variant = 'base',
  value,
  label,
  touched,
  labelClassName,
  containerClassName,
  ...rest
}: TextareaProps) => {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  const memoizedValue = React.useMemo(() => {
    return value;
  }, [value]);
  return (
    <div className={cn('flex flex-col items-start gap-2', containerClassName)}>
      {rest.id && label && (
        <Label
          htmlFor={rest.id}
          className={cn('font-bold text-base', labelClassName)}
        >
          {label}
        </Label>
      )}
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-[10px] border',
          'focus-visible:outline-none focus:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50 focus:shadow-none',

          [
            size_variant === 'sm' && ['px-2 py-1', 'text-base'],

            size_variant === 'base' && ['p-4', 'text-lg lg:text-lg'],
          ],

          [
            variant === 'primary' && [
              'border-[#F2F5F8] bg-[#F2F5F8] focus-visible:ring-primary-black/10 focus:border-[#F2f5f8]',
              [
                touched &&
                  !error &&
                  value &&
                  'bg-primary-green/[0.08] border-primary-green focus-visible:ring-primary-green/50',
              ],
            ],
          ],
          className
        )}
        value={memoizedValue}
        {...rest}
      />

      {touched && error && (
        <div className='pl-1 pt-1 text-xs font-semibold text-red-600'>
          {error}
        </div>
      )}
    </div>
  );
};

export { Textarea };
