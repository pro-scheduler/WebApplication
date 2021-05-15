import styles from './FacebookButton.module.css';
import IconButton, { IconButtonProps } from './IconButton';
import { SiFacebook } from 'react-icons/si';

const FacebookButton = ({ redirectTo, text, className, disabled }: IconButtonProps) => {
  return (
    <div className={className}>
      <IconButton
        redirectTo={redirectTo}
        text={text}
        icon={<SiFacebook className={styles.fbIcon} />}
        className={styles.fbButton}
        disabled={disabled}
      />
    </div>
  );
};

export default FacebookButton;
