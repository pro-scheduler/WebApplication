import Col from 'react-bootstrap/Col';
import styles from './MeetingNavbar.module.css';
import cx from 'classnames';
import Row from 'react-bootstrap/Row';
import React, { MouseEventHandler } from 'react';
import { MeetingConfigurationSection } from '../../views/CreateMeeting/CreateMeeting';
import { TiTick } from 'react-icons/ti';
import LeftArrowButton from '../common/NextButton/LeftArrowButton';
import RightArrowButton from '../common/NextButton/RightArrowButton';

export type MeetingNavbarProps = {
  nameFilled: boolean;
  participantsFilled: boolean;
  surveyFilled: boolean;
  timeFilled: boolean;
  placeFilled: boolean;
  onRightClick: MouseEventHandler;
  onLeftClick: MouseEventHandler;
  availableSections: MeetingConfigurationSection[];
  currentSection: MeetingConfigurationSection;
  onSectionChosen: (section: MeetingConfigurationSection) => void;
};

const MeetingNavbar = ({
  nameFilled,
  participantsFilled,
  surveyFilled,
  timeFilled,
  placeFilled,
  onRightClick,
  onLeftClick,
  availableSections,
  currentSection,
  onSectionChosen,
}: MeetingNavbarProps) => {
  const isSectionAvailable = (section: MeetingConfigurationSection) =>
    availableSections.includes(section);
  const isSectionChosen = (section: MeetingConfigurationSection) => section === currentSection;

  type SectionViewProps = {
    section: MeetingConfigurationSection;
    sectionName: string;
    filledRequirement?: boolean;
  };

  const SectionView = ({ section, sectionName, filledRequirement = false }: SectionViewProps) => (
    <li className={cx(styles.item, isSectionChosen(section) && styles.chosenItem)}>
      <button className={styles.itemButton} onClick={() => onSectionChosen(section)}>
        <div
          className={cx(
            styles.itemContainer,
            isSectionChosen(section) && styles.chosenItemContainer
          )}
        >
          {sectionName}
          {filledRequirement && <TiTick className={styles.filledIcon} />}
        </div>
      </button>
    </li>
  );

  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto">
        <div className={styles.navbarContainer}>
          <LeftArrowButton
            onclick={onLeftClick}
            className={cx(
              styles.leftArrow,
              isSectionChosen(MeetingConfigurationSection.ABOUT) && styles.invisible
            )}
            disabled={false}
          />
          <div className={styles.wrapper}>
            <ul className={styles.items}>
              {isSectionAvailable(MeetingConfigurationSection.ABOUT) && (
                <SectionView
                  section={MeetingConfigurationSection.ABOUT}
                  sectionName={'General'}
                  filledRequirement={nameFilled}
                />
              )}
              {isSectionAvailable(MeetingConfigurationSection.INVITATIONS) && (
                <SectionView
                  section={MeetingConfigurationSection.INVITATIONS}
                  sectionName={'Participants'}
                  filledRequirement={participantsFilled}
                />
              )}
              {isSectionAvailable(MeetingConfigurationSection.TIME) && (
                <SectionView
                  section={MeetingConfigurationSection.TIME}
                  sectionName={'Time'}
                  filledRequirement={timeFilled}
                />
              )}
              {isSectionAvailable(MeetingConfigurationSection.PLACE) && (
                <SectionView
                  section={MeetingConfigurationSection.PLACE}
                  sectionName={'Place'}
                  filledRequirement={placeFilled}
                />
              )}
              {isSectionAvailable(MeetingConfigurationSection.SURVEY) && (
                <SectionView
                  section={MeetingConfigurationSection.SURVEY}
                  sectionName={'Survey'}
                  filledRequirement={surveyFilled}
                />
              )}
              {isSectionAvailable(MeetingConfigurationSection.SUMMARY) && (
                <SectionView
                  section={MeetingConfigurationSection.SUMMARY}
                  sectionName={'Summary'}
                />
              )}
            </ul>
          </div>
          <RightArrowButton
            onclick={onRightClick}
            className={cx(
              styles.rightArrow,
              isSectionChosen(MeetingConfigurationSection.SUMMARY) && styles.invisible
            )}
            disabled={false}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MeetingNavbar;
