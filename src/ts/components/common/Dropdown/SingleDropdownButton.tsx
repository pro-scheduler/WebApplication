import React from 'react';
import Select from 'react-select';
import styles from './DropdownButton.module.css';
import cx from 'classnames';
import { DropdownButtonProps } from './MultiDropdownButton';

const SingleDropdownButton = ({
  options,
  defaultValue,
  onChange,
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
    />
  );
};

export default SingleDropdownButton;
