import { CheckedBoxIcon, UncheckedBoxIcon } from '../Icons/svg';

type Props = {
  fill?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
};

const CheckBox = ({
  fill = '#241773',
  onChange,
  checked,
  disabled,
  children,
}: Props) => {
  return (
    <div className="flex gap-4 items-center">
      {checked ? (
        <CheckedBoxIcon
          fill={disabled ? '#697374' : fill}
          className={!disabled ? 'cursor-pointer' : undefined}
          onClick={() => (disabled ? undefined : onChange?.(false))}
        />
      ) : (
        <UncheckedBoxIcon
          fill={disabled ? '#697374' : fill}
          className={!disabled ? 'cursor-pointer' : undefined}
          onClick={() => (disabled ? undefined : onChange?.(true))}
        />
      )}
      {children}
    </div>
  );
};

export default CheckBox;
