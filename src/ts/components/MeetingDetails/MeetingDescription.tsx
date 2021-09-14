import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FiSettings } from 'react-icons/fi';
import { RiSurveyLine } from 'react-icons/ri';
import styles from './MeetingDescription.module.css';
import UserIcon from './MeetingParticipants/UserIcon';
import { MeetingAttendeeDetails, MeetingRole, MeetingState } from '../../model/meeting/Meeting';
import PlusButton from '../common/SubmitButton/ActionButton/PlusButton';
import { useState } from 'react';
import Popup from '../common/Popup/Popup';
import { updateMeetingAttendee } from '../../API/meeting/meetingService';

export type MeetingDescriptionProps = {
  name: string;
  meetingId: number;
  organizers: MeetingAttendeeDetails[];
  attendees: MeetingAttendeeDetails[];
  description: string;
  setShowSettings: Function;
  showSettings: Boolean;
  isOrganizer: Boolean;
  state: MeetingState;
  reloadMeeting: Function;
};

const MeetingDescription = ({
  name,
  meetingId,
  organizers,
  attendees,
  description,
  setShowSettings,
  showSettings,
  isOrganizer,
  state,
  reloadMeeting,
}: MeetingDescriptionProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const organizersIcons = organizers.map((organizer: MeetingAttendeeDetails) => {
    return (
      <div className={styles.organizer}>
        <UserIcon
          name={organizer.user.username}
          meetingId={meetingId}
          attendeeId={organizer.attendeeId}
          canDelete={false}
          key={'organizer' + organizer.attendeeId}
        />
      </div>
    );
  });

  const attendeesIcons = attendees.map((attendee: MeetingAttendeeDetails) => {
    return (
      <div className={styles.attendeeContainer}>
        <UserIcon
          name={attendee.user.username}
          meetingId={meetingId}
          attendeeId={attendee.attendeeId}
          canDelete={false}
          key={'attendee' + attendee.attendeeId}
        />
        <div className={styles.buttonContainer}>
          <PlusButton
            onAdd={() =>
              updateMeetingAttendee(
                meetingId,
                attendee.attendeeId,
                {
                  role: MeetingRole.ORGANIZER,
                  markedTimeRanges: attendee.markedTimeRanges,
                },
                reloadMeeting
              )
            }
          />
        </div>
      </div>
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
          <div className={styles.canceledMeetingInfo}>{MeetingState.CANCELLED}</div>
        </Col>
      )}
      <Col lg={12} className="mt-5">
        <div className={styles.attendeeContainer}>
          <div className={styles.meetingDescriptionOrganizer}>
            {organizers.length > 1 ? 'Organizers' : 'Organizer'}
          </div>
          {organizersIcons}
          {isOrganizer && (
            <div className={styles.buttonContainer}>
              <PlusButton onAdd={() => setModalShow(true)} />
            </div>
          )}
        </div>
      </Col>
      <Col md={8} lg={6} xl={4} className="text-left mt-5">
        {description}
      </Col>
      <Popup show={modalShow} title={'Add organizers'} onClose={() => setModalShow(false)}>
        <div className={styles.attendeesIcons}>{attendeesIcons}</div>
      </Popup>
    </Row>
  );
};
export default MeetingDescription;
