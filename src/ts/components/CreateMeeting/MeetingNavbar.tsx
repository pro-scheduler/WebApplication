import Col from 'react-bootstrap/Col';
import styles from './MeetingNavbar.module.css';
import cx from 'classnames';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';

export type MeetingNavbarProps = {
  state: creatingMeetingState;
  setState: (state: creatingMeetingState) => void;
  disabledName: boolean;
  disabledTime: boolean;
  disabledInvitations: boolean;
  disabledPlace: boolean;
  disabledSurvey: boolean;
};

const MeetingNavbar = ({
  state,
  setState,
  disabledName,
  disabledTime,
  disabledInvitations,
  disabledPlace,
  disabledSurvey,
}: MeetingNavbarProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" style={{ display: 'flex' }}>
        <div className={styles.wrapper}>
          <ul className={styles.items}>
            <li className={cx(styles.item, state === 'name' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('name')}
                disabled={disabledName}
              >
                What
              </button>
            </li>
            <li className={cx(styles.item, state === 'time' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('time')}
                disabled={disabledTime}
              >
                When
              </button>
            </li>
            <li className={cx(styles.item, state === 'invitations' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('invitations')}
                disabled={disabledInvitations}
              >
                Who
              </button>
            </li>
            <li className={cx(styles.item, state === 'place' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('place')}
                disabled={disabledPlace}
              >
                Where
              </button>
            </li>
            <li className={cx(styles.item, state === 'survey' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('survey')}
                disabled={disabledSurvey}
              >
                Why
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default MeetingNavbar;
