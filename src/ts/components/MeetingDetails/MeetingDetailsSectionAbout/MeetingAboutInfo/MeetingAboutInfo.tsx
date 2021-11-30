import {
  MeetingAttendeeDetails,
  MeetingDetails,
  MeetingRole,
  MeetingState,
  MeetingType,
  RealMeetingDetails,
} from '../../../../model/meeting/Meeting';
import Card from '../../../common/Card/Card';
import styles from './MeetingAboutInfo.module.css';
import UserInfoIcon from '../../MeetingParticipants/UserInfoIcon';
import PlusButton from '../../../common/SubmitButton/ActionButton/PlusButton';
import {
  updateMeetingAttendee,
  updateMeetingNameAndDescription,
} from '../../../../API/meeting/meetingService';
import React, { useEffect, useState } from 'react';
import UserNameIcon from '../../../common/Icons/UserNameIcon';
import SearchBox from '../../../common/forms/Input/SearchBox';
import Popup from '../../../common/Popup/Popup';
import SingleValueInput from '../../../common/forms/Input/SingleValueInput';
import { maxSings, minSings, required } from '../../../../tools/validator';
import TextArea from '../../../common/forms/TextArea/TextArea';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';

export type MeetingAboutInfoProps = {
  meeting: MeetingDetails;
  isOrganizer: boolean;
  onMeetingChange: Function;
};

const filterAttendeesByRole = (meeting: MeetingDetails, role: MeetingRole) =>
  meeting.attendees.filter((attendee: MeetingAttendeeDetails) => attendee.role === role);

const MeetingAboutInfo = ({ meeting, isOrganizer, onMeetingChange }: MeetingAboutInfoProps) => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [editNameAndDescription, setEditNameAndDescription] = useState<boolean>(false);
  const [newName, setName] = useState<string>('');
  const [newDescription, setDescription] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
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
    // eslint-disable-next-line
  }, [searchTerm]);

  const updateDetails = () => {
    if (meeting.name !== newName || meeting.description !== newDescription) {
      updateMeetingNameAndDescription(
        newName,
        newDescription,
        meeting.id,
        meeting.type === MeetingType.REAL
          ? (meeting as RealMeetingDetails).finalPlace?.id
          : undefined,
        () => {},
        () => {
          setName(newName);
          setDescription(newDescription);
          onMeetingChange();
          setEditNameAndDescription(false);
        }
      );
    }
  };

  useEffect(() => {
    setName(meeting.name);
    setDescription(meeting.description);
  }, [meeting]);

  return (
    <Card
      title={'About'}
      onEdit={
        isOrganizer && meeting.state === MeetingState.OPEN
          ? () => {
              setEditNameAndDescription(!editNameAndDescription);
            }
          : undefined
      }
    >
      {editNameAndDescription ? (
        <>
          <p className={styles.editLabel}>Meeting name</p>
          <SingleValueInput
            value={newName}
            valueHandler={setName}
            setInvalid={setInvalidNameDesc}
            validation={[
              { validation: required, message: 'This field is required' },
              { validation: minSings(5), message: 'Min 5 signs' },
              { validation: maxSings(255), message: 'Max 255 signs' },
            ]}
            placeholder="Please type meeting name ..."
          />
          <p className={styles.editLabel}>Meeting description</p>
          <TextArea
            defaultValue={newDescription}
            valueHandler={setDescription}
            setInvalid={setInvalidNameDesc}
            validation={[{ validation: maxSings(500), message: 'Max 500 signs' }]}
            placeholder="Please type meeting description ..."
          />
          <div className={styles.updateButtonContainer}>
            <ActionButton
              onclick={() => {
                updateDetails();
              }}
              disabled={
                invalidNameDesc ||
                (meeting.name === newName && meeting.description === newDescription)
              }
              text="Save changes"
              className={styles.updateButton}
            />
          </div>
        </>
      ) : (
        <>
          <div>{meeting.description}</div>
          <div className={styles.organizersContainer}>
            <span className={styles.organizersLabel}>Organizers:</span>
            <div className={styles.organizersIconsContainer}>
              {organizersIcons}
              {isOrganizer && meeting.state === MeetingState.OPEN && (
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
        </>
      )}
    </Card>
  );
};

export default MeetingAboutInfo;
