import { MouseEventHandler } from 'react';

import { BsArrowUpRight } from 'react-icons/bs';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
  disabled?: boolean;
}

const ArrowButton = ({ onclick, className }: IButton) => {
  return <RoundButton onclick={onclick} className={className} icon={<BsArrowUpRight />} disabled />;
};

export default ArrowButton;
