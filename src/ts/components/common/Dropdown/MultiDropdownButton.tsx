import React from 'react';
import Select from 'react-select';
import styles from './DropdownButton.module.css';
import cx from 'classnames';

const MultiDropdownButton = ({
  options,
  onchange,
  defaultValue,
  className,
  invalid,
  invalidText,
}: any) => {
  const dropdownStyles = cx(invalid ? styles.dropdown_invalid : styles.dropdown, className);

  return (
    <div>
      <Select
        defaultValue={defaultValue}
        onChange={onchange}
        options={options}
        className={dropdownStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: 'rgba(200, 197, 243, 0.788)',
            primary: invalid ? '#d33a3a' : '#7067CF',
          },
        })}
        isMulti
        styles={{
          multiValueLabel: (base) => ({
            ...base,
            backgroundColor: '#7067CF',
            color: 'white',
          }),
        }}
      />
      {invalid && invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </div>
  );
};

export default MultiDropdownButton;
