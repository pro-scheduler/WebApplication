import { MeetingSummary } from '../../model/meeting/Meeting';
import styles from './UpcomingMeeting.module.css';
import ArrowButton from '../common/RoundButtons/ArrowButton';
import LetterIcon from '../common/Icons/LetterIcon';
import { UserSummary } from '../../model/user/ProUser';
import { useHistory } from 'react-router-dom';

const UpcomingMeeting = ({ meeting }: { meeting: MeetingSummary }) => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.upcomingMeetingHeader}>Upcoming meeting</div>
      <div className={styles.meetingName}>{meeting.name}</div>
      <div className={styles.meetingTime}>
        {meeting.finalDate?.timeStart.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        })}{' '}
        -{' '}
        {meeting.finalDate?.timeEnd.toLocaleString('en-US', {
          hour: 'numeric',
          hour12: true,
          minute: 'numeric',
        })}
      </div>
      <div className={styles.meetingDate}>
        {meeting.finalDate?.timeStart.toLocaleDateString() ===
        meeting.finalDate?.timeEnd.toLocaleDateString()
          ? meeting.finalDate?.timeStart.toLocaleDateString()
          : meeting.finalDate?.timeStart.toLocaleDateString() +
            ' - ' +
            meeting.finalDate?.timeEnd.toLocaleDateString()}
      </div>
      {meeting.description && (
        <div className={styles.meetingDescription}>{meeting.description}</div>
      )}
      <div className={styles.iconsContainer}>
        <div>
          {meeting.organizers.map((organizer: UserSummary) => (
            <LetterIcon firstLetter={organizer.username.charAt(0)} key={organizer.id} />
          ))}
        </div>
        <div>
          <ArrowButton onclick={() => history.push('/meetings/' + meeting.id)} />
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeeting;
