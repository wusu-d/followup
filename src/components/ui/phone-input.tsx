import { CheckIcon } from 'lucide-react';
import * as React from 'react';
import { PiCaretDown } from 'react-icons/pi';
import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ScrollArea } from './scroll-area';

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
  },
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput = ({
  className,
  onChange,
  label,
  labelClassName,
  containerClassName,
  autoFocus,
  ...props
}: PhoneInputProps) => {
  const [_, setCountry] = React.useState<RPNInput.Country>();

  return (
    <div
      className={cn(
        'flex flex-col gap-2 items-start w-full',
        containerClassName
      )}
    >
      {props.id && label && (
        <Label
          htmlFor={props.id}
          className={cn('font-bold text-base', labelClassName)}
        >
          {label}
        </Label>
      )}
      <RPNInput.default
        // ref={ref}
        className={cn('flex w-full', className)}
        countrySelectComponent={CountrySelect}
        inputComponent={Input}
        onCountryChange={setCountry}
        defaultCountry='US'
        numberInputProps={{
          className: 'rounded-l-none',
          autoFocus,
        }}
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */

        onChange={(value) => {
          onChange?.((value || '') as RPNInput.Value);
        }}
        focusInputOnCountrySelection
        international
        initialValueFormat='national'
        {...props}
      />
    </div>
  );
};

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country);
    },
    [onChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className={cn(
            'flex h-auto gap-1 rounded-e-none rounded-s-lg px-3 py-3.5'
          )}
          disabled={disabled}
        >
          <FlagComponent country={value} countryName={value} />
          <PiCaretDown
            className={cn(
              '-mr-2 h-4 w-4 opacity-50',
              disabled ? 'hidden' : 'opacity-100'
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandList>
            <ScrollArea className='h-72'>
              <CommandInput placeholder='Search country...' />
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {options
                  .filter((x) => x.value)
                  .map((option) => (
                    <CommandItem
                      className='gap-2'
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <FlagComponent
                        country={option.value}
                        countryName={option.label}
                      />
                      <span className='flex-1 text-sm'>{option.label}</span>
                      {option.value && (
                        <span className='text-foreground/50 text-sm'>
                          {`+${RPNInput.getCountryCallingCode(option.value)}`}
                        </span>
                      )}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          option.value === value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className='bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm'>
      {Flag && <Flag title={countryName} />}
    </span>
  );
};
FlagComponent.displayName = 'FlagComponent';

export { PhoneInput };
