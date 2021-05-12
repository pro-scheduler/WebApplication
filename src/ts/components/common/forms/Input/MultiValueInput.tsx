import React from 'react';
import CreatableSelect from 'react-select/creatable';
import cx from 'classnames';
import styles from './MultiValueInput.module.css';
import { KeyboardEventHandler } from 'react-select';

export type MultiValueInputProps = {
  inputValue: string;
  value: any;
  handleChange: any;
  handleInputChange: any;
  handleKeyDown: KeyboardEventHandler;
  placeholder?: string;
  className?: string;
};

const MultiValueInput = ({
  inputValue,
  value,
  handleChange,
  handleInputChange,
  handleKeyDown,
  placeholder,
  className,
}: MultiValueInputProps) => {
  const inputStyles = cx(styles.multiValueInput, className);
  const components = {
    DropdownIndicator: null,
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={value}
      className={inputStyles}
      styles={{
        multiValueLabel: (base) => ({
          ...base,
          backgroundColor: '#7067CF',
          color: 'white',
          padding: '4px',
        }),
      }}
    />
  );
};

export default MultiValueInput;
