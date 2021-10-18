import { BiMenu } from 'react-icons/bi';
import Icon from './Icon';
import styles from './HamburgerMenuIcon.module.css';
import { MouseEventHandler } from 'react';
import cx from 'classnames';

const HamburgerMenuIcon = ({
  onClick,
  positionRight,
}: {
  onClick: MouseEventHandler;
  positionRight: boolean;
}) => {
  return (
    <div
      className={cx(styles.button, positionRight ? styles.positionRight : styles.positionLeft)}
      onClick={onClick}
    >
      <Icon className={styles.hamburgerIcon} icon={<BiMenu className={styles.hamburger} />} />
    </div>
  );
};

export default HamburgerMenuIcon;
