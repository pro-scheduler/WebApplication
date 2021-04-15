import React from 'react';

import './GoogleButton.css';
import IconButton from './IconButton';
import { FcGoogle } from 'react-icons/fc';

interface IButton {
  redirectTo: string;
  text: string;
  className: any;
}

const GoogleButton = ({ redirectTo, text, className }: IButton) => {
  return (
    <div className={className}>
      <IconButton
        redirectTO={redirectTo}
        text={text}
        icon={<FcGoogle className="mr-4 googleIcon" />}
        className=""
      ></IconButton>
    </div>
  );
};

export default GoogleButton;
