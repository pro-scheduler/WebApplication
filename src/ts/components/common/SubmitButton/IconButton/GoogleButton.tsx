import styles from './GoogleButton.module.css';
import IconButton, { IconButtonProps } from './IconButton';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({ redirectTo, text, className, disabled }: IconButtonProps) => {
  return (
    <div className={className}>
      <IconButton
        redirectTo={redirectTo}
        text={text}
        icon={<FcGoogle className={styles.googleIcon} />}
        disabled={disabled}
      />
    </div>
  );
};

export default GoogleButton;
