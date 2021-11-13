import { useEffect } from 'react';
import styles from './MeetingDetailsSectionSurvey.module.css';
import { MeetingDetails } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingSurvey from '../MeetingSurvey/MeetingSurvey';
import { SurveySummary, UserSurvey } from '../../../model/survey/Survey';

export type MeetingDetailsSectionSurveyProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  survey: UserSurvey;
  surveySummary: SurveySummary | undefined;
  onSurveyReload: Function;
  onSurveySummaryReload: Function;
};

const MeetingDetailsSectionSurvey = ({
  meeting,
  isOrganizer,
  survey,
  surveySummary,
  onSurveyReload,
  onSurveySummaryReload,
}: MeetingDetailsSectionSurveyProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        <MeetingSurvey
          survey={survey}
          reloadSurveySummary={onSurveySummaryReload}
          surveySummary={surveySummary}
          numberOfParticipants={meeting.attendees.length}
          isOrganizer={isOrganizer}
          reloadSurvey={onSurveyReload}
          state={meeting.state}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionSurvey;
