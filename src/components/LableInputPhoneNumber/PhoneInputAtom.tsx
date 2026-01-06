import styles from './input.module.scss';

import { InputProps } from './input.type';

const PhoneInputAtom: React.FC<Omit<InputProps, 'prefix'>> = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  name,
  min,
  addOn,
  ...props
}) => {
  return (
    <div className={styles.input}>
      <div className="">{addOn}</div>
      <input
        placeholder={placeholder}
        value={value}
        min={min}
        disabled={disabled}
        onChange={onChange}
        name={name}
        style={{
          outline: 'none!important',
          border: 'none!important',
          width: '100%',
          paddingLeft: '5px',
        }}
        {...props}
      />
    </div>
  );
};

export default PhoneInputAtom;
