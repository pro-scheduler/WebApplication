import { del, post, put } from '../genericApiCalls';
import {
  MeetingTimeReminderRequest,
  SurveyReminderRequest,
  SurveyTimeReminderRequest,
} from '../../model/notification/Notification';
import {
  getCreateSurveyReminderUrl,
  getCreateUpdateSurveyTimeReminderUrl,
  getCreateUpdateTimeReminderUrl,
  getDeleteSurveyTimeReminderUrl,
  getDeleteTimeReminderUrl,
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

export const createOrUpdateSurveyTimeReminder = (
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

export const createOrUpdateMeetingTimeReminder = (
  meetingTimeReminderRequest: MeetingTimeReminderRequest,
  setResponse?: Function,
  setData?: Function
) => {
  put(
    meetingTimeReminderRequest,
    getCreateUpdateTimeReminderUrl(),
    setData,
    setResponse,
    true,
    'Time voting reminder has been updated  successfully'
  );
};

export const deleteMeetingTimeReminder = (
  meetingId: number,
  setResponse?: Function,
  setData?: Function
) => {
  del(
    getDeleteTimeReminderUrl(meetingId),
    setData,
    setResponse,
    true,
    'Time voting reminder has been deleted successfully'
  );
};
