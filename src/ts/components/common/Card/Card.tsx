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
  miniCard?: boolean;
  sharpLeftBottomBorder?: boolean;
};

const Card: FunctionComponent<CardProps> = ({
  title,
  onDelete,
  onAdd,
  footer,
  children,
  onEdit,
  miniCard,
  sharpLeftBottomBorder,
}) => {
  return (
    <div
      className={styles.container}
      style={{
        padding: miniCard ? '10px 15px 10px' : '20px 23px 23px',
        borderBottomLeftRadius: sharpLeftBottomBorder ? 0 : 20,
      }}
    >
      <div className={styles.containerHeader}>
        <div
          className={styles.title}
          style={{
            fontSize: miniCard ? 15 : 20,
          }}
        >
          {title}
        </div>
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
      <hr
        className={styles.hrLine}
        style={{
          marginTop: miniCard ? 5 : 16,
          marginBottom: miniCard ? 5 : 16,
        }}
      />
      <div className="mt-3"> {children}</div>
      {footer && (
        <>
          <hr
            className={styles.hrLine}
            style={{
              marginTop: miniCard ? 5 : 16,
              marginBottom: miniCard ? 5 : 16,
            }}
          />
          {footer}
        </>
      )}
    </div>
  );
};
export default Card;
