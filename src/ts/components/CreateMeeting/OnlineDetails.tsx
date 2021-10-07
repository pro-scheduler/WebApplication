import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import styles from './OnlineDetails.module.css';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../../components/common/Card/Card';
import WorldIcon from '../common/Icons/WorldIcon';
import React from 'react';

export type OnlineDetailsProps = {
  state: creatingMeetingState;
  onlineLink: string;
  setOnlineLink: (name: string) => void;
  setOnlinePassword: (description: string) => void;
  isOnlineMeeting: boolean;
};

const OnlineDetails = ({
  state,
  onlineLink,
  setOnlineLink,
  setOnlinePassword,
  isOnlineMeeting,
}: OnlineDetailsProps) => {
  return (
    <div
      className={
        (state !== 'place' && (state !== 'summary' || onlineLink === '')) || !isOnlineMeeting
          ? styles.hidden
          : ''
      }
    >
      {state === `summary` && (
        <>
          <Row className="justify-content-center mt-5">
            <Col lg={12} className="text-center">
              <WorldIcon />
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <h4>Meeting place details</h4>
          </Row>
        </>
      )}
      <Row className="justify-content-center mt-4">
        <Col>
          <Card title="Meeting link">
            <SingleValueInput
              placeholder="Please type meeting link ..."
              valueHandler={setOnlineLink}
              className={styles.onlineDetailsInput}
            />
          </Card>
          <Card title="Meeting password">
            <SingleValueInput
              placeholder="Please type meeting password ..."
              valueHandler={setOnlinePassword}
              className={styles.onlineDetailsInput}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OnlineDetails;
