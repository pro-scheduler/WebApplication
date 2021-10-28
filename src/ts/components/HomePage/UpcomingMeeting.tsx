import { MeetingAttendeeDetails, MeetingDetails } from '../../model/meeting/Meeting';
import styles from './UpcomingMeeting.module.css';
import ArrowButton from '../common/RoundButtons/ArrowButton';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import UserIcon from '../common/Icons/UserIcon';

const UpcomingMeeting = ({ meeting }: { meeting: MeetingDetails }) => {
  const history = useHistory();
  const [startTime, setStartTime] = useState<Date | undefined>();
  const [endTime, setEndTime] = useState<Date | undefined>();

  useEffect(() => {
    if (meeting.finalDate) {
      setStartTime(new Date(meeting.finalDate.timeStart));
      setEndTime(new Date(meeting.finalDate.timeEnd));
    }
  }, [meeting]);

  return (
    <div className={styles.containerOfContainer}>
      <div className={styles.container}>
        <div className={styles.upcomingMeetingHeader}>Upcoming meeting</div>
        <div className={styles.meetingName}>{meeting.name}</div>
        {startTime && endTime && (
          <div className={styles.meetingTime}>
            {startTime.toLocaleString('en-US', {
              hour: 'numeric',
              hour12: true,
              minute: 'numeric',
            })}{' '}
            -{' '}
            {endTime.toLocaleString('en-US', {
              hour: 'numeric',
              hour12: true,
              minute: 'numeric',
            })}
          </div>
        )}
        {startTime && endTime && (
          <div className={styles.meetingDate}>
            {startTime.toLocaleDateString() === endTime.toLocaleDateString()
              ? startTime.toLocaleDateString()
              : startTime.toLocaleDateString() + ' - ' + endTime.toLocaleDateString()}
          </div>
        )}
        {meeting.description && (
          <div className={styles.meetingDescription}>{meeting.description}</div>
        )}
        <div>
          <div className={styles.participantsIcons}>
            {meeting.attendees.slice(0, 1).map((attendee: MeetingAttendeeDetails) => (
              <UserIcon user={attendee.user} key={attendee.attendeeId} />
            ))}
          </div>
          <div className={styles.arrowButton}>
            <ArrowButton onclick={() => history.push('/meetings/' + meeting.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeeting;
