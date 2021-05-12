import { AiOutlinePlus } from 'react-icons/ai';
import RoundButton, { RoundButtonProps } from './RoundButton';

const PlusButton = ({ onclick, className }: RoundButtonProps) => {
  return <RoundButton onclick={onclick} className={className} icon={<AiOutlinePlus />} />;
};

export default PlusButton;
