import styles from './GoogleButton.module.css';
import IconButton, { IconButtonProps } from './IconButton';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = ({
  redirectTo,
  onClick,
  text,
  className,
  containerClassName,
  disabled,
}: IconButtonProps) => {
  return (
    <div className={containerClassName}>
      <IconButton
        redirectTo={redirectTo}
        onClick={onClick}
        text={text}
        icon={<FcGoogle className={styles.googleIcon} />}
        disabled={disabled}
        className={className}
      />
    </div>
  );
};

export default GoogleButton;
