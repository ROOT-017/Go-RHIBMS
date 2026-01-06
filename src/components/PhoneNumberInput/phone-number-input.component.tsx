import { Input, Select, InputProps } from 'antd';
import { usePhoneNumberInput } from './phone-number.hook';
import { Country } from '../../@types';
import './phone-number.style.scss';
import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { colors } from '../../assets/colors';
import { ErrorLabel } from '../Input/ErrorLabel';
type PhoneNumberInputProps = {
  value: string;
  onChange: (phoneNumber: string, valid?: boolean) => void;
  onCountryChange?: (country: string) => void;
  onValidityChange?: (valid?: boolean) => void;
  dial?: string;
  onDialChange?: (val?: string, valid?: boolean) => void;
  className?: string;
  countryBounds?: string[];
  label?: string;
  error?: string;
  labelStyle?: CSSProperties;
  lableClassName?: CSSProperties;
  heightOfElt?: string;
} & Omit<InputProps, 'onChange' | 'className'>;

const PhoneNumberInput = ({
  onChange,
  onCountryChange,
  onValidityChange,
  onDialChange,
  dial,
  value,
  className,
  countryBounds,
  label,
  placeholder,
  error,
  labelStyle,
  lableClassName,
  readOnly,
  heightOfElt,
  ...props
}: PhoneNumberInputProps) => {
  const { countries, selectedCountry, handleCountryChange, formatter } =
    usePhoneNumberInput(countryBounds);
  const defaultValue = useRef('');
  const debounceId = useRef(-1);
  const handleCountryChanges = (countryName: string, option: unknown) => {
    handleCountryChange(countryName);
    onCountryChange?.(countryName);
    onValidityChange?.(formatter.isValid(value));
    onDialChange?.(String((option as Country).dial), formatter.isValid(value));
  };
  const selectBefore = useMemo(
    () => {
      return (
        countries && (
          <Select
            placeholder="Select country"
            onChange={handleCountryChanges}
            defaultValue={'United States of America'}
            value={selectedCountry?.name}
            showSearch
            disabled={props.disabled}
            popupMatchSelectWidth={false}
            style={{
              height: heightOfElt,
            }}
            labelRender={(option) => {
              const label = String(option.label);
              const plusIndex = label?.indexOf(' +');
              return (
                <span>
                  {plusIndex > 0 ? label.substring(0, plusIndex) : option.label}
                </span>
              );
            }}
            options={countries.map((country: Country) => ({
              ...country,
              label: `${country.flag} +${country.dial}`,
              value: country.name,
            }))}
          />
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countries, dial],
  );
  useEffect(() => {
    defaultValue.current = value;
    onValidityChange?.(formatter.isValid(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatter, value]);

  useEffect(() => {
    window.clearTimeout(debounceId.current);
    if (formatter && countries?.length > 0 && defaultValue?.current) {
      debounceId.current = window.setTimeout(
        () => onChange?.(formatter.parse(defaultValue.current)),
        100,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formatter, countries?.length]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        position: 'relative',
      }}
      className={className}
    >
      {label && (
        <label
          className={`phone-number-label ${lableClassName ?? ''}`}
          style={labelStyle ?? { color: colors.blueColorPrimary }}
          htmlFor={props.name}
        >
          {label}{' '}
          {props.required ? (
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
      )}
      <Input
        placeholder={placeholder || formatter.pattern}
        value={formatter.format(value)}
        addonBefore={selectBefore}
        onChange={(e) => {
          const val = formatter.parse(String(e.target.value));
          onChange(val, formatter.isValid(val));
          if (!selectedCountry) {
            onCountryChange?.('United States of America');
          }
        }}
        maxLength={formatter.pattern?.length}
        status={
          (value != '' && value != null && !formatter.isValid(value)) ||
          (error != null && error != '')
            ? 'error'
            : ''
        }
        className="input"
        styles={{
          input: {
            height: heightOfElt,
          },
        }}
        {...props}
      />
      <ErrorLabel error={error} className="absolute !text-[1.4rem]" />
    </div>
  );
};

export default PhoneNumberInput;
