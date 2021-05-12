import { BsArrowUpRight } from 'react-icons/bs';
import RoundButton, { RoundButtonProps } from './RoundButton';

const ArrowButton = ({ onclick, className }: RoundButtonProps) => {
  return <RoundButton onclick={onclick} className={className} icon={<BsArrowUpRight />} />;
};

export default ArrowButton;
