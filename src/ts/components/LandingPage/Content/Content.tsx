import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import survey from '../../../../images/survey.png';
import createMeeting from '../../../../images/createMeeting.png';
import chooseModules from '../../../../images/chooseModules.png';
import timeVoting from '../../../../images/timeVoting.png';
import place from '../../../../images/place.png';
import declarations from '../../../../images/declarations.png';
import styles from './Content.module.css';

const Content = () => {
  return (
    <Container>
      <Row className="mb-0 mt-5 pt-3">
        <Col lg={6} className="my-0 py-0 mt-lg-2">
          <div className={styles.photo}>
            <img src={createMeeting} alt="meeting" className="img-fluid text-center" />
          </div>
        </Col>
        <Col lg={6} className="my-0 py-0 mt-3 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Create meetings</h3>
          <p>Create real place and online meetings and invite friends.</p>
        </Col>

        <Col lg={6} className="py-0 mt-lg-3 mt-5 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Choose modules</h3>
          <p>
            Choose as many modules as you want. You can select time voting, place voting, survey,
            and declarations.
          </p>
        </Col>
        <Col lg={6} className="py-0 mt-lg-4">
          <div className={styles.photo}>
            <img src={chooseModules} alt="modules" className="img-fluid text-center" />
          </div>
        </Col>

        <Col lg={6} className="py-0 mt-lg-4 mt-5">
          <div className={styles.photo}>
            <img src={timeVoting} alt="time voting" className="img-fluid text-center" />
          </div>
        </Col>
        <Col lg={6} className="py-0 mt-3 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Mark when you are available</h3>
          <p>
            Define the available time frame for the meeting and ask participants to indicate their
            preferences.
          </p>
        </Col>

        <Col lg={6} className="py-0 mt-lg-3 mt-5 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Create a survey</h3>
          <p>Create a survey with different types of questions and see the results in real time.</p>
        </Col>
        <Col lg={6} className="py-0 mt-lg-4">
          <div className={styles.photo}>
            <img src={survey} alt="survey" className="img-fluid text-center" />
          </div>
        </Col>

        <Col lg={6} className="py-0 mt-lg-4 mt-5">
          <div className={styles.photo}>
            <img src={place} alt="place voting" className="img-fluid text-center" />
          </div>
        </Col>
        <Col lg={6} className="py-0 mt-3 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Mark places on the map</h3>
          <p>Mark possible meeting places on the map and vote.</p>
        </Col>

        <Col lg={6} className="py-0 mt-lg-3 mt-5 text-center">
          <h3 className="mt-lg-5 pt-lg-5">Make declarations</h3>
          <p>
            Create declarations with the necessary artifacts and ask participants to assign to them.
          </p>
        </Col>
        <Col lg={6} className="py-0 mt-lg-4">
          <div className={styles.photo}>
            <img src={declarations} alt="declarations" className="img-fluid text-center" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
