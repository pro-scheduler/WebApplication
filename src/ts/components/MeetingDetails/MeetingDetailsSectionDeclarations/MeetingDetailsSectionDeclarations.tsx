import { useEffect } from 'react';
import styles from './MeetingDetailsSectionDeclarations.module.css';
import { MeetingDetails, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDeclarations from '../MeetingDeclarations/MeetingDeclarations';
import { UserSummary } from '../../../model/user/ProUser';

export type MeetingDetailsSectionDeclarationsProps = {
  meeting: MeetingDetails;
  user: UserSummary;
  isOrganizer: boolean;
};

const MeetingDetailsSectionDeclarations = ({
  meeting,
  user,
  isOrganizer,
}: MeetingDetailsSectionDeclarationsProps) => {
  useEffect(() => {}, []);

  return (
    <Row className="justify-content">
      <Col lg={12}>
        <MeetingDeclarations
          meetingId={meeting.id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionDeclarations;
