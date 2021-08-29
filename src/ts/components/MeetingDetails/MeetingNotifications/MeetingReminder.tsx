import TimeReminder, { TimeUnit } from './TimeReminder';
import { useState } from 'react';
import {
  createOrUpdateMeetingReminder,
  deleteMeetingReminder,
} from '../../../API/notification/notificationService';

export type MeetingTimeVotingReminderProps = {
  meetingName: string;
  finalDate: Date;
  meetingId: number;
};
const MeetingReminder = ({ meetingName, finalDate, meetingId }: MeetingTimeVotingReminderProps) => {
  const [reminder, setReminder] = useState<boolean>(false);
  const [value, setValue] = useState<number>(15);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);

  const sendReminders = () => {
    const date = new Date(finalDate);

    // TODO remove when API will change
    if (timeUnit === TimeUnit.MINUTES) {
      date.setMinutes(finalDate.getMinutes() - value);
    } else if (timeUnit === TimeUnit.HOURS) {
      date.setHours(finalDate.getHours() - value);
    } else {
      date.setDate(finalDate.getDate() - value);
    }
    if (reminder) {
      createOrUpdateMeetingReminder({
        meetingId: meetingId,
        meetingName: meetingName,
        newTimeToSendNotification: date,
        originalMeetingTime: finalDate,
      });
    } else {
      deleteMeetingReminder(meetingId);
    }
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Meeting reminder'}
      checkboxLabel={'Send reminder about the meeting to all participants'}
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

export default MeetingReminder;
