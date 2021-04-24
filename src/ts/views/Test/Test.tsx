import React from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
const Test = () => {
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">
        <TimeGrid />
      </Row>
    </Container>
  );
};

export default Test;
