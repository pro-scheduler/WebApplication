import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NameAndDescription from '../../components/CreateMeeting/NameAndDescription';
import CreateSurvey from '../../components/CreateSurvey/CreateSurvey';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';
import CreateInvitations from '../../components/CreateMeeting/CreateInvitations';
import ChooseTime from '../../components/CreateMeeting/ChooseTime';
const CreateMeeting = () => {
  const [showSurveyModule, setShowSurveyModule] = useState(false);
  const [showInvitationModule, setShowInvitationModule] = useState(false);

  return (
    <Container className="ml-5 ml-sm-auto">
      <NameAndDescription />
      <ChooseTime />
      <Row className="justify-content-center mt-5 pb-5">
        <Col className="text-center">
          <SwitchButton
            onChange={() => setShowInvitationModule(!showInvitationModule)}
            title={'Invite participants to your meeting'}
          />
        </Col>
      </Row>
      {showInvitationModule && <CreateInvitations showIcon={true} />}
      <Row className="justify-content-center mt-5 pb-5">
        <Col className="text-center">
          <SwitchButton
            onChange={() => setShowSurveyModule(!showSurveyModule)}
            title={'Add survey to your meeting'}
          />
        </Col>
      </Row>
      {showSurveyModule && <CreateSurvey />}
    </Container>
  );
};

export default CreateMeeting;
