import cx from 'classnames';
import styles from './Icon.module.css';

interface MeetingIcon {
  className: any;
  icon: any;
}

const Icon = ({ className, icon }: MeetingIcon) => {
  const iconStyles = cx(styles.icon, className);

  return <button className={iconStyles}>{icon}</button>;
};

export default Icon;
