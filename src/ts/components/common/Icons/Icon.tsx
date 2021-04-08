import cx from 'classnames';
import styles from './Icon.module.css';

interface IMeetingIcon {
  className: any;
  icon: JSX.Element;
}

const Icon = ({ className, icon }: IMeetingIcon) => {
  const iconStyles = cx(styles.icon, className);

  return <div className={iconStyles}>{icon}</div>;
};

export default Icon;
