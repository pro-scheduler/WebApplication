import React from 'react';
import Switch from 'react-switch';

import { useState } from 'react';
import cx from 'classnames';
import styles from './SwitchButton.module.css';

export type SwitchButtonProps = {
  onChange: Function;
  title?: string;
  className?: string;
  defaultValue?: boolean;
  checkedIcon?: JSX.Element;
  unCheckedIcon?: JSX.Element;
  width?: number;
  height?: number;
};

const SwitchButton = ({
  onChange,
  title,
  className,
  defaultValue = true,
  checkedIcon,
  unCheckedIcon,
  width,
  height,
}: SwitchButtonProps) => {
  const [checked, setChecked] = useState(defaultValue);

  const buttonOnChange = () => {
    setChecked(!checked);
    onChange.call(this);
  };

  const buttonStyles = cx(styles.button, className);

  return (
    <>
      <p>{title}</p>
      <Switch
        className={buttonStyles}
        onChange={buttonOnChange}
        checked={checked}
        onColor={'#7067CF'}
        offColor={'#B1B1B1'}
        checkedIcon={checkedIcon}
        uncheckedIcon={unCheckedIcon}
        activeBoxShadow={'0 0 2px 3px #7067CF'}
        width={width}
        height={height}
      />
    </>
  );
};

export default SwitchButton;
