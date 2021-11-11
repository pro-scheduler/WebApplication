import {
  MeetingAttendeeDetails,
  MeetingDetails,
  MeetingRole,
} from '../../../../model/meeting/Meeting';
import Card from '../../../common/Card/Card';
import styles from './MeetingAboutInfo.module.css';
import UserInfoIcon from '../../MeetingParticipants/UserInfoIcon';
import PlusButton from '../../../common/SubmitButton/ActionButton/PlusButton';
import { updateMeetingAttendee } from '../../../../API/meeting/meetingService';
import React, { useEffect, useState } from 'react';
import UserNameIcon from '../../../common/Icons/UserNameIcon';
import SearchBox from '../../../common/forms/Input/SearchBox';
import Popup from '../../../common/Popup/Popup';

export type MeetingAboutInfoProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  onMeetingChange: Function;
};

const filterAttendeesByRole = (meeting: MeetingDetails, role: MeetingRole) =>
  meeting.attendees.filter((attendee: MeetingAttendeeDetails) => attendee.role === role);

const MeetingAboutInfo = ({ meeting, isOrganizer, onMeetingChange }: MeetingAboutInfoProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MeetingAttendeeDetails[]>(
    filterAttendeesByRole(meeting, MeetingRole.ATTENDEE)
  );
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const attendees = filterAttendeesByRole(meeting, MeetingRole.ATTENDEE);
  const organizers = filterAttendeesByRole(meeting, MeetingRole.ORGANIZER);

  const attendeesIcons = searchResults.map((attendee: MeetingAttendeeDetails) => {
    return (
      <div className={styles.attendeeContainer} key={'attendee' + attendee.attendeeId}>
        <UserInfoIcon
          user={attendee.user}
          meetingId={meeting.id}
          attendeeId={attendee.attendeeId}
          canDelete={false}
        />
        <div className={styles.buttonContainer}>
          <PlusButton
            onAdd={() =>
              updateMeetingAttendee(
                meeting.id,
                attendee.attendeeId,
                {
                  role: MeetingRole.ORGANIZER,
                  markedTimeRanges: attendee.markedTimeRanges,
                },
                onMeetingChange
              )
            }
          />
        </div>
      </div>
    );
  });

  const organizersIcons = organizers.map((organizer: MeetingAttendeeDetails, index: number) => (
    <div key={index} style={{ left: index * 25, position: 'absolute' }}>
      <UserNameIcon user={organizer.user} email={organizer.user.username} showEmail={false} />
    </div>
  ));

  useEffect(() => {
    setSearchResults(
      searchTerm !== ''
        ? attendees.filter((attendee: MeetingAttendeeDetails) =>
            attendee.user.username.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : attendees
    );
  }, [searchTerm, attendees]);

  return (
    <Card title={'About'}>
      <div>{meeting.description}</div>
      <div className={styles.organizersContainer}>
        <span className={styles.organizersLabel}>Organizers:</span>
        <div className={styles.organizersIconsContainer}>
          {organizersIcons}
          {isOrganizer && (
            <div
              className={styles.buttonContainer}
              style={{ left: organizers.length * 25, position: 'absolute' }}
            >
              <PlusButton onAdd={() => setModalShow(true)} />
            </div>
          )}
        </div>
      </div>
      <Popup show={modalShow} title={'Add organizers'} onClose={() => setModalShow(false)}>
        <SearchBox value={searchTerm} onChange={handleChange} />
        <div className={styles.attendeesIcons}>{attendeesIcons}</div>
      </Popup>
    </Card>
  );
};

export default MeetingAboutInfo;
