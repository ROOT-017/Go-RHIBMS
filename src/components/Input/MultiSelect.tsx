import { List, Popover, Select, SelectProps, Tooltip } from 'antd';
import { ErrorLabel } from './ErrorLabel';
import styles from './multiselect.module.scss';
import LabeledCheckInput from '../LabeledCheckInput/LabelCheckInput';
import { CSSProperties, useState } from 'react';

export const MultiSelect = ({
  maxTagCount,
  maxTagPlaceholder,
  error,
  label,
  required,
  name,
  id,
  allowSelectAll,
  options,
  extraContent,
  containerStyle,
  ...props
}: Omit<SelectProps, 'menuItemSelectedIcon' | 'maxTagCount'> & {
  error?: string;
  label?: string;
  required?: boolean;
  name?: string;
  allowSelectAll?: boolean;
  maxTagCount?: SelectProps['maxTagCount'] | 'wrap';
  extraContent?: boolean;
  containerStyle?: CSSProperties;
}) => {
  options =
    allowSelectAll && options
      ? [
          {
            label: 'Select All',
            value: 'SELECT_ALL',
          },
          ...options,
        ]
      : options;

  const [activeElt, setActiveElt] = useState<{
    disabled: boolean;
    listItems: string[] | undefined;
  } | null>(null);
  return (
    <div style={containerStyle} className={styles.labeled__input}>
      <div className={styles.label}>
        {label && (
          <label htmlFor={id}>
            {label}{' '}
            {required ? (
              <span className="text-errorColor ml-[5px]">*</span>
            ) : (
              ''
            )}
          </label>
        )}
      </div>
      <Select
        menuItemSelectedIcon={null}
        mode="multiple"
        options={options}
        {...props}
        className={props.className + ' text-left font-[200]'}
        onChange={(value: Array<string>, option) => {
          if (value.includes('SELECT_ALL')) {
            const allValues = options?.map((option) => option.value);
            props.onChange?.(allValues, option);
            return;
          }
          props.onChange?.(value, option);
        }}
        onBlur={() => setActiveElt(null)}
        dropdownRender={(menu) =>
          activeElt && extraContent ? (
            <div className="flex">
              <div className="w-[50%]"> {menu}</div>
              <div className="w-[50%]">
                <ul
                  style={{
                    listStyle: 'inside',
                    height: '15em',
                    overflowY: 'auto',
                    borderRadius: '5px',
                    backgroundColor: '#f4f4f7',
                    padding: '5px',
                  }}
                >
                  {activeElt?.listItems?.map((elt, i) => (
                    <li className="list-disc mt-2" key={i}>
                      {elt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            menu
          )
        }
        optionRender={(option) => {
          return (
            <Tooltip title={option.data.desc} placement="bottom">
              <div title={option.data.desc ? '' : option.data.title}>
                <LabeledCheckInput
                  label={option.label}
                  name={option.data.title ?? ''}
                  disabled={option.data.disabled ? true : false}
                  value={props.value?.includes?.(option.value)}
                  onMouseEnter={() =>
                    setActiveElt({
                      disabled: option.data.disabled ?? false,
                      listItems: option.data.authorities,
                    })
                  }
                  onChange={() => {
                    if (props.value?.includes?.(option.value)) {
                      props.onDeselect?.(props.value, option);
                    } else {
                      props.onSelect?.(
                        [...(props.value ?? []), option.value],
                        option,
                      );
                    }
                  }}
                />
              </div>{' '}
            </Tooltip>
          );
        }}
        maxTagCount={
          maxTagCount == 'wrap' ? undefined : maxTagCount ?? 'responsive'
        }
        maxTagPlaceholder={
          maxTagPlaceholder ??
          ((omittedValues) => (
            <Popover
              overlayStyle={{ pointerEvents: 'none' }}
              content={
                <List>
                  {omittedValues.map(({ label }) => (
                    <List.Item key={label as string}>{label}</List.Item>
                  ))}
                </List>
              }
            >
              <span>+{omittedValues.length}...</span>
            </Popover>
          ))
        }
      />
      {error && (
        <ErrorLabel error={error} className="absolute !text-[1.4rem]" />
      )}
    </div>
  );
};
