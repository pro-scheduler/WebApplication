import { FunctionComponent, useEffect } from 'react';
import styles from './MeetingDetailsHeader.module.css';
import { MeetingDetails } from '../../../model/meeting/Meeting';
import {
  MeetingDetailsSection,
  MeetingDetailsSectionChoiceFunction,
} from '../../../views/MeetingDetails/MeetingDetails';
import CalendarIcon from '../../common/Icons/CalendarIcon';
import WorldIcon from '../../common/Icons/WorldIcon';
import SurveyIcon from '../../common/Icons/SurveyIcon';
import PencilIcon from '../../common/Icons/PencilIcon';
import SettingsIcon from '../../common/Icons/SettingsIcon';
import { BiCalendarEvent, BiInfoCircle, BiWorld } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { Col, Row } from 'react-bootstrap';

export type MeetingDetailsHeaderProps = {
  meeting: MeetingDetails;
  chosenSection: MeetingDetailsSection;
  onMeetingSectionChosen: MeetingDetailsSectionChoiceFunction;
};

type SectionIconProps = {
  section: MeetingDetailsSection;
  label: string;
};

const MeetingDetailsHeader = ({
  meeting,
  chosenSection,
  onMeetingSectionChosen,
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

  useEffect(() => {}, []);

  return (
    <Row className="justify-content mt-5 ml-3">
      <Col lg={12} className={styles.headerContainer}>
        <h4>{meeting.name}</h4>
        <div className={styles.sectionsContainer}>
          <SectionIcon section={MeetingDetailsSection.About} label={'About'}>
            <BiInfoCircle />
          </SectionIcon>
          <SectionIcon section={MeetingDetailsSection.Time} label={'Time'}>
            <BiCalendarEvent />
          </SectionIcon>
          <SectionIcon section={MeetingDetailsSection.Place} label={'Place'}>
            <BiWorld />
          </SectionIcon>
          <SectionIcon section={MeetingDetailsSection.Survey} label={'Survey'}>
            <FaRegClipboard />
          </SectionIcon>
          <SectionIcon section={MeetingDetailsSection.Declarations} label={'Declarations'}>
            <RiPencilFill />
          </SectionIcon>
          <SectionIcon section={MeetingDetailsSection.Settings} label={'Settings'}>
            <FiSettings />
          </SectionIcon>
        </div>
      </Col>
    </Row>
  );
};

export default MeetingDetailsHeader;
