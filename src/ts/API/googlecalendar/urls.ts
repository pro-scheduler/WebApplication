import { getMeetingUrl } from '../meeting/urls';

export const getGoogleCalendarUrl = () => `${process.env.REACT_APP_API_URL}google-calendar`;

export const getCurrentGoogleCalendarUserUrl = () => `${getGoogleCalendarUrl()}/me`;

export const getAddGoogleCalendarEventUrl = (meetingId: number) =>
  `${getMeetingUrl(meetingId)}/add-to-google-calendar`;

export const getGoogleCalendarUserCalendarsUrl = () =>
  `${getCurrentGoogleCalendarUserUrl()}/calendars`;
