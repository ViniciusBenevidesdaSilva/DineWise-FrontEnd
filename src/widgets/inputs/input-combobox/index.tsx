import { InputCheckbox } from '../input-checkbox';

export type ComboBoxOption = {
  id: number;
  nome: string;
  dangerColor?: boolean;
};

type TInputComboBoxProps = {
  label?: string;
  options: ComboBoxOption[];
  selectedOptions: number[];
  setSelectedOptions: (ids: number[]) => void;
  meta?: {
    hasError?: boolean;
    errorMsg?: string;
  };
};

export function InputComboBox({
  label = '',
  options,
  selectedOptions,
  setSelectedOptions,
  meta: { hasError = false, errorMsg = '' } = {},
}: Readonly<TInputComboBoxProps>) {
  const handleCheckboxChange = (id: number) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter((optionId) => optionId !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  return (
    <div className='flex flex-col items-start gap-1 mb-4 text-functional-heavy-dark'>
      <span className={`capitalize font-medium ${label ? 'visible' : 'hidden'}`}>{label}:</span>
      <div className='relative flex flex-col gap-1 w-full max-h-36 overflow-y-auto rounded-md p-2'>
        {options.map((option) => (
          <InputCheckbox
            key={option.id}
            label={option.nome}
            id={`option-${option.nome}`}
            dangerColor={option.dangerColor}
            checked={selectedOptions.includes(option.id)}
            onChange={() => handleCheckboxChange(option.id)}
          />
        ))}
      </div>
      {hasError && <span className='text-sm text-feedback-danger-medium'>{errorMsg}</span>}
    </div>
  );
}
