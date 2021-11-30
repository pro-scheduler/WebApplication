import { UserDetails } from '../../model/user/ProUser';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './UserProfile.module.css';
import UserDetailsView from '../../components/UserProfile/UserDetails/UserDetailsView';
import NotificationSettings from '../../components/UserProfile/NotificationSettings/NotificationSettings';
import RemoveAccount from '../../components/UserProfile/RemoveAccount/RemoveAccount';
import ColorThemeSelector from '../../components/UserProfile/ColorThemeSelector/ColorThemeSelector';

const UserProfile = ({ user, refreshUser }: { user: UserDetails; refreshUser: Function }) => {
  return (
    <Container fluid className="mb-4">
      <Row className="justify-content mt-5">
        <Col lg={12}>
          <div className={styles.userProfileHeader}>Your profile</div>
        </Col>
        <Col lg={6}>
          <UserDetailsView user={user} refreshUser={refreshUser} />
        </Col>
        <Col lg={12}>
          <NotificationSettings />
        </Col>
        <Col lg={12}>
          <RemoveAccount user={user} />
        </Col>
        <Col lg={12}>
          <ColorThemeSelector />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
