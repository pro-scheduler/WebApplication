import { DeclarationDetails } from '../../../../model/declaration/Declaration';
import { RiPencilFill } from 'react-icons/ri';
import styles from './Declaration.module.css';
import DeleteButton from '../../../common/SubmitButton/ActionButton/DeleteButton';
import PlusButton from '../../../common/SubmitButton/ActionButton/PlusButton';
import LetterIcon from '../../../common/Icons/LetterIcon';
import ReturnButton from '../../../common/SubmitButton/ActionButton/ReturnButton';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  assignToDeclaration,
  deleteDeclaration,
  unassignFromDeclaration,
} from '../../../../API/declarations/declarationsService';
import { UserSummary } from '../../../../model/user/ProUser';

export type DeclarationProps = {
  defaultDeclaration: DeclarationDetails;
  isMeetingOrganizer: boolean;
  user: UserSummary;
  removeDeclaration: Function;
};

const Declaration = ({
  defaultDeclaration,
  isMeetingOrganizer,
  user,
  removeDeclaration,
}: DeclarationProps) => {
  const [declaration, setDeclaration] = useState(defaultDeclaration);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);

  useEffect(() => {
    setIsOwner(isMeetingOrganizer || declaration.createdBy.email === user.email);
    setIsAssigned(declaration.assigned.some((u) => u.email === user.email));
  }, [declaration, isMeetingOrganizer, user.email]);

  const onDelete = () => {
    deleteDeclaration(
      declaration.id,
      () => {},
      () => {
        removeDeclaration(declaration.id);
      }
    );
  };
  const onAdd = () => {
    assignToDeclaration(
      declaration.id,
      () => {},
      () => {
        setDeclaration({
          ...declaration,
          assigned: [
            ...declaration.assigned,
            {
              email: user.email,
              id: 1,
            },
          ],
        });
      }
    );
  };

  const onReturn = () => {
    unassignFromDeclaration(
      declaration.id,
      () => {},
      () => {
        setDeclaration({
          ...declaration,
          assigned: declaration.assigned.filter((u) => u.email !== user.email),
        });
      }
    );
  };

  const onEdit = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>{declaration.title}</div>
        <div className={styles.buttonContainer}>
          {isAssigned && (
            <ReturnButton
              className={styles.shake}
              onReturn={onReturn}
              hoverText="Unassing from the declaration"
            />
          )}
          {isOwner && (
            <RiPencilFill className={styles.pencilIcon} onClick={onEdit} title="Edit declaration" />
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
            {!isAssigned && (
              <>
                <div className={styles.currentUserLetter}>
                  <LetterIcon firstLetter={user.email.charAt(0)} />
                </div>
                <div className={styles.assignMe}>
                  <PlusButton
                    className={styles.assignMeButton + ' ' + styles.shake}
                    onAdd={onAdd}
                    hoverText={'Join to the declaration'}
                  />
                </div>{' '}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Declaration;
