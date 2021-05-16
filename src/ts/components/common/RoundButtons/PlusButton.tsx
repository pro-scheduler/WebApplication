import { AiOutlinePlus } from 'react-icons/ai';
import RoundButton, { RoundButtonProps } from './RoundButton';

const PlusButton = ({ onclick, className, disabled }: RoundButtonProps) => {
  return (
    <RoundButton
      onclick={onclick}
      className={className}
      icon={<AiOutlinePlus />}
      disabled={disabled}
    />
  );
};

export default PlusButton;
