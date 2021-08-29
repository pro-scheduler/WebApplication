import TimeReminder, { TimeUnit } from './TimeReminder';
import { useState } from 'react';
import {
  deleteMeetingTimeReminder,
  createOrUpdateMeetingTimeReminder,
} from '../../../API/notification/notificationService';

export type MeetingTimeVotingReminderProps = {
  meetingName: string;
  deadline: Date;
  meetingId: number;
};
const MeetingTimeVotingReminder = ({
  meetingName,
  deadline,
  meetingId,
}: MeetingTimeVotingReminderProps) => {
  const [reminder, setReminder] = useState<boolean>(false);
  const [value, setValue] = useState<number>(15);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);

  const sendReminders = () => {
    const date = new Date(deadline);

    // TODO remove when API will change
    if (timeUnit === TimeUnit.MINUTES) {
      date.setMinutes(deadline.getMinutes() - value);
    } else if (timeUnit === TimeUnit.HOURS) {
      date.setHours(deadline.getHours() - value);
    } else {
      date.setDate(deadline.getDate() - value);
    }
    if (reminder) {
      createOrUpdateMeetingTimeReminder({
        meetingId: meetingId,
        meetingName: meetingName,
        newTimeToSendNotification: date,
        timePreferencesDeadline: deadline,
      });
    } else {
      deleteMeetingTimeReminder(meetingId);
    }
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Voting meeting time reminder'}
      checkboxLabel={'Send reminder about the meeting voting deadline to all participants'}
      beforeLabel={'before the meeting starts'}
      timeUnit={timeUnit}
      setTimeUnit={setTimeUnit}
      reminder={reminder}
      setReminder={setReminder}
      value={value}
      setValue={setValue}
    />
  );
};

export default MeetingTimeVotingReminder;
