import Col from 'react-bootstrap/Col';
import styles from './MeetingNavbar.module.css';
import cx from 'classnames';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';

export type MeetingNavbarProps = {
  state: creatingMeetingState;
  setState: (state: creatingMeetingState) => void;
  disabledSummary: boolean;
};

const MeetingNavbar = ({ state, setState, disabledSummary }: MeetingNavbarProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" style={{ display: 'flex' }}>
        <div className={styles.wrapper}>
          <ul className={styles.items}>
            <li className={cx(styles.item, state === 'name' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('name')}>
                What
              </button>
            </li>
            <li className={cx(styles.item, state === 'time' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('time')}>
                When
              </button>
            </li>
            <li className={cx(styles.item, state === 'invitations' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('invitations')}>
                Who
              </button>
            </li>
            <li className={cx(styles.item, state === 'place' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('place')}>
                Where
              </button>
            </li>
            <li className={cx(styles.item, state === 'survey' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('survey')}>
                Survey
              </button>
            </li>
            <li className={cx(styles.item, state === 'summary' && styles.chosenItem)}>
              <button
                className={styles.itemButton}
                onClick={() => setState('summary')}
                disabled={disabledSummary}
              >
                Summary
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default MeetingNavbar;
