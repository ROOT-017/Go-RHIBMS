import { Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { ButtonPrimary } from './ButtonPrimary';
import { ButtonBaseProps } from './Button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubmitButtonProps<T = any> = {
  form: FormInstance<T>;
} & Omit<ButtonBaseProps, "htmlType" | "form" | "type">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SubmitButton = <T = any>({ form, children, ...props }: SubmitButtonProps<T>) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setSubmittable(true);
      })
      .catch((e) => {
        const internal = e as unknown as { errorFields?: unknown[], values: T, outOfDate: boolean };
        if (Array.isArray(internal?.errorFields) && internal.errorFields.length > 0) {
          setSubmittable(false);
        } else {
          setSubmittable(true);
        }
      });
  }, [form, values]);

  return (
    <ButtonPrimary {...props} htmlType="submit" disabled={!submittable}>
      {children}
    </ButtonPrimary>
  );
};