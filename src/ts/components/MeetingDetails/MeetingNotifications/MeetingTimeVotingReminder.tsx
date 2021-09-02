import TimeReminder from './TimeReminder';
import { useEffect, useState } from 'react';
import {
  createOrUpdateMeetingTimeReminder,
  deleteMeetingTimeReminder,
  getMeetingTimeReminder,
} from '../../../API/notification/notificationService';
import {
  NotificationSettings,
  ReminderInfo,
  TimeUnit,
} from '../../../model/notification/Notification';

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
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>();
  const [reminderInfo, setReminderInfo] = useState<ReminderInfo>({
    timeUnit: TimeUnit.MINUTES,
    value: 15,
    sendReminder: false,
  });

  useEffect(() => {
    getMeetingTimeReminder(meetingId, setNotificationSettings);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
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
      createOrUpdateMeetingTimeReminder({
        meetingId: meetingId,
        meetingName: meetingName,
        reminderInfo: reminderInfo,
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
      beforeLabel={'before the time voting ends'}
      reminderInfo={reminderInfo}
      setReminderInfo={setReminderInfo}
    />
  );
};

export default MeetingTimeVotingReminder;
