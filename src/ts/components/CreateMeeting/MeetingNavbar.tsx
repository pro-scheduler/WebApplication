import Col from 'react-bootstrap/Col';
import styles from './MeetingNavbar.module.css';
import cx from 'classnames';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import { TiTick } from 'react-icons/ti';

export type MeetingNavbarProps = {
  state: creatingMeetingState;
  setState: (state: creatingMeetingState) => void;
  disabledSummary: boolean;
  surveyModule?: boolean;
  timeModule?: boolean;
  placeModule?: boolean;
  nameFilled: boolean;
  participantsFilled: boolean;
  surveyFilled: boolean;
  timeFilled: boolean;
  placeFilled: boolean;
};

const MeetingNavbar = ({
  state,
  setState,
  disabledSummary,
  surveyModule = true,
  timeModule = true,
  placeModule = true,
  nameFilled,
  participantsFilled,
  surveyFilled,
  timeFilled,
  placeFilled,
}: MeetingNavbarProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" style={{ display: 'flex' }}>
        <div className={styles.wrapper}>
          <ul className={styles.items}>
            <li className={cx(styles.item, state === 'name' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('name')}>
                <div
                  className={cx(
                    styles.itemContainer,
                    state === 'name' && styles.chosenItemContainer
                  )}
                >
                  General
                  {nameFilled && <TiTick className={styles.filledIcon} />}
                </div>
              </button>
            </li>
            <li className={cx(styles.item, state === 'invitations' && styles.chosenItem)}>
              <button className={styles.itemButton} onClick={() => setState('invitations')}>
                <div
                  className={cx(
                    styles.itemContainer,
                    state === 'invitations' && styles.chosenItemContainer
                  )}
                >
                  Participants
                  {participantsFilled && <TiTick className={styles.filledIcon} />}
                </div>
              </button>
            </li>
            {timeModule && (
              <li className={cx(styles.item, state === 'time' && styles.chosenItem)}>
                <button className={styles.itemButton} onClick={() => setState('time')}>
                  <div
                    className={cx(
                      styles.itemContainer,
                      state === 'time' && styles.chosenItemContainer
                    )}
                  >
                    Time
                    {timeFilled && <TiTick className={styles.filledIcon} />}
                  </div>
                </button>
              </li>
            )}
            {placeModule && (
              <li className={cx(styles.item, state === 'place' && styles.chosenItem)}>
                <button className={styles.itemButton} onClick={() => setState('place')}>
                  <div
                    className={cx(
                      styles.itemContainer,
                      state === 'place' && styles.chosenItemContainer
                    )}
                  >
                    Place
                    {placeFilled && <TiTick className={styles.filledIcon} />}
                  </div>
                </button>
              </li>
            )}
            {surveyModule && (
              <li className={cx(styles.item, state === 'survey' && styles.chosenItem)}>
                <button className={styles.itemButton} onClick={() => setState('survey')}>
                  <div
                    className={cx(
                      styles.itemContainer,
                      state === 'survey' && styles.chosenItemContainer
                    )}
                  >
                    Survey
                    {surveyFilled && <TiTick className={styles.filledIcon} />}
                  </div>
                </button>
              </li>
            )}
            <li className={cx(styles.item, state === 'summary' && styles.chosenItem)}>
              <button
                className={cx(styles.itemButton, state === 'summary' && styles.chosenItemContainer)}
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
