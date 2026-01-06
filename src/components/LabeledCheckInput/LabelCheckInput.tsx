import { Flex } from 'antd';
import { LabeledCheckInputProps } from './LabelCheckInput.type';
import CheckBox from '../CheckBox';

const LabeledCheckInput: React.FC<LabeledCheckInputProps> = ({
  onChange,
  label,
  required,
  name,
  value,
  error,
  disabled,
  onMouseLeave,
  onMouseEnter,
}: LabeledCheckInputProps) => {
  return (
    <>
      <Flex
        className="items-center gap-2 text-xl "
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <CheckBox disabled={disabled} checked={value} onChange={onChange} />
        {/* {disabled ? (
          <UncheckedBoxIcon
            fill={disabled ? '#d1d5db' : '#241773'}
            // onChange={() => onChange?.(true)}
          />
        ) : value ? (
          <CheckedBoxIcon
            fill="#241773"
            onClick={() => onChange?.(false)}
            className="cursor-pointer"
          />
        ) : (
          <UncheckedBoxIcon
            fill="#241773"
            className="cursor-pointer"
            onClick={() => onChange?.(true)}
          />
        )} */}
        {typeof label === 'string' ? (
          <label
            htmlFor={name}
            style={{
              color: disabled ? '#d1d5db' : '#4c4f4e',
              fontWeight: 'unset',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {label}{' '}
            {required ? <span className="text-errorColor"> *</span> : ''}
          </label>
        ) : (
          label
        )}
      </Flex>
      {error && <span className="text-errorColor mt-12">{error}</span>}
    </>
  );
};

export default LabeledCheckInput;
