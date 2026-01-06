import { forwardRef } from 'react';
import styles from './input.module.scss';
import { InputProps } from './input.type';

const InputAtom = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      value,
      onChange,
      disabled = false,
      name,
      min,
      rightAddOn,
      ...props
    },
    ref,
  ) => {
    return rightAddOn ? (
      <div className={styles.input}>
        <input
          ref={ref} // Attach the ref to the input element
          placeholder={placeholder}
          value={value}
          min={min}
          disabled={disabled}
          onChange={onChange}
          name={name}
          {...props}
        />
        <div className={styles.rightAddOn}>
          <span>{rightAddOn}</span>
        </div>
      </div>
    ) : (
      <div className={styles.input}>
        <input
          ref={ref} // Attach the ref to the input element
          placeholder={placeholder}
          value={value}
          min={min}
          disabled={disabled}
          onChange={onChange}
          name={name}
          {...props}
        />
      </div>
    );
  },
);

export default InputAtom;
