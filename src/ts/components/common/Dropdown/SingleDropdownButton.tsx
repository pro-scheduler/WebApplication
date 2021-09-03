import Select from 'react-select';
import styles from './DropdownButton.module.css';
import cx from 'classnames';
import { DropdownButtonProps } from './MultiDropdownButton';
import React from 'react';

const SingleDropdownButton = ({
  options,
  defaultValue,
  value,
  onChange,
  className,
  invalid,
  invalidText,
  label,
}: DropdownButtonProps) => {
  const dropdownStyles = cx(invalid ? styles.dropdown_invalid : styles.dropdown, className);

  return (
    <>
      <div className={styles.label}>{label}</div>
      <Select
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        options={options}
        className={dropdownStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: 'rgba(200, 197, 243, 0.788)',
            primary: invalid ? 'var(--medium-red)' : 'var(--very-light-grey)',
          },
        })}
      />
      {invalid && invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </>
  );
};

export default SingleDropdownButton;
