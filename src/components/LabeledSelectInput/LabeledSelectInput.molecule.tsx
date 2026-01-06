import styles from './labeled.module.css';

import SelectInputAtom from '../SelectInput/Selectinput.atom';
import { Select } from 'antd';
import { LabeledSelectInputProps } from './labeledselectinput.type';
import { ErrorLabel } from '../Input/ErrorLabel';

const LabeledSelectInputMolecule: React.FC<LabeledSelectInputProps> = ({
  selectProps,
  label,
  required,
  name,
  error,
  ant,
  tailwindClasses,
  ...antProps
}) => {
  return (
    <div className={`${styles.labeled__input + ' ' + tailwindClasses} relative`}>
      <div className={styles.label}>
        <label htmlFor={name}>
          {label}{' '}
          {required ? <span className="text-errorColor ml-[5px]">*</span> : ''}
        </label>
      </div>
      {ant ? <Select {...antProps} /> : <SelectInputAtom {...selectProps} />}
      <ErrorLabel error={error} className="absolute !text-[1.4rem]" />
    </div>
  );
};

export default LabeledSelectInputMolecule;
