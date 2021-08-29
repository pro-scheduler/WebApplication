import { post } from '../genericApiCalls';
import { SurveyReminderRequest } from '../../model/notification/Notification';
import { getCreateSurveyReminderUrl } from './urls';

export const createSurveyReminder = (
  surveyReminderRequests: SurveyReminderRequest,
  setResponse?: Function,
  setData?: Function
) => {
  post(
    surveyReminderRequests,
    getCreateSurveyReminderUrl(),
    setData,
    setResponse,
    true,
    'Survey reminders have been sent successfully'
  );
};
