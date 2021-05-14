import React from 'react';
import Select from 'react-select';
import styles from './DropdownButton.module.css';
import cx from 'classnames';

export type DropdownButtonProps = {
  options: any;
  onChange: any;
  defaultValue?: any;
  className?: string;
};

const MultiDropdownButton = ({
  options,
  onChange,
  defaultValue,
  className,
}: DropdownButtonProps) => {
  const dropdownStyles = cx(styles.dropdown, className);

  return (
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
          primary: '#7067CF',
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
  );
};

export default MultiDropdownButton;
