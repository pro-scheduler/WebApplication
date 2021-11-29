import LineWithHeader from '../LineWithHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SurveyReminder from './SurveyReminder';
import MeetingTimeVotingReminder from './MeetingTimeVotingReminder';
import SurveyTimeReminder from './SurveyTimeReminder';
import MeetingReminder from './MeetingReminder';
import { TimeRangeDTO } from '../../../model/TimeRangeDTO';
import CustomReminder from './CustomReminder';
import { useState } from 'react';
import { Collapse } from 'react-collapse';

export type MeetingNotificationsProps = {
  meetingId: number;
  surveyId?: number;
  meetingName: string;
  surveyEndDate?: string;
  markTimeRangeDeadline?: string;
  meetingFinalDate?: TimeRangeDTO;
  isMeetingOpen: boolean;
};

const MeetingNotifications = ({
  meetingId,
  surveyId,
  meetingName,
  surveyEndDate,
  markTimeRangeDeadline,
  meetingFinalDate,
  isMeetingOpen,
}: MeetingNotificationsProps) => {
  const [opened, setOpened] = useState<boolean>(true);

  return (
    <>
      <Row className="justify-content mt-5">
        <LineWithHeader header={'Notifications'} collapseAction={setOpened} />
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Collapse isOpened={opened}>
            <CustomReminder
              meetingId={meetingId}
              meetingName={meetingName}
              isMeetingOpen={isMeetingOpen}
            />
          </Collapse>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {markTimeRangeDeadline && (
          <Col sm={12}>
            <Collapse isOpened={opened}>
              <MeetingTimeVotingReminder
                meetingId={meetingId}
                meetingName={meetingName}
                deadline={new Date(markTimeRangeDeadline)}
                isMeetingOpen={isMeetingOpen}
              />
            </Collapse>
          </Col>
        )}
        {meetingFinalDate && (
          <Col sm={12}>
            <Collapse isOpened={opened}>
              <MeetingReminder
                meetingId={meetingId}
                meetingName={meetingName}
                finalDate={new Date(meetingFinalDate.timeStart)}
                isMeetingOpen={isMeetingOpen}
              />
            </Collapse>
          </Col>
        )}
      </Row>
      {surveyId && (
        <Row className="justify-content-center">
          <Col sm={12}>
            <Collapse isOpened={opened}>
              <SurveyReminder
                meetingId={meetingId}
                surveyId={surveyId}
                meetingName={meetingName}
                isMeetingOpen={isMeetingOpen}
              />
            </Collapse>
          </Col>
          {surveyEndDate && (
            <Col sm={12}>
              <Collapse isOpened={opened}>
                <SurveyTimeReminder
                  meetingId={meetingId}
                  surveyId={surveyId}
                  surveyEndDate={new Date(surveyEndDate)}
                  isMeetingOpen={isMeetingOpen}
                />
              </Collapse>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default MeetingNotifications;
