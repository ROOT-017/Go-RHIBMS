import styles from './labeled.module.css';

import { LabeledTextAreaProps } from './labeledtextarea.type';
import TextAreaAtom from '../textarea/TextArea.atom';
import { colors } from '../../assets/colors';

const LabeledTextAreaMolecule: React.FC<LabeledTextAreaProps> = ({
  textAreaProps,
  label,
  required,
}) => {
  return (
    <div className={styles.labeled__input}>
      <div className={styles.label}>
        <label htmlFor={textAreaProps.name} style={{ color: colors.textColor }}>
          {label}{' '}
          {required ? (
            <span
              style={{
                color: 'red',
              }}
            >
              *
            </span>
          ) : (
            ''
          )}
        </label>
      </div>
      <TextAreaAtom {...textAreaProps} />
    </div>
  );
};

export default LabeledTextAreaMolecule;
