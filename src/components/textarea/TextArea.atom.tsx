import styles from './textarea.module.css';

import { TextAreaProps } from './textarea.type';

const TextAreaAtom: React.FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  name,
  styles: customStyles,
}) => {
  return (
    <textarea
      cols={5}
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      name={name}
      style={customStyles}
    />
  );
};

export default TextAreaAtom;
