import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SurveyReminder from './SurveyReminder';
import MeetingTimeReminder from './MeetingTimeReminder';
import SurveyTimeReminder from './SurveyTimeReminder';

export type MeetingNotificationsProps = {
  meetingId: number;
  surveyId?: number;
  meetingName: string;
  surveyEndDate?: string;
};

const MeetingNotifications = ({
  meetingId,
  surveyId,
  meetingName,
  surveyEndDate,
}: MeetingNotificationsProps) => {
  return (
    <>
      <Row className="justify-content mt-5 ml-5 pl-5">
        <LineWithHeader header={'Notifications'} />
      </Row>
      <Row className="justify-content-center ml-5 pl-5">
        <Col sm={12}>
          <MeetingTimeReminder />
        </Col>
      </Row>
      {surveyId && (
        <Row className="justify-content-center ml-5 pl-5">
          <Col sm={12}>
            <SurveyReminder meetingId={meetingId} surveyId={surveyId} meetingName={meetingName} />
          </Col>
          {surveyEndDate && (
            <Col sm={12}>
              <SurveyTimeReminder
                meetingId={meetingId}
                surveyId={surveyId}
                surveyEndDate={new Date(surveyEndDate)}
              />
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default MeetingNotifications;
