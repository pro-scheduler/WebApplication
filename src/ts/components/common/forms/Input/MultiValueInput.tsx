import React from 'react';
import CreatableSelect from 'react-select/creatable';
import cx from 'classnames';
import styles from './MultiValueInput.module.css';

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
}: any) => {
  const inputStyles = cx(styles.multiValueInput, className);
  const components = {
    DropdownIndicator: null,
  };

  return (
    <div>
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
            backgroundColor: invalid ? '#d33a3a' : '#7067CF',
            color: 'white',
            padding: '4px',
          }),
        }}
      />
      {invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </div>
  );
};

export default MultiValueInput;
