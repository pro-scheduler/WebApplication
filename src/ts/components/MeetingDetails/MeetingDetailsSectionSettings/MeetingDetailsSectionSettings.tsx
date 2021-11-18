import { useEffect } from 'react';
import { MeetingDetails, MeetingModuleType } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingSettings from '../MeetingSettings/MeetingSettings';
import { UserSurvey } from '../../../model/survey/Survey';

export type MeetingDetailsSectionSettingsProps = {
  meeting: MeetingDetails;
  survey: UserSurvey | undefined;
};

const MeetingDetailsSectionSettings = ({ meeting, survey }: MeetingDetailsSectionSettingsProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content mx-3 mb-5">
      <Col lg={12}>
        <MeetingSettings
          survey={survey}
          meetingId={meeting.id}
          meetingName={meeting.name}
          markTimeRangeDeadline={meeting.markTimeRangeDeadline}
          meetingFinalDate={meeting.finalDate}
          showPlacesSettings={meeting.availableModules.includes(MeetingModuleType.PLACE_VOTING)}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionSettings;
