import { UserSummary } from '../../../model/user/ProUser';
import Card from '../../common/Card/Card';
import styles from './UserDetails.module.css';
import { useEffect, useState } from 'react';
import SingleValueInput from '../../common/forms/Input/SingleValueInput';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { editUser } from '../../../API/user/userService';

const UserDetails = ({ user, refreshUser }: { user: UserSummary; refreshUser: Function }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(user.username);

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  const editUserDetails = () => {
    editUser(user.id, { username: username }, refreshUser);
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
              disabled={username === user.username || username === ''}
              className={styles.editButton}
            />
          </div>
        ) : undefined
      }
    >
      <div className={styles.userDetailsContainer}>
        <div className={styles.userHeader}>Username</div>
        {editMode ? (
          <SingleValueInput valueHandler={setUsername} value={username} />
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
