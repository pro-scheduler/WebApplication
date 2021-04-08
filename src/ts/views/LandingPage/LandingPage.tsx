import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import purpleLogo from '../../../images/purpleLogo.svg';

import './LandingPage.css';
import RedirectButton from '../../components/common/SubmitButton/RedirectButton/RedirectButton';

const LandingPage = () => {
  return (
    <Container fluid className="mx-0 px-0">
      <Jumbotron fluid className="mx-0 my-0 px-4 py-4">
        <Container fluid className="ml-2 mt-2">
          <h1>
            <img src={purpleLogo} alt="logo" />
            ProScheduler
          </h1>
          <h2>Schedule meetings like a pro</h2>
          <Row className="row text-center">
            <Col md={12} lg={6} className="mt-5 pt-5 px-0">
              <RedirectButton text="Sign In" redirectTO="/signin" className="m-4" />
            </Col>
            <Col md={12} lg={6} className="mt-lg-5 pt-lg-5 px-0">
              <RedirectButton text="Sign Up" redirectTO="/signup" className="m-4" />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </Container>
  );
};

export default LandingPage;
