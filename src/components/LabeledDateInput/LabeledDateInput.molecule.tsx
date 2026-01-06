import dayjs from 'dayjs';
import { DatePicker, DatePickerProps } from 'antd';
import styles from './labeled.module.scss';
import { LabeledInputProps } from './labeleddateinput.type';
import {
  toJavaLocalDateString,
  toMonthYearFormat,
} from '../../utils/date-time';
import { ErrorLabel } from '../Input/ErrorLabel';

const LabeledDateInputMolecule: React.FC<LabeledInputProps> = ({
  label,
  required,
  name,
  onDateChange,
  disabled = false,
  value,
  error,
  picker,
  readOnly,
  maxDate,
  minDate,
  format,
  onBlur,
}) => {
  const onChange: DatePickerProps['onChange'] = (d) => {
    const dateAsString =
      d != null ? toJavaLocalDateString(d.toDate(), picker == 'month', format) : '';
    onDateChange(name, dateAsString);
  };

  return (
    <div className={styles.labeled__input}>
      <div className={styles.label}>
        <label htmlFor={name}>
          {label}
          {required ? (
            <span
              style={{
                color: 'red',
              }}
            >
              {' '}
              *
            </span>
          ) : (
            ''
          )}
        </label>
      </div>
      {readOnly ? (
        <p className={`${disabled ? 'bg-[#F9F9F9]' : ''} text-gray-600 border-solid border-[1px] border-[#CECDD3] hover:bg-[#F9F9F9] min-h-[44px] rounded-[10px] flex items-center p-4 cursor-text`}>
          {format === 'MM-YYYY' && value != null ? toMonthYearFormat(value) : value}
        </p>
      ) : (
        <DatePicker
          disabled={disabled}
          value={value ? dayjs(value) : null}
          className="h-[40px] text-left"
          name={name}
          onChange={(d, ds) => {
            onChange(d, ds);
            if (d == null) {
              onBlur?.()
            }
          }}
          picker={picker}
          maxDate={maxDate ? dayjs(maxDate) : undefined}
          minDate={minDate ? dayjs(minDate) : undefined}
          required={required}
          format={format}
          status={error ? 'error' : ''}
          onBlur={onBlur}
        />
      )}
      <ErrorLabel error={error} className="absolute" />
    </div>
  );
};

export default LabeledDateInputMolecule;
