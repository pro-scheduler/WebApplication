import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './ChooseRealOnlinePlace.module.css';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import React, { MouseEventHandler } from 'react';
import MeetingModule from './MeetingModule';
import WorldIcon from '../common/Icons/WorldIcon';
import MapIcon from '../common/Icons/MapIcon';
import LocationIcon from '../common/Icons/LocationIcon';
import { MeetingType } from '../../model/meeting/Meeting';

export type ChooseRealOnlinePlaceProps = {
  onNavigateToNextSection: MouseEventHandler;
  chosenMeetingType: MeetingType;
  setChosenMeetingType: (value: MeetingType) => void;
};

const ChooseRealOnlinePlace = ({
  onNavigateToNextSection,
  chosenMeetingType,
  setChosenMeetingType,
}: ChooseRealOnlinePlaceProps) => {
  return (
    <>
      <Row className="justify-content-center mt-4 mb-3">
        <Col lg={12} className="text-center mt-5">
          <LocationIcon />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <div className={styles.modulesHeader}>Choose kind of the meeting</div>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4} className="text-center ml-auto mt-4">
          <MeetingModule
            header={'Real place meeting'}
            icon={<MapIcon />}
            description={
              'The real place meeting allows you to choose many places on the map and perform place voting.'
            }
            onClick={() => setChosenMeetingType(MeetingType.REAL)}
            chosen={chosenMeetingType === MeetingType.REAL}
          />
        </Col>
        <Col md={6} lg={4} className="text-center mr-auto mt-4">
          <MeetingModule
            header={'Online meeting'}
            icon={<WorldIcon />}
            description={
              'The online meeting allows you to set a link to the meeting and optionally a password.'
            }
            onClick={() => setChosenMeetingType(MeetingType.ONLINE)}
            chosen={chosenMeetingType === MeetingType.ONLINE}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5 pt-4">
        <Col xs="auto">
          <ActionButton
            text="Next"
            onclick={onNavigateToNextSection}
            className={styles.chooseModulesButton}
          />
        </Col>
      </Row>
    </>
  );
};

export default ChooseRealOnlinePlace;
