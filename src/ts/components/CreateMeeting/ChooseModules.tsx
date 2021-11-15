import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleIcon from '../common/Icons/ModuleIcon';
import styles from './ChooseModules.module.css';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import React, { MouseEventHandler } from 'react';
import MeetingModule from './MeetingModule';
import CalendarIcon from '../common/Icons/CalendarIcon';
import SurveyIcon from '../common/Icons/SurveyIcon';
import LocationIcon from '../common/Icons/LocationIcon';
import PencilIcon from '../common/Icons/PencilIcon';
import { MeetingModuleType } from '../../model/meeting/Meeting';

export type ChooseModulesProps = {
  onNavigateToNextSection: MouseEventHandler;
  availableModules: MeetingModuleType[];
  chosenModules: MeetingModuleType[];
  onModuleChosen: (value: MeetingModuleType) => void;
};

const ChooseModules = ({
  onNavigateToNextSection,
  availableModules,
  chosenModules,
  onModuleChosen,
}: ChooseModulesProps) => {
  const isModuleAvailable = (module: MeetingModuleType) => availableModules.includes(module);
  const isModuleChosen = (module: MeetingModuleType) => chosenModules.includes(module);

  return (
    <>
      <Row className="justify-content-center mt-4 mb-3">
        <Col lg={12} className="text-center mt-5">
          <ModuleIcon />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <div className={styles.modulesHeader}>Choose modules</div>
      </Row>
      <Row className="justify-content-center mt-5">
        <div className={styles.modulesContainer}>
          <div>
            {isModuleAvailable(MeetingModuleType.TIME_VOTING) && (
              <MeetingModule
                header={'Time Voting'}
                icon={<CalendarIcon />}
                description={
                  'The time module allows you to select the possible time slots for the meeting which other participants can vote for.'
                }
                onClick={() => onModuleChosen(MeetingModuleType.TIME_VOTING)}
                chosen={isModuleChosen(MeetingModuleType.TIME_VOTING)}
              />
            )}
            {isModuleAvailable(MeetingModuleType.PLACE_VOTING) && (
              <MeetingModule
                header={'Place Voting'}
                icon={<LocationIcon />}
                description={'The place module allows you to create voting for final place.'}
                onClick={() => onModuleChosen(MeetingModuleType.PLACE_VOTING)}
                chosen={isModuleChosen(MeetingModuleType.PLACE_VOTING)}
              />
            )}
            {isModuleAvailable(MeetingModuleType.SURVEY) && (
              <MeetingModule
                header={'Survey'}
                icon={<SurveyIcon />}
                description={
                  'The survey module allows you to create a poll with various types of questions.'
                }
                onClick={() => onModuleChosen(MeetingModuleType.SURVEY)}
                chosen={isModuleChosen(MeetingModuleType.SURVEY)}
              />
            )}
            {isModuleAvailable(MeetingModuleType.DECLARATIONS) && (
              <MeetingModule
                header={'Declarations'}
                icon={<PencilIcon />}
                description={
                  'The declaration module allows you and other participants create declarations.'
                }
                onClick={() => onModuleChosen(MeetingModuleType.DECLARATIONS)}
                chosen={isModuleChosen(MeetingModuleType.DECLARATIONS)}
              />
            )}
          </div>
        </div>
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

export default ChooseModules;
