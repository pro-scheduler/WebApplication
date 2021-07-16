import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import WorldIcon from '../common/Icons/WorldIcon';
import styles from './OnlineDetails.module.css';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../../components/common/Card/Card';

export type OnlineDetailsProps = {
  state: creatingMeetingState;
  onlineLink: string;
  setOnlineLink: (name: string) => void;
  setOnlinePassword: (description: string) => void;
};

const OnlineDetails = ({
  state,
  onlineLink,
  setOnlineLink,
  setOnlinePassword,
}: OnlineDetailsProps) => {
  return (
    <div
      className={
        state !== 'place' && (state !== 'summary' || onlineLink === '') ? styles.hidden : ''
      }
    >
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <WorldIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.onlineMeetingHeader}>Online Meeting Details</div>
      </Row>
      <Row className="justify-content-center mt-4 ml-sm-5">
        <Col>
          <Card title="Meeting link">
            <SingleValueInput
              placeholder="Please type meeting link ..."
              valueHandler={setOnlineLink}
              className={styles.onlineDetailsInput}
            />
          </Card>
          <Card title="Meeting password">
            <SingleValueInput
              placeholder="Please type meeting password ..."
              valueHandler={setOnlinePassword}
              className={styles.onlineDetailsInput}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OnlineDetails;
