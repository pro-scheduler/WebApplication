import { UserSummary } from '../../../model/user/ProUser';
import Card from '../../common/Card/Card';
import styles from './UserDetails.module.css';

const UserDetails = ({ user }: { user: UserSummary }) => {
  return (
    <Card title={'User details'}>
      <div className={styles.userHeader}>Username</div>
      <div>{user.username}</div>
      <div className={styles.userHeader}>Email</div>
      <div>{user.email}</div>
    </Card>
  );
};
export default UserDetails;
