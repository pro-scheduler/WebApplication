import React from 'react';

import styles from './GoogleButton.module.css';
import IconButton, { IconButtonProps } from './IconButton';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ redirectTo, text, className }: IconButtonProps) => {
  return (
    <div className={className}>
      <IconButton
        redirectTo={redirectTo}
        text={text}
        icon={<FcGoogle className={styles.googleIcon} />}
      />
    </div>
  );
};

export default GoogleButton;
