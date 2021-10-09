import styles from './ModuleCard.module.css';
import { Link } from 'react-router-dom';

export type ModuleCardProps = {
  icon: JSX.Element;
  number: number;
  name: string;
  redirectTo: string;
};

const ModuleCard = ({ icon, number, name, redirectTo }: ModuleCardProps) => {
  return (
    <Link className={styles.moduleContainer} to={redirectTo}>
      <div className={styles.moduleIcon}>{icon}</div>
      <div className={styles.number}>{number}</div>
      <div className={styles.moduleName}>{name}</div>
    </Link>
  );
};

export default ModuleCard;
