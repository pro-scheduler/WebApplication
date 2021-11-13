import { FunctionComponent, useEffect } from 'react';
import styles from './MeetingDetailsHeader.module.css';
import { MeetingDetails, MeetingModuleType } from '../../../model/meeting/Meeting';
import {
  MeetingDetailsSection,
  MeetingDetailsSectionChoiceFunction,
} from '../../../views/MeetingDetails/MeetingDetails';
import { BiCalendarEvent, BiInfoCircle, BiWorld } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { Col, Row } from 'react-bootstrap';

export type MeetingDetailsHeaderProps = {
  meeting: MeetingDetails;
  chosenSection: MeetingDetailsSection;
  onMeetingSectionChosen: MeetingDetailsSectionChoiceFunction;
  isOrganizer: boolean;
};

type SectionIconProps = {
  section: MeetingDetailsSection;
  label: string;
};

const MeetingDetailsHeader = ({
  meeting,
  chosenSection,
  onMeetingSectionChosen,
  isOrganizer,
}: MeetingDetailsHeaderProps) => {
  const SectionIcon: FunctionComponent<SectionIconProps> = ({ section, label, children }) => {
    return (
      <div
        className={`${styles.sectionIconContainer} ${
          chosenSection === section ? styles.chosen : ''
        }`}
        onClick={() => onMeetingSectionChosen(section)}
      >
        {children}
        <div>
          <span className={chosenSection !== section ? styles.hidden : ''}>{label}</span>
        </div>
      </div>
    );
  };

  const isModuleAvailable = (module: MeetingModuleType) =>
    meeting.availableModules.includes(module);

  useEffect(() => {}, []);

  return (
    <Row className="justify-content mt-5 ml-3">
      <Col lg={12} className={styles.headerContainer}>
        <h4>{meeting.name}</h4>
        <div className={styles.sectionsContainer}>
          <SectionIcon section={MeetingDetailsSection.About} label={'About'}>
            <BiInfoCircle />
          </SectionIcon>
          {isModuleAvailable(MeetingModuleType.TIME_VOTING) && (
            <SectionIcon section={MeetingDetailsSection.Time} label={'Time'}>
              <BiCalendarEvent />
            </SectionIcon>
          )}
          {isModuleAvailable(MeetingModuleType.PLACE_VOTING) && (
            <SectionIcon section={MeetingDetailsSection.Place} label={'Place'}>
              <BiWorld />
            </SectionIcon>
          )}
          {isModuleAvailable(MeetingModuleType.SURVEY) && (
            <SectionIcon section={MeetingDetailsSection.Survey} label={'Survey'}>
              <FaRegClipboard />
            </SectionIcon>
          )}
          {isModuleAvailable(MeetingModuleType.DECLARATIONS) && (
            <SectionIcon section={MeetingDetailsSection.Declarations} label={'Declarations'}>
              <RiPencilFill />
            </SectionIcon>
          )}
          {isOrganizer && (
            <SectionIcon section={MeetingDetailsSection.Settings} label={'Settings'}>
              <FiSettings />
            </SectionIcon>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default MeetingDetailsHeader;
