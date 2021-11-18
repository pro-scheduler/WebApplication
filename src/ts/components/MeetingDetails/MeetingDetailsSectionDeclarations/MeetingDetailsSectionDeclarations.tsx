import { useEffect, useState } from 'react';
import { MeetingDetails, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDeclarations from '../MeetingDeclarations/MeetingDeclarations';
import { UserSummary } from '../../../model/user/ProUser';
import { DeclarationDetails } from '../../../model/declaration/Declaration';
import { loadMeetingDeclarations } from '../../../API/declarations/declarationsService';

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
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);

  useEffect(() => {
    loadMeetingDeclarations(meeting.id, setDeclarations);
    // eslint-disable-next-line
  }, [meeting]);

  return (
    <Row className="justify-content mb-5">
      <Col lg={12}>
        <MeetingDeclarations
          meetingId={meeting.id}
          user={user}
          isOrganizer={isOrganizer}
          open={meeting.state === MeetingState.OPEN}
          declarations={declarations}
          setDeclarations={setDeclarations}
        />
      </Col>
    </Row>
  );
};

export default MeetingDetailsSectionDeclarations;
