import { DeclarationDetails } from '../../../../model/declaration/Declaration';
import { RiPencilFill } from 'react-icons/ri';
import styles from './Declaration.module.css';
import DeleteButton from '../../../common/SubmitButton/ActionButton/DeleteButton';
import PlusButton from '../../../common/SubmitButton/ActionButton/PlusButton';
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
import { maxSings, required } from '../../../../tools/validator';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import TextArea from '../../../common/forms/TextArea/TextArea';
import LoadingSpinner from '../../../common/Spinner/LoadingSpinner';
import { ApiCall } from '../../../../API/genericApiCalls';
import UserIcon from '../../../common/Icons/UserIcon';

export type DeclarationProps = {
  defaultDeclaration: DeclarationDetails;
  isMeetingOrganizer: boolean;
  user: UserSummary;
  removeDeclaration: Function;
  disabled: boolean;
};

const Declaration = ({
  defaultDeclaration,
  isMeetingOrganizer,
  user,
  removeDeclaration,
  disabled,
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
    setIsAssigned(declaration.assignees.some((u) => u.email === user.email));
  }, [declaration, isMeetingOrganizer, user.email]);

  useEffect(() => {
    setDeclaration(defaultDeclaration);
  }, [defaultDeclaration]);

  const onDelete = () => {
    deleteDeclaration(declaration.id, setResponse, () => {
      removeDeclaration(declaration.id);
    });
  };
  const onAdd = () => {
    assignToDeclaration(declaration.id, setResponse, () => {
      setDeclaration({
        ...declaration,
        assignees: [...declaration.assignees, user],
      });
    });
  };

  const onReturn = () => {
    unassignFromDeclaration(declaration.id, setResponse, () => {
      setDeclaration({
        ...declaration,
        assignees: declaration.assignees.filter((u) => u.email !== user.email),
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
          {isAssigned && !disabled && (
            <ReturnButton
              className={styles.shake}
              onReturn={onReturn}
              hoverText="Unassign from the declaration"
            />
          )}
          {isOwner && !disabled && (
            <RiPencilFill
              className={styles.pencilIcon}
              onClick={() => {
                setShowEditModal(true);
              }}
              title="Edit declaration"
            />
          )}
          {isOwner && !disabled && (
            <DeleteButton onDelete={onDelete} hoverText={'Remove declaration'} />
          )}
        </div>
      </div>
      <hr className={styles.hrLine} />
      <div className={'mt-3 ' + styles.description}> {declaration.description}</div>
      <div className={styles.footer}>
        <div title={declaration.createdBy.username}>
          <UserIcon user={declaration.createdBy} />
        </div>
        <div className={styles.assignedContainer}>
          {declaration.assignees.map((assigned, i) => (
            <div
              key={i}
              className={styles.userIcon}
              style={{ right: i * 20 }}
              title={assigned.username}
            >
              <UserIcon user={assigned} />
            </div>
          ))}
          <div
            className={styles.currentUserIcon}
            style={{ right: declaration.assignees.length * 20 }}
          >
            {!isAssigned && !disabled && (
              <>
                <div className={styles.currentUserLetter}>
                  <UserIcon user={user} />
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
      <Popup show={showEditModal} title="Edit declaration" onClose={() => setShowEditModal(false)}>
        <div className={styles.editDeclarationForm}>
          <p className={styles.titleLabel}>Declaration title</p>
          <SingleValueInput
            value={newTitle}
            valueHandler={setNewTitle}
            setInvalid={setInvalidTitleOrDesc}
            validation={[
              { validation: required, message: 'This field is required' },
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
              text="Save changes"
            />
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default Declaration;
