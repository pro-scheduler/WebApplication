import cx from 'classnames';
import styles from './Icon.module.css';

interface IMeetingIcon {
  className: any;
  icon: JSX.Element;
}

const Icon = ({ className, icon }: IMeetingIcon) => {
  const iconStyles = cx(styles.icon, className);

  return <button className={iconStyles}>{icon}</button>;
};

export default Icon;
