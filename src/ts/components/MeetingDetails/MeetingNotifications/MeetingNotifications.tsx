import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MeetingReminder from './MeetingReminder';
import SurveyReminder from './SurveyReminder';

export type MeetingNotificationsProps = {
  showSurveyNotifications: boolean;
};

const MeetingNotifications = ({ showSurveyNotifications }: MeetingNotificationsProps) => {
  return (
    <>
      <Row className="justify-content mt-5 ml-5 pl-5">
        <LineWithHeader header={'Notifications'} />
      </Row>
      <Row className="justify-content-center ml-5 pl-5">
        <Col sm={12}>
          <MeetingReminder />
        </Col>
      </Row>
      {showSurveyNotifications && (
        <Row className="justify-content-center ml-5 pl-5">
          <Col sm={12}>
            <SurveyReminder />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MeetingNotifications;
