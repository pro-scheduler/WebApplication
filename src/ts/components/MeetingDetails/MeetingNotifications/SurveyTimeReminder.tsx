import TimeReminder from './TimeReminder';
import { useEffect, useState } from 'react';
import {
  createOrUpdateSurveyTimeReminder,
  deleteSurveyTimeReminder,
  getSurveyTimeReminder,
} from '../../../API/notification/notificationService';
import {
  NotificationSettings,
  ReminderInfo,
  TimeUnit,
} from '../../../model/notification/Notification';

export type SurveyTimeReminderProps = {
  meetingId: number;
  surveyId: number;
  surveyEndDate: Date;
};

const SurveyTimeReminder = ({ meetingId, surveyId, surveyEndDate }: SurveyTimeReminderProps) => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>();
  const [reminderInfo, setReminderInfo] = useState<ReminderInfo>({
    timeUnit: TimeUnit.MINUTES,
    value: 15,
    sendReminder: false,
  });

  useEffect(() => {
    getSurveyTimeReminder(surveyId, setNotificationSettings);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (notificationSettings) {
      console.log(notificationSettings);
      setReminderInfo({
        timeUnit: notificationSettings.timeUnit,
        value: notificationSettings.value,
        sendReminder: notificationSettings.sendNotification,
      });
    }
  }, [notificationSettings]);

  const sendReminders = () => {
    if (reminderInfo.sendReminder) {
      createOrUpdateSurveyTimeReminder({
        meetingId: meetingId,
        surveyId: surveyId,
        reminderInfo: reminderInfo,
        originalSurveyTime: surveyEndDate,
      });
    } else {
      deleteSurveyTimeReminder(surveyId);
    }
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Survey time reminder'}
      checkboxLabel={'Send reminder about the survey to all participants'}
      beforeLabel={'before the survey closes'}
      reminderInfo={reminderInfo}
      setReminderInfo={setReminderInfo}
    />
  );
};

export default SurveyTimeReminder;
