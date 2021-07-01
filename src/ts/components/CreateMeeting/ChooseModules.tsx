import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleIcon from '../common/Icons/ModuleIcon';
import styles from './ChooseModules.module.css';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { MouseEventHandler } from 'react';
import MeetingModule from './MeetingModule';
import CalendarIcon from '../common/Icons/CalendarIcon';
import WorldIcon from '../common/Icons/WorldIcon';
import SurveyIcon from '../common/Icons/SurveyIcon';

export type ChooseModulesProps = {
  showModules: MouseEventHandler;
  surveyModule: boolean;
  timeModule: boolean;
  placeModule: boolean;
  setSurveyModule: (value: boolean) => void;
  setTimeModule: (value: boolean) => void;
  setPlaceModule: (value: boolean) => void;
};

const ChooseModules = ({
  showModules,
  surveyModule,
  timeModule,
  placeModule,
  setSurveyModule,
  setTimeModule,
  setPlaceModule,
}: ChooseModulesProps) => {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ModuleIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.modulesHeader}>Choose modules</div>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6} lg={4} className="text-center mx-auto mt-4">
          <MeetingModule
            header={'Time'}
            icon={<CalendarIcon />}
            description={
              'The time module allows you to select the possible time slots for the meeting.'
            }
            onClick={() => setTimeModule(!timeModule)}
            chosen={timeModule}
          />
        </Col>
        <Col md={6} lg={4} className="text-center mx-auto mt-4">
          <MeetingModule
            header={'Place'}
            icon={<WorldIcon />}
            description={
              'The place module allows you to enter a link and an optional password for the online\n' +
              '              meeting.'
            }
            onClick={() => setPlaceModule(!placeModule)}
            chosen={placeModule}
          />
        </Col>
        <Col md={6} lg={4} className="text-center mx-auto mt-4">
          <MeetingModule
            header={'Survey'}
            icon={<SurveyIcon />}
            description={
              'The survey module allows you to create a poll with various types of questions.'
            }
            onClick={() => setSurveyModule(!surveyModule)}
            chosen={surveyModule}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <ActionButton text="Next" onclick={showModules} className={styles.chooseModulesButton} />
        </Col>
      </Row>
    </>
  );
};

export default ChooseModules;
