import { HtmlHTMLAttributes, useEffect, useRef } from 'react';
import './text-editor.scss';
import { ErrorLabel } from '../Input/ErrorLabel';
type ListEditorProp = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: (value: string[]) => void;
  error?: string;
  onFinish?: (value: string[]) => void;
} & Omit<
  HtmlHTMLAttributes<HTMLDivElement>,
  | 'value'
  | 'onChange'
  | 'onInput'
  | 'tabIndex'
  | 'onBlur'
  | 'onMouseOut'
  | 'defaultValue'
>;
export const ListEditor = ({
  value,
  onChange,
  error = '',
  onBlur,
  defaultValue,
  ...props
}: ListEditorProp) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const currVal = useRef<string[] | null>(null);
  useEffect(() => {
    const displayVal = defaultValue?.filter(
      (r) => r != null && r?.trim() != '',
    );
    if (
      ref.current &&
      currVal.current == null &&
      Array.isArray(defaultValue) &&
      defaultValue?.length > 0
    ) {
      ref.current.innerHTML = `
                <ul>
                    ${(displayVal && displayVal?.length > 0 ? displayVal : [''])?.map((child) => `<li>${child}</li>`).join('')}
                </ul>
            `;
      currVal.current = defaultValue;
    } else if (
      ref.current &&
      Array.isArray(displayVal) &&
      displayVal?.length == 0
    ) {
      ref.current.innerHTML = `
                <ul>
                    <li></li>
                </ul>
            `;
    }
  }, [defaultValue]);
  return (
    <div className="relative">
      <div
        ref={ref}
        tabIndex={0}
        contentEditable
        className="list-editor"
        onInput={(e) => {
          onChange?.(String((e.target as HTMLElement).innerText).split('\n'));
        }}
        onBlur={() => {
          onBlur?.(String(ref?.current?.innerText).split('\n'));
        }}
        onMouseOut={() => {
          onBlur?.(String(ref?.current?.innerText).split('\n'));
        }}
        {...props}
      />
      <ErrorLabel error={error} className="!text-[1.4rem]" />
    </div>
  );
};
