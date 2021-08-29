import TimeReminder, { TimeUnit } from './TimeReminder';
import { useState } from 'react';
import {
  deleteSurveyTimeReminder,
  updateSurveyTimeReminder,
} from '../../../API/notification/notificationService';

export type SurveyTimeReminderProps = {
  meetingId: number;
  surveyId: number;
  surveyEndDate: Date;
};

const SurveyTimeReminder = ({ meetingId, surveyId, surveyEndDate }: SurveyTimeReminderProps) => {
  // TODO replace by data from backend when API will be provided
  const [reminder, setReminder] = useState<boolean>(false);
  const [value, setValue] = useState<number>(15);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);

  const sendReminders = () => {
    const date = new Date(surveyEndDate);

    // TODO remove when API will change
    if (timeUnit === TimeUnit.MINUTES) {
      date.setMinutes(surveyEndDate.getMinutes() - value);
    } else if (timeUnit === TimeUnit.HOURS) {
      date.setHours(surveyEndDate.getHours() - value);
    } else {
      date.setDate(surveyEndDate.getDate() - value);
    }
    if (reminder) {
      updateSurveyTimeReminder({
        meetingId: meetingId,
        surveyId: surveyId,
        timeToSendNotification: date,
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
      timeUnit={timeUnit}
      setTimeUnit={setTimeUnit}
      reminder={reminder}
      setReminder={setReminder}
      value={value}
      setValue={setValue}
    />
  );
};

export default SurveyTimeReminder;
