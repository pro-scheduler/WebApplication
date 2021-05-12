import React from 'react';

import './FacebookButton.css';
import IconButton, { IconButtonProps } from './IconButton';
import { SiFacebook } from 'react-icons/si';

const FacebookButton = ({ redirectTo, text, className }: IconButtonProps) => {
  return (
    <div className={className}>
      <IconButton
        redirectTo={redirectTo}
        text={text}
        icon={<SiFacebook className="mr-4 fbIcon" />}
        className="fbButton"
      />
    </div>
  );
};

export default FacebookButton;
