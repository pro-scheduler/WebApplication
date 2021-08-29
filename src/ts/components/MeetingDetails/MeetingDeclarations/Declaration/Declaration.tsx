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
  updateDeclaration,
} from '../../../../API/declarations/declarationsService';
import { UserSummary } from '../../../../model/user/ProUser';
import Popup from '../../../common/Popup/Popup';
import SingleValueInput from '../../../common/forms/Input/SingleValueInput';
import { minSings, maxSings, required } from '../../../../tools/validator';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import TextArea from '../../../common/forms/TextArea/TextArea';
import LoadingSpinner from '../../../common/Spinner/LoadingSpinner';
import { ApiCall } from '../../../../API/genericApiCalls';

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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(defaultDeclaration.title);
  const [newDescription, setNewDescription] = useState<string>(defaultDeclaration.description);
  const [invalidTitleOrDesc, setInvalidTitleOrDesc] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    setIsOwner(isMeetingOrganizer || declaration.createdBy.email === user.email);
    setIsAssigned(declaration.assigned.some((u) => u.email === user.email));
  }, [declaration, isMeetingOrganizer, user.email]);

  const onDelete = () => {
    deleteDeclaration(declaration.id, setResponse, () => {
      removeDeclaration(declaration.id);
    });
  };
  const onAdd = () => {
    assignToDeclaration(declaration.id, setResponse, () => {
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
    });
  };

  const onReturn = () => {
    unassignFromDeclaration(declaration.id, setResponse, () => {
      setDeclaration({
        ...declaration,
        assigned: declaration.assigned.filter((u) => u.email !== user.email),
      });
    });
  };

  const onEdit = () => {
    updateDeclaration(
      declaration.id,
      {
        title: newTitle,
        description: newDescription,
      },
      setDeclaration,
      setResponse
    );
    setShowEditModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>{declaration.title}</div>
        <div className={styles.buttonContainer}>
          <LoadingSpinner active={response.isLoading} />
          {isAssigned && (
            <ReturnButton
              className={styles.shake}
              onReturn={onReturn}
              hoverText="Unassing from the declaration"
            />
          )}
          {isOwner && (
            <RiPencilFill
              className={styles.pencilIcon}
              onClick={() => {
                setShowEditModal(true);
              }}
              title="Edit declaration"
            />
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
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Popup show={showEditModal} title="Edit declaration" onClose={setShowEditModal}>
        <div className={styles.editDeclarationForm}>
          <p className={styles.titleLabel}>Declaration title</p>
          <SingleValueInput
            value={newTitle}
            valueHandler={setNewTitle}
            setInvalid={setInvalidTitleOrDesc}
            validation={[
              { validation: required, message: 'This field is required' },
              { validation: minSings(5), message: 'Min 5 signs' },
              { validation: maxSings(255), message: 'Max 255 signs' },
            ]}
            placeholder="Please type declaration title ..."
          />
          <p className={styles.formLabel}>Declaration description</p>
          <TextArea
            defaultValue={newDescription}
            valueHandler={setNewDescription}
            setInvalid={setInvalidTitleOrDesc}
            validation={[{ validation: maxSings(512), message: 'Max 512 signs' }]}
            placeholder="Please type declaration description ..."
          />
          <div className={styles.formButtonContainer}>
            <ActionButton
              onclick={() => {
                onEdit();
              }}
              disabled={
                invalidTitleOrDesc ||
                (defaultDeclaration.title === newTitle &&
                  defaultDeclaration.description === newDescription)
              }
              text="Edit declaration"
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default Declaration;
