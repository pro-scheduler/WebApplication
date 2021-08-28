import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Collapse } from 'react-collapse';
import { loadMeetingDeclarations } from '../../../API/declarations/declarationsService';
import { ApiCall } from '../../../API/genericApiCalls';
import { DeclarationDetails } from '../../../model/declaration/Declaration';
import LineWithHeader from '../LineWithHeader';
import Declaration from './Declaration/Declaration';
import styles from './MeetingDeclarations.module.css';

export type MeetingDeclarationsProps = {
  meetingId: number;
  userMail: string;
  isOrganizer: boolean;
};

const MeetingDeclarations = ({ meetingId, userMail, isOrganizer }: MeetingDeclarationsProps) => {
  const [opened, setOpened] = useState<boolean>(true);
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  // eslint-disable-next-line
  const [laodResponse, setLoadResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    if (meetingId) {
      loadMeetingDeclarations(meetingId, setDeclarations, setLoadResponse);
    }
  }, [meetingId]);

  return (
    <Row className="justify-content my-5 ml-5 pl-5">
      <LineWithHeader header={'Declarations'} collapseAction={setOpened} />
      <Col>
        <Collapse isOpened={opened}>
          <div className={styles.declarationsContainer}>
            {declarations.map((dec, i) => (
              <Declaration
                userMail={userMail}
                declaration={dec}
                isMeetingOrganizer={isOrganizer}
                key={i}
              />
            ))}
          </div>
        </Collapse>
      </Col>
    </Row>
  );
};
export default MeetingDeclarations;
