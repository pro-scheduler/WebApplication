import cx from 'classnames';
import styles from './Icon.module.css';

export type IconProps = {
  className?: string;
  icon: JSX.Element;
};

const Icon = ({ className, icon }: IconProps) => {
  const iconStyles = cx(styles.icon, className);

  return <div className={iconStyles}>{icon}</div>;
};

export default Icon;
