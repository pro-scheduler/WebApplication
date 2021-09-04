import { UserSummary } from '../../model/user/ProUser';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './UserProfile.module.css';
import UserDetails from '../../components/UserProfile/UserDetails/UserDetails';
import NotificationSettings from '../../components/UserProfile/NotificationSettings/NotificationSettings';

const UserProfile = ({ user }: { user: UserSummary }) => {
  return (
    <Container fluid className="ml-xs-5 mt-5">
      <Row className="justify-content mt-5 ml-5 pl-5">
        <Col lg={12}>
          <div className={styles.userProfileHeader}>Your profile</div>
        </Col>
        <Col lg={6}>
          <UserDetails user={user} />
        </Col>
        <Col lg={12}>
          <NotificationSettings />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
