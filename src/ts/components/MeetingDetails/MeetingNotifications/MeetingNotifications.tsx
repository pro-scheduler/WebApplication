import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SurveyReminder from './SurveyReminder';
import MeetingTimeVotingReminder from './MeetingTimeVotingReminder';
import SurveyTimeReminder from './SurveyTimeReminder';
import MeetingReminder from './MeetingReminder';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import CustomReminder from './CustomReminder';

export type MeetingNotificationsProps = {
  meetingId: number;
  surveyId?: number;
  meetingName: string;
  surveyEndDate?: string;
  markTimeRangeDeadline?: string;
  meetingFinalDate?: TimeRangeDTO;
};

const MeetingNotifications = ({
  meetingId,
  surveyId,
  meetingName,
  surveyEndDate,
  markTimeRangeDeadline,
  meetingFinalDate,
}: MeetingNotificationsProps) => {
  return (
    <>
      <Row className="justify-content mt-5 ml-5 pl-5">
        <LineWithHeader header={'Notifications'} />
      </Row>
      <Row className="justify-content-center ml-5 pl-5">
        <Col sm={12}>
          <CustomReminder meetingId={meetingId} meetingName={meetingName} />
        </Col>
      </Row>
      <Row className="justify-content-center ml-5 pl-5">
        {markTimeRangeDeadline && (
          <Col sm={12}>
            <MeetingTimeVotingReminder
              meetingId={meetingId}
              meetingName={meetingName}
              deadline={new Date(markTimeRangeDeadline)}
            />
          </Col>
        )}
        {meetingFinalDate && (
          <Col sm={12}>
            <MeetingReminder
              meetingId={meetingId}
              meetingName={meetingName}
              finalDate={new Date(meetingFinalDate.timeStart)}
            />
          </Col>
        )}
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
