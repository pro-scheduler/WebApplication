import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';

const Header = () => {
  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">Incoming meetings</Row>
    </div>
  );
};

export default Header;
