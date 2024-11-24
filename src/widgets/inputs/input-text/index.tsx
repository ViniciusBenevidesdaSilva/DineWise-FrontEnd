import { InputHTMLAttributes, ReactElement, useCallback, useMemo, useRef, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { PasswordValidation } from './password-validation';

type TInputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  showPasswordTips?: boolean;
  divClassName?: string;
  inputSize?: 'normal' | 'small';
  meta?: {
    hasError?: boolean;
    errorMsg?: string;
  };
};

export function InputText({
  label,
  type = 'text',
  showPasswordTips = false,
  divClassName = '',
  inputSize = 'normal' as 'normal' | 'small',
  meta: { hasError = false, errorMsg = '' } = {},
  ...restProps
}: Readonly<TInputTextProps>) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState<boolean>(false);

  const inputType = useMemo<string>(() => {
    return type === 'password' && showPassword ? 'text' : type;
  }, [showPassword, type]);

  const Icon = useMemo<ReactElement>(() => {
    if (type === 'password') {
      return (
        <div className='absolute h-full right-0 pr-3 flex items-center'>
          <button
            className={`${hasError ? 'text-feedback-danger-medium' : 'text-functional-heavy-light'}`}
            type='button'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      );
    }

    return <></>;
  }, [showPassword, type, hasError]);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setShowPasswordValidation(type === 'password' && showPasswordTips);

      if (restProps.onFocus) {
        restProps.onFocus(e);
      }
    },
    [restProps, showPasswordTips, type]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setShowPasswordValidation(false);

      if (restProps.onFocus) {
        restProps.onFocus(e);
      }
    },
    [restProps]
  );

  return (
    <div
      className={`${type} ${divClassName} flex flex-col items-start gap-1 ${inputSize === 'normal' ? 'mb-4' : 'mb-1'} text-functional-heavy-dark`}
    >
      <label
        htmlFor={restProps.id}
        className={`capitalize font-medium ${inputSize === 'normal' ? 'text-base' : 'text-sm'} ${label === undefined && 'hidden'}`}
      >
        {label ?? restProps.name}:
      </label>
      <div className='flex w-full relative'>
        <input
          ref={inputRef}
          type={inputType}
          className={`w-full rounded-md ring-1 aria-[readonly=true]:ring-feedback-danger-medium ${inputSize === 'normal' ? 'text-base py-2 px-4' : 'text-sm py-1 px-2'} ${type === 'password' && 'pr-10'} ${hasError ? 'ring-feedback-danger-medium' : 'ring-functional-heavy-lightest focus:ring-brand-primary-dark'}`}
          onFocusCapture={handleFocus}
          onBlurCapture={handleBlur}
          {...restProps}
        />
        {Icon}
      </div>
      <span
        className={`${inputSize === 'normal' ? 'text-sm' : 'text-xs'} text-feedback-danger-medium transition-all duration-500 ${
          hasError && !showPasswordValidation ? 'opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {errorMsg}
      </span>
      <PasswordValidation
        password={inputRef.current?.value ?? ''}
        showPasswordValidation={showPasswordValidation}
        hasError={hasError}
      />
    </div>
  );
}
