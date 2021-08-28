import { DeclarationDetails } from '../../../../model/declaration/Declaration';
import { RiPencilFill } from 'react-icons/ri';
import styles from './Declaration.module.css';
import DeleteButton from '../../../common/SubmitButton/ActionButton/DeleteButton';
import PlusButton from '../../../common/SubmitButton/ActionButton/PlusButton';
import LetterIcon from '../../../common/Icons/LetterIcon';
import ReturnButton from '../../../common/SubmitButton/ActionButton/ReturnButton';

export type DeclarationProps = {
  declaration: DeclarationDetails;
  isOwner: boolean;
  userMail: string;
};

const Declaration = ({ declaration, isOwner, userMail }: DeclarationProps) => {
  const onDelete = () => {};
  const onAdd = () => {};
  const onJoin = () => {};
  const onReturn = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>{declaration.title}</div>
        <div className={styles.buttonContainer}>
          <ReturnButton
            className={styles.shake}
            onReturn={onReturn}
            hoverText="Unassing from the declaration"
          />
          {isOwner && (
            <RiPencilFill className={styles.pencilIcon} onClick={onJoin} title="Edit declaration" />
          )}
          {isOwner && <DeleteButton onDelete={onDelete} hoverText={'Remove declaration'} />}
        </div>
      </div>
      <hr className={styles.hrLine} />
      <div className="mt-3"> {declaration.description}</div>
      <div className={styles.footer}>
        <LetterIcon firstLetter={declaration.createdBy.email.charAt(0)} />
        <div className={styles.assignedContainer}>
          {declaration.assigned.map((assigned, i) => (
            <div key={i} className={styles.userIcon} style={{ right: i * 20 }}>
              <LetterIcon firstLetter={assigned.email.charAt(0)} />
            </div>
          ))}
          <div
            className={styles.currentUserIcon}
            style={{ right: declaration.assigned.length * 20 }}
          >
            <LetterIcon firstLetter={userMail.charAt(0)} />
            <div className={styles.assignMe}>
              <PlusButton
                className={styles.assignMeButton + ' ' + styles.shake}
                onAdd={onAdd}
                hoverText={'Join to the declaration'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Declaration;
