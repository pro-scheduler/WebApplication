import React from 'react';
import Select from 'react-select';
import styles from './DropdownButton.module.css';

const SingleDropdownButton = ({ options, defaultValue, onchange }: any) => {
  return (
    <Select
      defaultValue={defaultValue}
      onChange={onchange}
      options={options}
      className={styles.dropdown}
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
