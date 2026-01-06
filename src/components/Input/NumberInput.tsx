import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Input, InputProps } from 'antd';
import './input.scss';

export function NumberInput({ currency, onChange, value, dp, step, className, ...props }: Omit<InputProps, 'onChange' | 'type' | 'value' | 'addonAfter'> & { currency?: string, value?: number, onChange: (v?: number | null) => void, dp?: number }) {
  // const formatter = (v: string) => `${currency || '$'} ${ v ? String(v)?.replace(/[^0-9.]/g, '') : ''}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '';
  const formatter = (v: number | undefined) => {
    // Define the currency symbol
    const currencySymbol = currency || '$';
  
    // Remove all characters except digits and the decimal point
    const cleanedValue = v ? String(v).replace(/[^0-9.]/g, '') : '';
  
    // Split the integer and decimal parts
    let [integerPart, decimalPart] = cleanedValue.split('.');
  
    // Format the integer part with commas
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    // Include only the first decimal part if it exists
    decimalPart = cleanedValue.includes('.') ? `.${ (dp ? decimalPart.substring(0, dp) : decimalPart) ?? ''}` : '';
  
    // Concatenate the integer part and the decimal part
    const formattedValue = integerPart + decimalPart;
  
    // Return the formatted value with the currency symbol
    return v ? `${currencySymbol} ${formattedValue}` : '';
  };
  const parser = (v: string | undefined) => v?.replace(/\$\s?|(,*)/g, '') as unknown as number;
  const increment = () => {
    onChange(value ? parseFloat(value as unknown as string) + (parseFloat(step as string) || 1) : (parseFloat(step as string) || 1));
  }
  const decrement = () => {
    onChange(value ? parseFloat(value as unknown as string) - (parseFloat(step as string) || 1) : -(parseFloat(step as string) || 1));
  }
  return (
      <Input
        inputMode="numeric"
        onChange={(e) => onChange(!Number.isNaN(e?.target?.value) ? parser(e?.target?.value) : null)}
        value={value ? formatter(value) : undefined }
        suffix={(
          <div className="flex flex-col cursor-pointer med-number-input-addon">
            <UpOutlined onClick={increment} className="med-number-input-addon-btn" tabIndex={0} />
            <DownOutlined onClick={decrement} className="med-number-input-addon-btn" tabIndex={0} />
          </div>
        )}
        type="text"
        className={`med-number-input ${className ?? ''}`}
        {...props}
      />
    );
}