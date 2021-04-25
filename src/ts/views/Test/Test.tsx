import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import RangeBox from '../../components/TimeGrid/RangeBox';
const Test = () => {
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">
        <Col>
          <RangeBox min={30} step={10} max={480} defaultTop={100} />
        </Col>
        <Col>
          <TimeGrid primaryLabel="23.04" secondaryLabel="Thrustday" />
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Test;
