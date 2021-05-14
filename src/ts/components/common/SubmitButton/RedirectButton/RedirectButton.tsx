import React from 'react';

import { Link } from 'react-router-dom';
import ActionButton from '../ActionButton/ActionButton';

export type RedirectButtonProps = {
  redirectTO: string;
  text: string;
  className?: string;
};

const RedirectButton = ({ redirectTO, text, className }: RedirectButtonProps) => {
  return (
    <Link to={redirectTO}>
      <ActionButton onclick={() => void 0} className={className} text={text} />
    </Link>
  );
};

export default RedirectButton;
