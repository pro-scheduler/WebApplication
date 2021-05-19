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
  invalid?: boolean;
  invalidText?: string;
};

const MultiValueInput = ({
  inputValue,
  value,
  handleChange,
  handleInputChange,
  handleKeyDown,
  placeholder,
  className,
  invalid,
  invalidText,
}: MultiValueInputProps) => {
  const inputStyles = cx(styles.multiValueInput, className);
  const components = {
    DropdownIndicator: null,
  };

  return (
    <>
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
            backgroundColor: invalid ? 'var(--medium-red)' : 'var(--purple)',
            color: 'white',
            padding: '4px',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary: 'var(--purple)',
          },
        })}
      />
      {invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </>
  );
};

export default MultiValueInput;
