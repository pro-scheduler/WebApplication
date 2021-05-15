import { BsArrowUpRight } from 'react-icons/bs';
import RoundButton, { RoundButtonProps } from './RoundButton';

const ArrowButton = ({ onclick, className, disabled }: RoundButtonProps) => {
  return (
    <RoundButton
      onclick={onclick}
      className={className}
      icon={<BsArrowUpRight />}
      disabled={disabled}
    />
  );
};

export default ArrowButton;
