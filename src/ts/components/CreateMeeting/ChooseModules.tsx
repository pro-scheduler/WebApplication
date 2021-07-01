import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleIcon from '../common/Icons/ModuleIcon';
import styles from './ChooseModules.module.css';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import { MouseEventHandler, useState } from 'react';
import SwitchButton from '../common/SwitchButton/SwitchButton';
import { FaQuestionCircle } from 'react-icons/fa';

export type ChooseModulesProps = {
  showModules: MouseEventHandler;
  setSurveyModule: (value: boolean) => void;
  setTimeModule: (value: boolean) => void;
  setPlaceModule: (value: boolean) => void;
};

const ChooseModules = ({
  showModules,
  setSurveyModule,
  setTimeModule,
  setPlaceModule,
}: ChooseModulesProps) => {
  const [showSurveyLegend, setShowSurveyLegend] = useState<boolean>(false);
  const [showTimeLegend, setShowTimeLegend] = useState<boolean>(false);
  const [showPlaceLegend, setShowPlaceLegend] = useState<boolean>(false);

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
        <Col lg={6} className="text-center text-lg-right mt-lg-3">
          <div>
            Time
            <FaQuestionCircle
              onMouseEnter={() => setShowTimeLegend(true)}
              onMouseLeave={() => setShowTimeLegend(false)}
              className={styles.legendIcon}
            />
          </div>
        </Col>
        <Col lg={6} className="text-center text-lg-left">
          <SwitchButton onChange={setTimeModule} />
        </Col>
        {showTimeLegend && (
          <Col lg={12} className="text-center">
            <div className={styles.moduleLegend}>
              The time module allows you to select the possible time slots for the meeting.
            </div>
          </Col>
        )}
        <Col lg={6} className="text-center text-lg-right mt-lg-3">
          <div>
            Place
            <FaQuestionCircle
              onMouseEnter={() => setShowPlaceLegend(true)}
              onMouseLeave={() => setShowPlaceLegend(false)}
              className={styles.legendIcon}
            />
          </div>
        </Col>
        <Col lg={6} className="text-center text-lg-left">
          <SwitchButton onChange={setPlaceModule} />
        </Col>
        {showPlaceLegend && (
          <Col lg={12} className="text-center">
            <div className={styles.moduleLegend}>
              The place module allows you to enter a link and an optional password for the online
              meeting.
            </div>
          </Col>
        )}
        <Col lg={6} className="text-center text-lg-right mt-lg-3">
          <div>
            Survey
            <FaQuestionCircle
              onMouseEnter={() => setShowSurveyLegend(true)}
              onMouseLeave={() => setShowSurveyLegend(false)}
              className={styles.legendIcon}
            />
          </div>
        </Col>
        <Col lg={6} className="text-center text-lg-left">
          <SwitchButton onChange={setSurveyModule} />
        </Col>
        {showSurveyLegend && (
          <Col lg={12} className="text-center">
            <div className={styles.moduleLegend}>
              The survey module allows you to create a poll with various types of questions.
            </div>
          </Col>
        )}
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
