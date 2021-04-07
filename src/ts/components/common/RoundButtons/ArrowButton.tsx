import { MouseEventHandler } from 'react';

import { BsArrowUpRight } from 'react-icons/bs';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
}

const ArrowButton = ({ onclick, className }: IButton) => {
  return <RoundButton onclick={onclick} className={className} icon={<BsArrowUpRight />} />;
};

export default ArrowButton;
