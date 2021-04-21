import React from 'react';
import { Link } from 'react-router-dom';

import Meeting from '../../model/Meeting';
import styles from './MeetingCard.module.css';
import Col from 'react-bootstrap/Col';
import ArrowButton from '../common/RoundButtons/ArrowButton';

const MeetingCard = ({ name, description, meetingId, availableTimeRanges }: Meeting) => {
  return (
    <Col xs={6} md={4} lg={3} className="ml-3">
      <div className={styles.card}>
        <p>{name}</p>
        <div className="text-right">
          <Link to={`/meetings/${meetingId}`}>
            <ArrowButton onclick={() => void 0} className={styles.meetingButton} />
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default MeetingCard;
