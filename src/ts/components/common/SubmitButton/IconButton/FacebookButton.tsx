import './FacebookButton.css';
import IconButton from './IconButton';
import { SiFacebook } from 'react-icons/si';

interface IButton {
  redirectTo: string;
  text: string;
  className?: any;
  disabled?: boolean;
}

const FacebookButton = ({ redirectTo, text, className, disabled }: IButton) => {
  return (
    <div className={className}>
      <IconButton
        redirectTO={redirectTo}
        text={text}
        icon={<SiFacebook className="mr-4 fbIcon" />}
        className="fbButton"
        disabled={disabled}
      />
    </div>
  );
};

export default FacebookButton;
