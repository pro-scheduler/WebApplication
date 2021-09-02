import TimeReminder from './TimeReminder';
import { useEffect, useState } from 'react';
import {
  createOrUpdateMeetingReminder,
  deleteMeetingReminder,
  getMeetingReminder,
} from '../../../API/notification/notificationService';
import {
  NotificationSettings,
  ReminderInfo,
  TimeUnit,
} from '../../../model/notification/Notification';

export type MeetingTimeVotingReminderProps = {
  meetingName: string;
  finalDate: Date;
  meetingId: number;
};
const MeetingReminder = ({ meetingName, finalDate, meetingId }: MeetingTimeVotingReminderProps) => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>();
  const [reminderInfo, setReminderInfo] = useState<ReminderInfo>({
    timeUnit: TimeUnit.MINUTES,
    value: 15,
    sendReminder: false,
  });

  useEffect(() => {
    getMeetingReminder(meetingId, setNotificationSettings);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(finalDate);
    if (notificationSettings) {
      setReminderInfo({
        timeUnit: notificationSettings.timeUnit,
        value: notificationSettings.value,
        sendReminder: notificationSettings.sendNotification,
      });
    }
  }, [notificationSettings]);

  const sendReminders = () => {
    if (reminderInfo.sendReminder) {
      createOrUpdateMeetingReminder({
        meetingId: meetingId,
        meetingName: meetingName,
        reminderInfo: reminderInfo,
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
      reminderInfo={reminderInfo}
      setReminderInfo={setReminderInfo}
    />
  );
};

export default MeetingReminder;
