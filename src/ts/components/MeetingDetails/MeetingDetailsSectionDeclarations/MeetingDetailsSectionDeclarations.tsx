import { useEffect } from 'react';
import { MeetingDetails, MeetingState } from '../../../model/meeting/Meeting';
import { Col, Row } from 'react-bootstrap';
import MeetingDeclarations from '../MeetingDeclarations/MeetingDeclarations';
import { UserSummary } from '../../../model/user/ProUser';
import { DeclarationDetails } from '../../../model/declaration/Declaration';

export type MeetingDetailsSectionDeclarationsProps = {
  meeting: MeetingDetails;
  user: UserSummary;
  isOrganizer: boolean;
  declarations: DeclarationDetails[];
  setDeclarations: Function;
};

const MeetingDetailsSectionDeclarations = ({
  meeting,
  user,
  isOrganizer,
  declarations,
  setDeclarations,
}: MeetingDetailsSectionDeclarationsProps) => {
  useEffect(() => {}, []);

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
