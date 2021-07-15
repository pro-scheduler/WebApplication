import styles from './Card.module.css';
import { FunctionComponent } from 'react';
export type CardProps = {
  title?: string;
};

const Card: FunctionComponent<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <hr />
      <div className="mt-4"> {children}</div>
    </div>
  );
};

export default Card;
