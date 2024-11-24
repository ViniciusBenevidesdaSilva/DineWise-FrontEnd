import { InputHTMLAttributes } from 'react';

type TInputCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  dangerColor?: boolean;
  meta?: {
    hasError?: boolean;
    errorMsg?: string;
  };
};

export function InputCheckbox({ label, dangerColor = false, ...restProps }: TInputCheckboxProps) {
  return (
    <div className='flex items-center justify-center w-full'>
      <input
        type='checkbox'
        className={`basis-1/6 h-4 w-4 lg:h-5 lg:w-5 ${dangerColor && 'danger'}`}
        {...restProps}
      />
      <label
        htmlFor={restProps.id}
        className={`basis-5/6 ml-2 text-sm lg:text-base text-functional-heavy-medium ${label ? 'visible' : 'hidden'}`}
      >
        {label ?? restProps.name}
      </label>
    </div>
  );
}
