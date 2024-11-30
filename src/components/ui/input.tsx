import { FieldInputProps, FieldMetaProps } from 'formik';
import * as React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import { Label } from '@/components/ui/label';

const InputVariant = ['primary', 'outline', 'ghost', 'light', 'dark'] as const;
const InputSize = ['sm', 'base'] as const;

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldInputProps<string> &
  Partial<FieldMetaProps<string>> & {
    error?: string;
    variant?: (typeof InputVariant)[number];
    size_variant?: (typeof InputSize)[number];
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
    isMoneyInput?: boolean;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      variant = 'primary',
      size_variant = 'base',
      value,
      label,
      touched,
      labelClassName,
      containerClassName,
      isMoneyInput,
      ...rest
    },
    ref
  ) => {
    delete rest.initialError;
    delete rest.initialTouched;
    delete rest.initialValue;

    const [hidden, setHidden] = React.useState<boolean>(true);

    const toggleVisibility = (): void => {
      setHidden((prevState) => !prevState);
    };

    const memoizedValue = React.useMemo(() => {
      if (type === 'number') {
        // format number here
      }

      return value;
    }, [type, value]);

    return (
      <div
        className={cn(
          'flex flex-col gap-2 items-start w-full',
          containerClassName
        )}
      >
        {rest.id && label && (
          <Label
            htmlFor={rest.id}
            className={cn('font-bold text-base', labelClassName)}
          >
            {label}
          </Label>
        )}
        <div className='w-full relative'>
          <input
            type={type === 'password' ? (hidden ? 'password' : 'text') : type}
            autoComplete='off'
            className={cn(
              'flex w-full rounded-[10px] border',
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
              isMoneyInput && 'pl-8',
              className
            )}
            {...rest}
            value={memoizedValue}
            ref={ref}
          />

          {type === 'password' && (
            <span className='absolute top-1/2 -translate-y-1/2 right-4 -translate-x-1/2'>
              {!hidden ? (
                <span
                  onClick={toggleVisibility}
                  className='text-primary-black select-none text-base font-medium'
                >
                  <PiEye />
                </span>
              ) : (
                <span
                  onClick={toggleVisibility}
                  className='text-primary-black select-none text-base font-medium'
                >
                  <PiEyeSlash />
                </span>
              )}
            </span>
          )}
          {isMoneyInput && (
            <div className='absolute top-1/2 -translate-y-1/2 left-5 -translate-x-1/2'>
              <span className='text-primary-black select-none text-base font-medium'>
                <BsCurrencyDollar size={20} />
              </span>
            </div>
          )}
        </div>

        {touched && error && (
          <div className='pl-1 pt-1 text-xs font-semibold text-red-600'>
            {error}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
