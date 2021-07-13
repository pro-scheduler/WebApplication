import { FcBusinesswoman, FcManager } from 'react-icons/fc';
import styles from './AuthDecoration.module.css';
import cx from 'classnames';

const AuthDecoration = () => {
  return (
    <div>
      <div className={cx(styles.personIcon, styles.personIcon1)}>
        <FcBusinesswoman />
      </div>
      <div className={cx(styles.personIcon, styles.personIcon2)}>
        <FcManager />
      </div>
      <div className={cx(styles.personIcon, styles.personIcon3)}>
        <FcBusinesswoman />
      </div>
      <div className={cx(styles.personIcon, styles.personIcon1)}>
        <FcManager />
      </div>
      <div className={styles.additionalIcons}>
        <div className={cx(styles.personIcon, styles.personIcon2)}>
          <FcBusinesswoman />
        </div>
        <div className={cx(styles.personIcon, styles.personIcon3)}>
          <FcManager />
        </div>
      </div>
    </div>
  );
};

export default AuthDecoration;
