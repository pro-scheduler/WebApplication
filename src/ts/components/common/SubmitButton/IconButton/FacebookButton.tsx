import React from 'react';

import './FacebookButton.css';
import IconButton from './IconButton';
import { SiFacebook } from 'react-icons/si';

interface IButton {
  redirectTo: string;
  text: string;
  className: any;
}

const FacebookButton = ({ redirectTo, text, className }: IButton) => {
  return (
    <div className={className}>
      <IconButton
        redirectTO={redirectTo}
        text={text}
        icon={<SiFacebook className="mr-4 fbIcon" />}
        className="fbButton"
      ></IconButton>
    </div>
  );
};

export default FacebookButton;
