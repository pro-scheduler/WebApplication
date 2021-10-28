import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Icon from './Icon';
import styles from './HamburgerMenuIcon.module.css';
import { MouseEventHandler } from 'react';
import cx from 'classnames';

const HamburgerMenuIcon = ({
  onClick,
  positionRight,
  extended,
}: {
  onClick: MouseEventHandler;
  positionRight: boolean;
  extended: boolean;
}) => {
  return (
    <div
      className={cx(
        styles.button,
        extended
          ? styles.positionExtendedLeft
          : positionRight
          ? styles.positionRight
          : styles.positionLeft
      )}
      onClick={onClick}
    >
      <Icon
        className={styles.hamburgerIcon}
        icon={
          extended ? (
            <AiOutlineArrowLeft className={styles.hamburger} />
          ) : positionRight ? (
            <AiOutlineArrowRight className={styles.hamburger} />
          ) : (
            <AiOutlineArrowLeft className={styles.hamburger} />
          )
        }
      />
    </div>
  );
};

export default HamburgerMenuIcon;
