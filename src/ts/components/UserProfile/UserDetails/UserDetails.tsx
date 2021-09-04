import { UserSummary } from '../../../model/user/ProUser';
import Card from '../../common/Card/Card';
import styles from './UserDetails.module.css';
import { useEffect, useState } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';

const UserDetails = ({ user }: { user: UserSummary }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user.username);

  useEffect(() => {
    setUserName(user.username);
  }, [user.username]);

  const editUserDetails = () => {
    // TODO connect with API
    setEditMode(false);
  };

  return (
    <Card
      title={'User details'}
      onEdit={() => setEditMode(!editMode)}
      footer={
        editMode ? (
          <div className={styles.editButtonContainer}>
            <ActionButton
              onclick={editUserDetails}
              text={'Edit'}
              disabled={userName === user.username || userName === ''}
              className={styles.editButton}
            />
          </div>
        ) : undefined
      }
    >
      <div className={styles.userDetailsContainer}>
        <div className={styles.userHeader}>Username</div>
        {editMode ? (
          <SingleValueInput valueHandler={setUserName} value={userName} />
        ) : (
          <>
            <div>{user.username}</div>
            <div className={styles.userHeader}>Email</div>
            <div>{user.email}</div>
          </>
        )}
      </div>
    </Card>
  );
};
export default UserDetails;
