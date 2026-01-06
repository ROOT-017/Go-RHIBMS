import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './labeled.module.css';
import { YesOrNo } from '../../constants';
import TextAreaAtom from '../textarea/TextArea.atom';
import { LabeledRadioModeculeProps } from './labeledradio.type';

const LabeledRadioModecule: React.FC<LabeledRadioModeculeProps> = ({
  value,
  options,
  name,
  label,
  required = false,
  placeholder,
  textAreaStyle,
  textAreaName,
  onChange,
  listNumber,
  specify = true,
  extraText,
  ...antProps
}: LabeledRadioModeculeProps) => {
  const [selectValue, setSelectedValue] = useState<string | undefined>();
  const [textArea, setTextArea] = useState<string | undefined>();
  const [radio, setRadio] = useState<string | undefined>();

  useEffect(() => {
    setSelectedValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange(selectValue ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  const handleTextAreaChange = (value: string) => {
    setTextArea(value);
    setSelectedValue(value);
  };

  const handleRadioChange = (value: string) => {
    setRadio(value);
    setTextArea(undefined);
    setSelectedValue(undefined);
    if (!options) {
      if (value === YesOrNo.No) {
        setSelectedValue(YesOrNo.No);
      } else if (!specify) {
        setSelectedValue(value);
      } else {
        setSelectedValue(undefined);
      }
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 my-3">
      <div className="flex gap-8 items-center">
        {label ? (
          <div className={styles.label}>
            <label
              htmlFor={name}
              className="text-body text-textColor font-[500]"
            >
              {listNumber && <span>{listNumber}. </span>} {label}
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
        ) : null}
        <Radio.Group
          onChange={(e) => handleRadioChange(e.target.value)}
          value={radio}
          {...antProps}
        >
          {Object.entries(options ?? YesOrNo).map(([k, v]) => (
            <Radio key={v} value={k}>
              {v}
            </Radio>
          ))}
        </Radio.Group>
      </div>
      {extraText ? (
        <p className="text-[1.5rem] text-textColor font-[500] mt-4">
          {extraText}
        </p>
      ) : null}
      {radio === YesOrNo.Yes && specify && (
        <div className="text-textColor text-[1.2rem]">
          <TextAreaAtom
            placeholder={placeholder ?? ''}
            name={textAreaName ?? ''}
            onChange={(e) => handleTextAreaChange(e.target.value)}
            value={textArea ?? ''}
          />
        </div>
      )}
    </div>
  );
};

export default LabeledRadioModecule;
