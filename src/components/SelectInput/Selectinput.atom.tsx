import React, { FocusEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles from './selectinput.module.css';
import UseOnClickOutside from '../../utils/clickOutside';
import { MedChangeEventTarget } from '../../@types';

export interface SelectInputAtomProps {
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (e?: FocusEvent<HTMLInputElement> | MedChangeEventTarget) => void,
}

const SelectInputAtom: React.FC<SelectInputAtomProps> = ({
  options,
  onChange,
  value,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (value) setSelectedOption(value);
  }, [value]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
  };

  const outsideClickHandler = useCallback(() => {
    setIsOpen(() => {
      return false;
    });
  }, []);

  UseOnClickOutside(ref, outsideClickHandler);

  return (
    <div ref={ref} className={styles.custom__select}>
      <div
        className={styles.select__control}
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <h3>{selectedOption ? selectedOption : 'Select an option'}</h3>
        <h3 className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</h3>
      </div>

      <ul
        className={`${styles.options} ${isOpen ? styles.open : ''}`}
        role="listbox"
      >
        {options?.map((option: string) => (
          <li
            key={option}
            role="option"
            className={selectedOption === option ? styles.selected : ''}
            aria-selected={selectedOption === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectInputAtom;
