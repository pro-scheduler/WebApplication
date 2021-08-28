import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiSettings } from 'react-icons/fi';
import { RiSurveyLine } from 'react-icons/ri';
import styles from './MeetingDescription.module.css';
import UserIcon from './MeetingParticipants/UserIcon';
import { MeetingAttendeeDetails, MeetingState } from '../../model/meeting/Meeting';

export type MeetingDescriptionProps = {
  name: string;
  meetingId: number;
  organizers: MeetingAttendeeDetails[];
  description: string;
  setShowSettings: Function;
  showSettings: Boolean;
  isOrganizer: Boolean;
  state: MeetingState;
};

const MeetingDescription = ({
  name,
  meetingId,
  organizers,
  description,
  setShowSettings,
  showSettings,
  isOrganizer,
  state,
}: MeetingDescriptionProps) => {
  const organizersIcons = organizers.map((organizer: MeetingAttendeeDetails) => {
    return (
      <UserIcon
        name={organizer.user.email}
        meetingId={meetingId}
        attendeeId={organizer.attendeeId}
        canDelete={false}
        key={'organizer' + organizer.attendeeId}
      />
    );
  });

  return (
    <Row className="justify-content mt-5 ml-5 pl-5">
      <Col lg={12} className={styles.meetingDescriptionName}>
        <div className={styles.titleContainer}>
          {name}
          {isOrganizer && (
            <div>
              {showSettings ? (
                <RiSurveyLine
                  className={styles.detailsIcon}
                  onClick={() => {
                    setShowSettings(false);
                  }}
                />
              ) : (
                <FiSettings
                  className={styles.settingsIcon}
                  onClick={() => {
                    setShowSettings(true);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </Col>
      {state === MeetingState.CANCELLED && (
        <Col lg={12}>
          <div className={styles.canceledMeetingInfo}>CANCELED</div>
        </Col>
      )}
      <Col lg={12} className="mt-5">
        <div className={styles.meetingDescriptionOrganizer}>
          {organizers.length > 1 ? 'Organizers' : 'Organizer'}
        </div>
        {organizersIcons}
      </Col>
      <Col md={8} lg={6} xl={4} className="text-left mt-5">
        {description}
      </Col>
    </Row>
  );
};
export default MeetingDescription;
