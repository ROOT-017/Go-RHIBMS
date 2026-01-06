import { forwardRef } from 'react';
import styles from './labeled.module.scss';
import InputAtom from '../Input/Input.atom';
import { LabeledInputProps } from './labeledinput.type';
import { ErrorLabel } from '../Input/ErrorLabel';
import { Input } from 'antd';

const LabeledInputMolecule = forwardRef<HTMLInputElement, LabeledInputProps>(
  (
    {
      inputProps: { style, ...inputProps },
      label,
      required,
      error,
      readOnly,
      version = 'custom',
    },
    ref,
  ) => {
    const { size, ...defaultProp } = inputProps;
    return (
      <div className={styles.labeled__input}>
        <div className={styles.label}>
          <label htmlFor={inputProps.name}>
            {label}{' '}
            {required ? (
              <span className="text-errorColor ml-[5px]">*</span>
            ) : (
              ''
            )}
          </label>
        </div>
        {readOnly ? (
          <p
            className={`${error ? 'border-[#ff4d4f]' : 'border-[#CECDD3]'} text-gray-600 border-solid border-[1px] hover:bg-[#F9F9F9] min-h-[44px] rounded-[10px] flex items-center p-4 cursor-text`}
          >
            {inputProps.value}
          </p>
        ) : version == 'custom' ? (
          <InputAtom
            {...inputProps}
            ref={ref} // Pass the ref to InputAtom
            style={{
              ...(style ?? {}),
              ...(error ? { border: '1px solid #ff4d4f' } : {}),
            }}
          />
        ) : (
          <Input {...defaultProp} readOnly={readOnly} size="middle" />
        )}
        <ErrorLabel error={error} className="absolute !text-[1.4rem]" />
      </div>
    );
  },
);

export default LabeledInputMolecule;
