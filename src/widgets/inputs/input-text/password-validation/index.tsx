import { CircleCheck, CircleX } from 'lucide-react';

type Validation = {
  id: string;
  text: string;
  valid: boolean;
};

type TPasswordValidationProps = {
  password: string;
  showPasswordValidation: boolean;
  hasError?: boolean;
};

type TPasswordValidationItemProps = {
  validation: Validation;
  hasError: boolean;
};

function PasswordValidationItem({ validation, hasError }: Readonly<TPasswordValidationItemProps>) {
  let textColor = 'text-functional-heavy-medium';

  if (validation.valid) {
    textColor = 'text-feedback-success-dark';
  } else if (hasError) {
    textColor = 'text-feedback-danger-medium';
  }

  return (
    <li className={`flex items-center gap-3 ${textColor}`}>
      {validation.valid ? <CircleCheck size={18} /> : <CircleX size={18} />}
      <span className='flex-1 text-sm'>{validation.text}</span>
    </li>
  );
}

export function PasswordValidation({
  password,
  showPasswordValidation,
  hasError = false,
}: Readonly<TPasswordValidationProps>) {
  const validations = [
    {
      id: 'min-size',
      text: 'Senha deve ter no mínimo 6 caracteres',
      valid: password.length >= 6,
    },
    {
      id: 'has-latter',
      text: 'Senha deve conter ao menos uma letra',
      valid: /[a-zA-Z]/.test(password),
    },
    {
      id: 'has-number',
      text: 'Senha deve conter ao menos um número',
      valid: /\d/.test(password),
    },
    {
      id: 'has-special-character',
      text: 'Senha deve conter ao menos um caractere especial',
      valid: /[!@#$%^&*(),.?":;{}|<>]/.test(password),
    },
  ];

  return (
    <section
      className={`transition-all duration-500 overflow-hidden pointer-events-none ${
        showPasswordValidation ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <ul className='list-none flex flex-col gap-2 py-2'>
        {validations.map((validation) => (
          <PasswordValidationItem key={validation.id} validation={validation} hasError={hasError} />
        ))}
      </ul>
    </section>
  );
}
