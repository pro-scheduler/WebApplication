import { useEffect, useState } from 'react';
import { MeetingDetails, MeetingModuleType, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingSettings from '../MeetingSettings/MeetingSettings';
import { UserSurvey } from '../../../model/survey/Survey';
import { getSurveyForMeeting } from '../../../API/survey/surveyService';

export type MeetingDetailsSectionSettingsProps = {
  meeting: MeetingDetails;
};

const MeetingDetailsSectionSettings = ({ meeting }: MeetingDetailsSectionSettingsProps) => {
  const [survey, setSurvey] = useState<UserSurvey | undefined>(undefined);

  useEffect(() => {
    if (meeting.availableModules.includes(MeetingModuleType.SURVEY)) {
      getSurveyForMeeting(meeting.id, setSurvey);
    }
  }, [meeting]);

  return (
    <Row className="justify-content mx-3 mb-5">
      <Col lg={12}>
        <MeetingSettings
          survey={survey}
          meetingId={meeting.id}
          meetingName={meeting.name}
          isMeetingOpen={meeting.state === MeetingState.OPEN}
          markTimeRangeDeadline={meeting.markTimeRangeDeadline}
          meetingFinalDate={meeting.finalDate}
          showPlacesSettings={meeting.availableModules.includes(MeetingModuleType.PLACE_VOTING)}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionSettings;
