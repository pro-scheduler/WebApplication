import { useEffect, useState } from 'react';
import { MeetingDetails } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingSurvey from '../MeetingSurvey/MeetingSurvey';
import { SurveySummary, UserSurvey } from '../../../model/survey/Survey';
import { getSurveyForMeeting, getSurveySummary } from '../../../API/survey/surveyService';

export type MeetingDetailsSectionSurveyProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  participantsCanSeeResults: boolean;
};

const MeetingDetailsSectionSurvey = ({
  meeting,
  isOrganizer,
  participantsCanSeeResults,
}: MeetingDetailsSectionSurveyProps) => {
  const [survey, setSurvey] = useState<UserSurvey>();
  const [surveySummary, setSurveySummary] = useState<SurveySummary | undefined>(undefined);

  const reloadSurvey = () => {
    getSurveyForMeeting(meeting.id, setSurvey);
  };

  const reloadSurveySummary = () => {
    getSurveySummary(meeting.id, setSurveySummary);
  };

  useEffect(() => {
    reloadSurvey();
    // eslint-disable-next-line
  }, [meeting]);

  useEffect(() => {
    if (survey && (isOrganizer || participantsCanSeeResults)) {
      reloadSurveySummary();
    }
    // eslint-disable-next-line
  }, [survey, isOrganizer, participantsCanSeeResults]);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        {survey && (
          <MeetingSurvey
            survey={survey}
            reloadSurveySummary={reloadSurveySummary}
            surveySummary={surveySummary}
            numberOfParticipants={meeting.attendees.length}
            isOrganizer={isOrganizer}
            reloadSurvey={reloadSurvey}
            state={meeting.state}
          />
        )}
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionSurvey;
