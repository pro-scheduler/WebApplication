import { del, get, post, put } from '../genericApiCalls';
import {
  CustomMessage,
  MeetingReminderRequest,
  MeetingTimeReminderRequest,
  SurveyReminderRequest,
  SurveyTimeReminderRequest,
  UserSettings,
} from '../../model/notification/Notification';
import {
  getCreateSurveyReminderUrl,
  getCreateUpdateMeetingReminderUrl,
  getCreateUpdateSurveyTimeReminderUrl,
  getCreateUpdateTimeReminderUrl,
  getCustomNotificationUrl,
  getMeetingReminderUrl,
  getSurveyTimeReminderUrl,
  getTimeReminderUrl,
  getUserSettingsUrl,
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
    getSurveyTimeReminderUrl(surveyId),
    setData,
    setResponse,
    true,
    'Survey reminder has been deleted successfully'
  );
};

export const getSurveyTimeReminder = (
  surveyId: number,
  setSurveyTimeReminder: Function,
  setResponse?: Function
) => {
  get(getSurveyTimeReminderUrl(surveyId), setSurveyTimeReminder, setResponse);
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
    'Time voting reminder has been updated successfully'
  );
};

export const deleteMeetingTimeReminder = (
  meetingId: number,
  setResponse?: Function,
  setData?: Function
) => {
  del(
    getTimeReminderUrl(meetingId),
    setData,
    setResponse,
    true,
    'Time voting reminder has been deleted successfully'
  );
};

export const getMeetingTimeReminder = (
  meetingId: number,
  setMeetingTimeReminder: Function,
  setResponse?: Function
) => {
  get(getTimeReminderUrl(meetingId), setMeetingTimeReminder, setResponse);
};

export const createOrUpdateMeetingReminder = (
  meetingReminderRequest: MeetingReminderRequest,
  setResponse?: Function,
  setData?: Function
) => {
  put(
    meetingReminderRequest,
    getCreateUpdateMeetingReminderUrl(),
    setData,
    setResponse,
    true,
    'Meeting reminder has been updated successfully'
  );
};

export const deleteMeetingReminder = (
  meetingId: number,
  setResponse?: Function,
  setData?: Function
) => {
  del(
    getMeetingReminderUrl(meetingId),
    setData,
    setResponse,
    true,
    'Meeting reminder has been deleted successfully'
  );
};

export const getMeetingReminder = (
  meetingId: number,
  setMeetingReminder: Function,
  setResponse?: Function
) => {
  get(getMeetingReminderUrl(meetingId), setMeetingReminder, setResponse);
};

export const sendCustomNotification = (
  customMessage: CustomMessage,
  onSuccess?: Function,
  setResponse?: Function,
  setData?: Function
) => {
  post(
    customMessage,
    getCustomNotificationUrl(),
    setData,
    setResponse,
    true,
    'Notification has been sent successfully',
    onSuccess
  );
};

export const getUserSettings = (setUserSettings: Function, setResponse?: Function) => {
  get(getUserSettingsUrl(), setUserSettings, setResponse);
};

export const updateUserSettings = (
  userSettings: UserSettings,
  onSuccess?: Function,
  setResponse?: Function,
  setData?: Function
) => {
  post(
    userSettings,
    getUserSettingsUrl(),
    setData,
    setResponse,
    true,
    'Notification settings has been modified successfully',
    onSuccess
  );
};
