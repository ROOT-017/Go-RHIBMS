import { Select as AntSelect, SelectProps } from 'antd';

interface Props extends SelectProps {
  error?: string;
  onChange?: (e: {
    target: {
      value: string;
      name: string;
    };
  }) => void;
  name: string;
}

const Select = ({
  error,
  value,
  className,
  onChange,
  name,
  showSearch = true,
  allowClear = true,
  ...res
}: Props) => {
  return (
    <div>
      <AntSelect
        {...res}
        showSearch={showSearch}
        allowClear={allowClear}
        style={{
          width: '100%',
          borderRadius: error ? '12px' : 'unset',
          borderColor: error ? '#DF0A4A' : 'unset',
          borderWidth: error ? '1px' : 'unset',
          borderStyle: error ? 'solid' : 'unset',
          backgroundColor: 'white',
          outline: 'none',
        }}
        value={value}
        onChange={(v) =>
          onChange?.({
            target: {
              value: v, // e contains option information
              name,
            },
          })
        }
        className={`w-full h-full active:outline-none focus:!outline-none ${className ?? ''}`}
      />
      {error && (
        <p className="absolute !text-[1.4rem] text-errorColor">{error}</p>
      )}
    </div>
  );
};

export default Select;
