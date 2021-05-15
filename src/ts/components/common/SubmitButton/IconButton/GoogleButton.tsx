import './GoogleButton.css';
import IconButton from './IconButton';
import { FcGoogle } from 'react-icons/fc';

interface IButton {
  redirectTo: string;
  text: string;
  className?: any;
  disabled?: boolean;
}

const GoogleButton = ({ redirectTo, text, className, disabled }: IButton) => {
  return (
    <div className={className}>
      <IconButton
        redirectTO={redirectTo}
        text={text}
        icon={<FcGoogle className="mr-4 googleIcon" />}
        disabled={disabled}
      />
    </div>
  );
};

export default GoogleButton;
