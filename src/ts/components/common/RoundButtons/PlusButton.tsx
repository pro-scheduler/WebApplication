import { MouseEventHandler } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import RoundButton from './RoundButton';

interface Button {
  onclick: MouseEventHandler;
  className: any;
}

const PlusButton = ({ onclick, className }: Button) => {
  return <RoundButton onclick={onclick} className={className} icon={<AiOutlinePlus />} />;
};

export default PlusButton;
