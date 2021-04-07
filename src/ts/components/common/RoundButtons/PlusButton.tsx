import { MouseEventHandler } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
}

const PlusButton = ({ onclick, className }: IButton) => {
  return <RoundButton onclick={onclick} className={className} icon={<AiOutlinePlus />} />;
};

export default PlusButton;
