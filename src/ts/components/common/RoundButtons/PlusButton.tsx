import { MouseEventHandler } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
  disabled?: boolean;
}

const PlusButton = ({ onclick, className }: IButton) => {
  return <RoundButton onclick={onclick} className={className} icon={<AiOutlinePlus />} disabled />;
};

export default PlusButton;
