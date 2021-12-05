import { FunctionComponent, useEffect, useState } from 'react';
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
import cx from 'classnames';
import { BsChevronDown } from 'react-icons/all';

export type MeetingDetailsHeaderProps = {
  meeting: MeetingDetails;
  chosenSection: MeetingDetailsSection;
  onMeetingSectionChosen: MeetingDetailsSectionChoiceFunction;
  isOrganizer: boolean;
};

type SectionIconProps = {
  order: number;
  section: MeetingDetailsSection;
  label: string;
};

const MeetingDetailsHeader = ({
  meeting,
  chosenSection,
  onMeetingSectionChosen,
  isOrganizer,
}: MeetingDetailsHeaderProps) => {
  const [sectionsDropdownOpened, setSectionsDropdownOpened] = useState<boolean>(false);

  const isNotFirst = (order: number) => order !== 1;

  const SectionIcon: FunctionComponent<SectionIconProps> = ({
    order,
    section,
    label,
    children,
  }) => {
    return (
      <li
        className={cx(
          chosenSection === section || sectionsDropdownOpened
            ? styles.sectionsDropdownItemVisible
            : styles.sectionsDropdownItemHidden,
          sectionsDropdownOpened && isNotFirst(order) ? styles.sectionDropdownItemMargin : ''
        )}
      >
        <div
          className={`${styles.sectionIconContainer} ${
            chosenSection === section ? styles.chosen : ''
          }`}
          onClick={() => choseMeetingSection(section)}
        >
          {children}
          <div>
            <span className={chosenSection !== section ? styles.hidden : ''}>{label}</span>
          </div>
        </div>
      </li>
    );
  };

  const isModuleAvailable = (module: MeetingModuleType) =>
    meeting.availableModules.includes(module);

  const switchDropdown = () => {
    setSectionsDropdownOpened(!sectionsDropdownOpened);
  };

  const choseMeetingSection = (chosenSection: MeetingDetailsSection) => {
    setSectionsDropdownOpened(false);
    onMeetingSectionChosen(chosenSection);
  };

  useEffect(() => {}, []);

  return (
    <Row className={cx('justify-content', styles.meetingDetailsHeader)}>
      <Col lg={6}>
        <h4>{meeting.name}</h4>
      </Col>
      <Col lg={6}>
        <div className={styles.sectionsDropdownContainer}>
          <ul className={styles.sectionsContainer}>
            <SectionIcon order={1} section={MeetingDetailsSection.About} label={'About'}>
              <BiInfoCircle />
            </SectionIcon>
            {isModuleAvailable(MeetingModuleType.TIME_VOTING) && (
              <SectionIcon order={2} section={MeetingDetailsSection.Time} label={'Time'}>
                <BiCalendarEvent />
              </SectionIcon>
            )}
            {isModuleAvailable(MeetingModuleType.PLACE_VOTING) && (
              <SectionIcon order={3} section={MeetingDetailsSection.Place} label={'Place'}>
                <BiWorld />
              </SectionIcon>
            )}
            {isModuleAvailable(MeetingModuleType.SURVEY) && (
              <SectionIcon order={4} section={MeetingDetailsSection.Survey} label={'Survey'}>
                <FaRegClipboard />
              </SectionIcon>
            )}
            {isModuleAvailable(MeetingModuleType.DECLARATIONS) && (
              <SectionIcon
                order={5}
                section={MeetingDetailsSection.Declarations}
                label={'Declarations'}
              >
                <RiPencilFill />
              </SectionIcon>
            )}
            {isOrganizer && (
              <SectionIcon order={6} section={MeetingDetailsSection.Settings} label={'Settings'}>
                <FiSettings />
              </SectionIcon>
            )}
            <div
              onClick={() => switchDropdown()}
              className={cx(
                styles.sectionsDropdownButton,
                sectionsDropdownOpened ? styles.sectionsDropdownOpenedButton : ''
              )}
            >
              <BsChevronDown />
            </div>
          </ul>
        </div>
      </Col>
    </Row>
  );
};

export default MeetingDetailsHeader;
