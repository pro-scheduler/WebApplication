import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MeetingReminder from './MeetingReminder';
import SurveyReminder from './SurveyReminder';

export type MeetingNotificationsProps = {
  meetingId: number;
  surveyId?: number;
  meetingName: string;
};

const MeetingNotifications = ({ meetingId, surveyId, meetingName }: MeetingNotificationsProps) => {
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
      {surveyId && (
        <Row className="justify-content-center ml-5 pl-5">
          <Col sm={12}>
            <SurveyReminder meetingId={meetingId} surveyId={surveyId} meetingName={meetingName} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default MeetingNotifications;
