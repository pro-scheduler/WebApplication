import React from 'react';

import { Link } from 'react-router-dom';
import ActionButton from '../ActionButton/ActionButton';

interface IButton {
  redirectTO: string;
  text: string;
  className?: any;
  disabled?: boolean;
}

const RedirectButton = ({ redirectTO, text, className, disabled }: IButton) => {
  return (
    <Link to={redirectTO}>
      <ActionButton onclick={() => void 0} className={className} text={text} disabled={disabled} />
    </Link>
  );
};

export default RedirectButton;
