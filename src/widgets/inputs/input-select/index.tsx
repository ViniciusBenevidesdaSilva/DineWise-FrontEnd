import { SelectHTMLAttributes, useState } from 'react';

import { ChevronDown } from 'lucide-react';

type TInputSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { id: string | number; nome: string }[];
  divClassName?: string;
  disabledOptionLabel?: string;
  inputSize?: 'normal' | 'small';
  meta?: {
    hasError?: boolean;
    errorMsg?: string;
  };
};

export function InputSelect({
  label,
  options,
  divClassName = '',
  disabledOptionLabel = 'Selecione uma opção',
  inputSize = 'normal',
  meta: { hasError = false, errorMsg = '' } = {},
  ...restProps
}: Readonly<TInputSelectProps>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`${divClassName} flex flex-col items-start gap-1 mb-4 text-functional-heavy-dark`}
    >
      <label
        htmlFor={restProps.id}
        className={`capitalize font-medium ${inputSize === 'normal' ? 'text-base' : 'text-sm'}`}
      >
        {label}:
      </label>
      <div className='relative w-full'>
        <select
          className={`w-full rounded-md ring-1 appearance-none ${inputSize === 'normal' ? 'text-base py-2 px-4' : 'text-sm py-1 px-2'} ${hasError ? 'ring-feedback-danger-medium' : 'ring-functional-heavy-lightest focus:ring-brand-primary-dark'}`}
          value={restProps.value}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
          {...restProps}
        >
          <option value='' disabled>
            {disabledOptionLabel}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nome}
            </option>
          ))}
        </select>
        <span
          className={`absolute ${inputSize === 'normal' ? 'top-2 right-4' : 'top-2 right-2'} pointer-events-none text-functional-heavy-medium transition-transform duration-200 ${isFocused ? 'rotate-180' : ''}`}
        >
          <ChevronDown size={inputSize === 'normal' ? 24 : 16} />
        </span>
      </div>
      {hasError && (
        <span
          className={`${inputSize === 'normal' ? 'text-sm' : 'text-xs'} text-feedback-danger-medium`}
        >
          {errorMsg}
        </span>
      )}
    </div>
  );
}
