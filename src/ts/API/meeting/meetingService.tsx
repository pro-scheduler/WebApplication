import { post, get } from '../genericApiCalls';
import { MeetingDetailsDTO } from '../../model/meeting/Meeting';
import {
  getMeetingsUrl,
  getMeetingUrl,
  getRemoveUserFromMeetingUrl,
  getSaveUserTimeUrl,
} from './urls';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
export const saveMeeting = (
  meeting: MeetingDetailsDTO,
  setMeetingId: Function,
  setResponse?: Function,
  successMessage?: string
) => post(meeting, getMeetingsUrl(), setMeetingId, setResponse, true, successMessage);

export const loadMeeting = (id: number, setMeeting: Function, setResponse?: Function) =>
  get(getMeetingUrl(id), setMeeting, setResponse);

export const fetchAllMeetings = (setMeetings: Function, setResponse?: Function) =>
  get(getMeetingsUrl(), setMeetings, setResponse);

export const removeUserFromMeeting = (
  meetingId: number,
  userId: number,
  setData?: Function,
  setResponse?: Function
) =>
  post(
    { id: userId },
    getRemoveUserFromMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    'User successfully removed from the meeting'
  );

export const saveUserTimeRanges = (meetingId: number, userMarkedTimeRanges: TimeRangeDTO[]) =>
  post(
    userMarkedTimeRanges,
    getSaveUserTimeUrl(meetingId),
    () => {},
    () => {},
    true,
    'time saved successfully'
  );
