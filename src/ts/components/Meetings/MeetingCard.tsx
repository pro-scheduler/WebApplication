import React from 'react';
import { Link } from 'react-router-dom';

import Meeting from '../../model/meeting/Meeting';
import styles from './MeetingCard.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArrowButton from '../common/RoundButtons/ArrowButton';
import Container from 'react-bootstrap/Container';

const MeetingCard = (meeting: Meeting) => {
  return (
    <Col xs={8} sm={8} md={8} lg={8} xl={3}>
      <div className={styles.meetingCard}>
        <div className={styles.meetingCardTitle}>{meeting.name}</div>
        <Container className="container-fluid pt-0 mt-0 pl-0">
          <Row className="mt-0 mx-0 pl-0">
            {/* TODO - get data from meeting */}
            <Col lg={12} className="text-left pl-0 ml-0">
              <div className={styles.meetingCardDate}>2PM - 3PM</div>
            </Col>
            <Col lg={12} className="pr-0">
              <div className="text-right">
                <Link to={`/meetings/${meeting.id}`}>
                  <ArrowButton onclick={() => void 0} className={styles.meetingCardButton} />
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
};

export default MeetingCard;
