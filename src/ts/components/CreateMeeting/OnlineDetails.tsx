import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import WorldIcon from '../common/Icons/WorldIcon';
import styles from './OnlineDetails.module.css';
import React from 'react';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';

export type OnlineDetailsProps = {
  state: creatingMeetingState;
  setOnlineLink: (name: string) => void;
  setOnlinePassword: (description: string) => void;
};

const OnlineDetails = ({ state, setOnlineLink, setOnlinePassword }: OnlineDetailsProps) => {
  return (
    <div className={state !== 'place' ? styles.hidden : ''}>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <WorldIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.onlineMeetingHeader}>Online Meeting Details</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col />
        <Col xs={8} lg={6} className="mx-auto">
          <SingleValueInput
            label="Meeting link"
            valueHandler={setOnlineLink}
            className={styles.onlineDetailsInput}
          />
          <div className="mt-4">
            <SingleValueInput
              label="Meeting password"
              valueHandler={setOnlinePassword}
              className={styles.onlineDetailsInput}
            />
          </div>
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default OnlineDetails;
