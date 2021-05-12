import React from 'react';

import './GoogleButton.css';
import IconButton, { IconButtonProps } from './IconButton';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ redirectTo, text, className }: IconButtonProps) => {
  return (
    <div className={className}>
      <IconButton
        redirectTo={redirectTo}
        text={text}
        icon={<FcGoogle className="mr-4 googleIcon" />}
        className=""
      />
    </div>
  );
};

export default GoogleButton;
