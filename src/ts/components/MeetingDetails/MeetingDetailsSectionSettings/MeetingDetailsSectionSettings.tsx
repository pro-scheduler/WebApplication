import { useEffect } from 'react';
import styles from './MeetingDetailsSectionSettings.module.css';
import { MeetingDetails } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingSettings from '../MeetingSettings/MeetingSettings';
import { UserSurvey } from '../../../model/survey/Survey';
import { PlaceDetails } from '../../../model/geo/Geo';

export type MeetingDetailsSectionSettingsProps = {
  meeting: MeetingDetails;
  survey: UserSurvey | undefined;
  places: PlaceDetails[];
};

const MeetingDetailsSectionSettings = ({
  meeting,
  survey,
  places,
}: MeetingDetailsSectionSettingsProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content mt-5 ml-3 mb-5">
      <Col lg={12}>
        <MeetingSettings
          survey={survey}
          meetingId={meeting.id}
          meetingName={meeting.name}
          markTimeRangeDeadline={meeting.markTimeRangeDeadline}
          meetingFinalDate={meeting.finalDate}
          showPlacesSettings={places.length > 0}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionSettings;
