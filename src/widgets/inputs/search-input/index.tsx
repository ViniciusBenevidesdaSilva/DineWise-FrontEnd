import { useState } from 'react';

import { Search } from 'lucide-react';

type TSearchInputProps = {
  inputName: string;
  onChange: (value: string) => void;
  formatInputValue?: (value: string) => string;
};

export function SearchInput({
  inputName,
  onChange,
  formatInputValue = undefined,
}: Readonly<TSearchInputProps>) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (value: string) => {
    let newValue = value;

    if (formatInputValue) {
      newValue = formatInputValue(value);
    }

    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <div className='relative w-full my-6 shadow-sm text-functional-heavy-medium'>
      <label
        htmlFor={`${inputName}-search`}
        aria-label={`Buscar por ${inputName}`}
        className='hidden'
      >
        {`Buscar por ${inputName}`}
      </label>
      <input
        type='text'
        id={`${inputName}-search`}
        placeholder={`Buscar por ${inputName}`}
        autoComplete='off'
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        className='w-full rounded-lg px-6 py-2 pr-10'
      />
      <Search className='absolute right-6 top-1/2 transform -translate-y-1/2 text-functional-heavy-light' />
    </div>
  );
}
