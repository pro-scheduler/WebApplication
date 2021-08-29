import { del, post, put } from '../genericApiCalls';
import {
  SurveyReminderRequest,
  SurveyTimeReminderRequest,
} from '../../model/notification/Notification';
import {
  getCreateSurveyReminderUrl,
  getCreateUpdateSurveyTimeReminderUrl,
  getDeleteSurveyTimeReminderUrl,
} from './urls';

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

export const createSurveyTimeReminder = (
  surveyTimeReminderRequest: SurveyTimeReminderRequest,
  setResponse?: Function,
  setData?: Function
) => {
  post(
    surveyTimeReminderRequest,
    getCreateUpdateSurveyTimeReminderUrl(),
    setData,
    setResponse,
    true,
    'Survey reminder has been saved successfully'
  );
};

export const updateSurveyTimeReminder = (
  surveyTimeReminderRequest: SurveyTimeReminderRequest,
  setResponse?: Function,
  setData?: Function
) => {
  put(
    surveyTimeReminderRequest,
    getCreateUpdateSurveyTimeReminderUrl(),
    setData,
    setResponse,
    true,
    'Survey reminder has been updated successfully'
  );
};

export const deleteSurveyTimeReminder = (
  surveyId: number,
  setResponse?: Function,
  setData?: Function
) => {
  del(
    getDeleteSurveyTimeReminderUrl(surveyId),
    setData,
    setResponse,
    true,
    'Survey reminder has been deleted successfully'
  );
};
