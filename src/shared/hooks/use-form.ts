import { FormikHelpers, FormikValues, useFormik } from 'formik';
import { ChangeEvent, FocusEvent, useMemo } from 'react';

type TUseFormParams = {
  initialValues: FormikValues;
  onSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>
  ) => void | Promise<unknown>;
  validationSchema?: unknown;
};

type TCallBack = ((value: unknown) => void) | null;

type TGetFieldPropsOptions = {
  customClasses: string;
  onChangeCallback: TCallBack;
  onBlurCallback: TCallBack;
};

export function useForm({ initialValues, onSubmit, validationSchema }: TUseFormParams) {
  const {
    values,
    touched,
    isValid,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    handleChange: handleChangeFormik,
    handleBlur: handleBlurFormik,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnBlur: false,
    validateOnMount: true,
  });

  const deepAccess = (obj: FormikValues | Record<string, unknown>, path: string): string => {
    const parts = path.split('.');

    const result = parts.reduce<unknown>((acc, current) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[current];
      }
      return undefined;
    }, obj);

    return result !== undefined && result !== null ? String(result) : '';
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    callBack: TCallBack
  ) => {
    handleChangeFormik(event);
    if (callBack) callBack(event.target.value);
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLSelectElement>,
    callBack: TCallBack
  ) => {
    handleBlurFormik(event);
    if (callBack) callBack(event.target.value);
  };

  const getFieldProps = (
    name: string,
    options: TGetFieldPropsOptions = {
      customClasses: '',
      onChangeCallback: null,
      onBlurCallback: null,
    }
  ) => {
    const wasTouched = !!deepAccess(touched, name);

    const fieldProps = {
      id: `input-${name}`,
      name: `${name}`,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        options && handleChange(e, options.onChangeCallback),
      onBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
        options && handleBlur(e, options.onBlurCallback),
      value: deepAccess(values, name),
      checked: Boolean(deepAccess(values, name)),
    };

    const errorMsg = deepAccess(errors, name);
    const hasError = !!(deepAccess(touched, name) && errorMsg);

    return {
      ...fieldProps,
      meta: { errorMsg, hasError, touched: wasTouched },
    };
  };

  const hasChanged = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  return {
    values,
    touched,
    isValid,
    hasChanged,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm,
    setValues,
    getFieldProps,
  };
}
