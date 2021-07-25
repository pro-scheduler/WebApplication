import styles from './Card.module.css';
import { FunctionComponent } from 'react';
import DeleteButton from '../SubmitButton/ActionButton/DeleteButton';

export type CardProps = {
  title?: string;
  onDelete?: Function;
  footer?: JSX.Element;
};

const Card: FunctionComponent<CardProps> = ({ title, onDelete, footer, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>{title}</div>
        {onDelete && (
          <div className={styles.deleteButtonContainer}>
            <DeleteButton onDelete={onDelete} />
          </div>
        )}
      </div>
      <hr className={styles.hrLine} />
      <div className="mt-3"> {children}</div>
      {footer && (
        <>
          <hr className={styles.hrLine} />
          {footer}
        </>
      )}
    </div>
  );
};
export default Card;
