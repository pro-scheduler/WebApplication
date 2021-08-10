import styles from './Card.module.css';
import { FunctionComponent } from 'react';
import DeleteButton from '../SubmitButton/ActionButton/DeleteButton';
import PlusButton from '../SubmitButton/ActionButton/PlusButton';
import { RiPencilFill } from 'react-icons/ri';

export type CardProps = {
  title?: string;
  onDelete?: Function;
  onAdd?: Function;
  footer?: JSX.Element;
  onEdit?: Function;
};

const Card: FunctionComponent<CardProps> = ({
  title,
  onDelete,
  onAdd,
  footer,
  children,
  onEdit,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>{title}</div>
        {onDelete && (
          <div className={styles.buttonContainer}>
            <DeleteButton onDelete={onDelete} />
          </div>
        )}
        {onAdd && (
          <div className={styles.buttonContainer}>
            <PlusButton onAdd={onAdd} />
          </div>
        )}
        {onEdit && (
          <div className={styles.buttonContainer}>
            <RiPencilFill
              className={styles.pencilIcon}
              onClick={() => {
                onEdit();
              }}
            />
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
