import { UserSummary } from '../../model/user/ProUser';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './UserProfile.module.css';
import UserDetails from '../../components/UserProfile/UserDetails/UserDetails';
import NotificationSettings from '../../components/UserProfile/NotificationSettings/NotificationSettings';
import RemoveAccount from '../../components/UserProfile/RemoveAccount/RemoveAccount';

const UserProfile = ({ user, refreshUser }: { user: UserSummary; refreshUser: Function }) => {
  return (
    <Container fluid>
      <Row className="justify-content mt-5">
        <Col lg={12}>
          <div className={styles.userProfileHeader}>Your profile</div>
        </Col>
        <Col lg={6}>
          <UserDetails user={user} refreshUser={refreshUser} />
        </Col>
        <Col lg={12}>
          <NotificationSettings />
        </Col>
        <Col lg={12}>
          <RemoveAccount user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
