import React from 'react';
import Select from 'react-select';
import styles from './DropdownButton.module.css';

const MultiDropdownButton = ({ options, onchange, defaultValue }: any) => {
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
