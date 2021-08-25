import { post, get, put, del } from '../genericApiCalls';
import { getMeetingsUrl, getMeetingUrl, getLeaveMeetingUrl, getMeetingAttendeeUrl } from './urls';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { CreateMeetingRequest } from '../../model/meeting/Meeting';

export const saveMeeting = (
  createRequest: CreateMeetingRequest,
  setMeetingId: Function,
  setResponse?: Function,
  successMessage?: string
) => post(createRequest, getMeetingsUrl(), setMeetingId, setResponse, true, successMessage);

export const loadMeeting = (id: number, setMeeting: Function, setResponse?: Function) =>
  get(getMeetingUrl(id), setMeeting, setResponse);

export const fetchAllMeetings = (setMeetings: Function, setResponse?: Function) =>
  get(getMeetingsUrl(), setMeetings, setResponse);

export const removeAttendeeFromMeeting = (
  meetingId: number,
  attendeeId: number,
  setData?: Function,
  setResponse?: Function
) =>
  del(
    getMeetingAttendeeUrl(meetingId, attendeeId),
    setData,
    setResponse,
    true,
    'User successfully removed from the meeting'
  );

export const saveUserTimeRanges = (
  meetingId: number,
  attendeeId: number,
  userMarkedTimeRanges: TimeRangeDTO[],
  refreshTimeData: Function
) =>
  put(
    { markedTimeRanges: userMarkedTimeRanges },
    getMeetingAttendeeUrl(meetingId, attendeeId),
    () => {},
    () => {},
    true,
    'Time saved successfully',
    refreshTimeData
  );

export const leaveMeeting = (
  meetingId: number,
  setData?: Function,
  setResponse?: Function,
  onSuccess?: Function
) =>
  post(
    {},
    getLeaveMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    'You successfully left the meeting',
    onSuccess
  );
