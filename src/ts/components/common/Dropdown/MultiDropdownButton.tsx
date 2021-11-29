import Select from 'react-select';
import styles from './DropdownButton.module.css';
import cx from 'classnames';
import React from 'react';

export type DropdownButtonProps = {
  options: any;
  onChange: any;
  value?: any;
  defaultValue?: any;
  className?: string;
  invalid?: boolean;
  invalidText?: string;
  label?: string;
  disabled?: boolean;
};

const MultiDropdownButton = ({
  options,
  onChange,
  defaultValue,
  className,
  invalid,
  invalidText,
  label,
  disabled = false,
}: DropdownButtonProps) => {
  const dropdownStyles = cx(invalid ? styles.dropdown_invalid : styles.dropdown, className);

  return (
    <>
      <div className={styles.label}>{label}</div>
      <Select
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
        isMulti
        styles={{
          multiValueLabel: (base) => ({
            ...base,
            backgroundColor: 'var(--purple)',
            color: 'white',
          }),
        }}
        isDisabled={disabled}
      />
      {invalid && invalidText && <div className={styles.invalid_text}>{invalidText}</div>}
    </>
  );
};

export default MultiDropdownButton;
