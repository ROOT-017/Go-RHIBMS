import { Select as AntSelect, SelectProps } from 'antd';
import styles from './labeledselect.module.scss';
interface Props extends SelectProps {
  error?: string;
  onChange?: (
    e: {
      target: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: string | number | any;
        name: string;
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...res: any
  ) => void;
  name: string;
  label: string;
  height?: string;
  required?: boolean;
}

/**
 * Use the prop `height` to control the height of the select input
 * Default height is 3em, you could pass '' to remove the height
 * @param param0
 *
 * @returns
 */
const LabelSelectMolecule = ({
  error,
  value,
  className,
  onChange,
  name,
  label,
  required,
  height = '3em',
  showSearch = true,
  allowClear = true,
  ...res
}: Props) => {
  return (
    <div className={styles.labeled__input}>
      <div className={styles.label}>
        <label htmlFor={name}>
          {label}{' '}
          {required ? <span className="text-errorColor ml-[5px]">*</span> : ''}
        </label>
      </div>
      <AntSelect
        {...res}
        allowClear={allowClear}
        showSearch={showSearch}
        style={{
          width: '100%',
          borderRadius: error ? '12px' : 'unset',
          borderColor: error ? '#DF0A4A' : 'unset',
          borderWidth: error ? '1px' : 'unset',
          borderStyle: error ? 'solid' : 'unset',
          backgroundColor: 'white',
          outline: 'none',
          height,
        }}
        value={value}
        onChange={(v) =>
          onChange?.(
            {
              target: {
                value: v, // e contains option information
                name,
              },
            },
            v,
          )
        }
        className={`active:outline-none focus:!outline-none ${className ?? ''} ${styles.select}`}
      />
      {error && (
        <p className="absolute !text-[1.4rem] text-errorColor">{error}</p>
      )}{' '}
    </div>
  );
};

export default LabelSelectMolecule;
