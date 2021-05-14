import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import timePicker from '../../../../images/timePicker.png';
import placePicker from '../../../../images/placePicker.png';
import survey from '../../../../images/survey.png';
import styles from './Content.module.css';

const Content = () => {
  return (
    <Container className={styles.content}>
      <Row className="mb-0 mt-5 pt-3">
        <Col lg={6} className="my-0 py-0 mt-lg-2">
          <div className={styles.photo}>
            <img src={timePicker} alt="timePicker" className="img-fluid text-center" />
          </div>
        </Col>
        <Col lg={6} className="my-0 py-0 mt-lg-2 text-center">
          <p className="mt-lg-5 pt-lg-5">
            Plan your meeting including time, place and participants
          </p>
        </Col>

        <Col lg={6} className="py-0 mt-lg-3 mt-5 text-center">
          <p className="mt-lg-5 pt-lg-5">Vote for the meeting point shown on the map</p>
        </Col>
        <Col lg={6} className="py-0 mt-lg-4">
          <div className={styles.photo}>
            <img src={placePicker} alt="survey" className="img-fluid text-center" />
          </div>
        </Col>

        <Col lg={6} className="py-0 mt-lg-4 mt-5">
          <div className={styles.photo}>
            <img src={survey} alt="survey" className="img-fluid text-center" />
          </div>
        </Col>
        <Col lg={6} className="py-0 mt-lg-3 text-center">
          <p className="mt-lg-5 pt-lg-5">Create survey with closed and open questions</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
