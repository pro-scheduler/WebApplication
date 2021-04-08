import React from 'react';

import { Link } from 'react-router-dom';
import ActionButton from '../ActionButton/ActionButton';

interface IButton {
  redirectTO: string;
  text: string;
  className: any;
}

const RedirectButton = ({ redirectTO, text, className }: IButton) => {
  return (
    <Link to={redirectTO}>
      <ActionButton onclick={() => void 0} className={className} text={text} />
    </Link>
  );
};

export default RedirectButton;
