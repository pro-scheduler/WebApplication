import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NameAndDescription from '../../components/CreateMeeting/NameAndDescription';
import CreateSurvey from '../../components/CreateMeeting/CreateSurvey';
import SwitchButton from '../../components/common/SwitchButton/SwitchButton';

const CreateMeeting = () => {
  const [showSurveyModule, setShowSurveyModule] = useState(false);

  return (
    <Container className="ml-5 ml-sm-auto">
      <NameAndDescription />
      <Row className="justify-content-center mt-5 pb-5">
        <Col className="text-center">
          <SwitchButton
            className={''}
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
