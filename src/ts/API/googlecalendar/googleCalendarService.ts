import Cookies from 'js-cookie';
import { get, googleCalendarHeaders, post } from '../genericApiCalls';
import {
  getAddGoogleCalendarEventUrl,
  getCurrentGoogleCalendarUserUrl,
  getGoogleCalendarUserCalendarsUrl,
} from './urls';

export const googleCalendarTokenExists = () => Cookies.get('gc_access_token') != null;

export const getCurrentGoogleCalendarUser = (setGoogleCalendarUser: Function) => {
  get(
    getCurrentGoogleCalendarUserUrl(),
    setGoogleCalendarUser,
    () => {},
    false,
    undefined,
    () => {},
    googleCalendarHeaders
  );
};

export const listUserGoogleCalendars = (setCalendarsList: Function) => {
  get(
    getGoogleCalendarUserCalendarsUrl(),
    setCalendarsList,
    () => {},
    false,
    undefined,
    () => {},
    googleCalendarHeaders
  );
};

export const addMeetingToGoogleCalendar = (
  meetingId: number,
  calendarId: string,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) => {
  post(
    {
      calendarId: calendarId,
    },
    getAddGoogleCalendarEventUrl(meetingId),
    setData,
    setResponse,
    true,
    'Successfully added meeting to Google Calendar',
    onSuccess,
    googleCalendarHeaders
  );
};
