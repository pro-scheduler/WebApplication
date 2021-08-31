import { post, get, put, del } from '../genericApiCalls';
import {
  getMeetingsUrl,
  getMeetingUrl,
  getLeaveMeetingUrl,
  getMeetingAttendeeUrl,
  getCancelMeetingUrl,
} from './urls';
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
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) =>
  del(
    getMeetingAttendeeUrl(meetingId, attendeeId),
    setData,
    setResponse,
    true,
    'User successfully removed from the meeting',
    onSuccess
  );

export const saveUserTimeRanges = (
  meetingId: number,
  attendeeId: number,
  userMarkedTimeRanges: TimeRangeDTO[],
  setUser: Function
) =>
  put(
    { markedTimeRanges: userMarkedTimeRanges },
    getMeetingAttendeeUrl(meetingId, attendeeId),
    setUser,
    () => {},
    true,
    'Time saved successfully'
  );

export const leaveMeeting = (
  meetingId: number,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
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

export const updateFinalDate = (
  finalDate: TimeRangeDTO,
  meetingId: number,
  setData?: Function,
  setResponse?: Function,
  onSuccess?: Function
) =>
  put(
    {
      finalDate,
    },
    getMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    'Final date saved',
    onSuccess
  );

export const cancelMeeting = (
  meetingId: number,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) =>
  post(
    {},
    getCancelMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    'You successfully canceled the meeting',
    onSuccess
  );

export const updateMeetingNameAndDescription = (
  name: string,
  description: string,
  meetingId: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  put(
    {
      name,
      description,
    },
    getMeetingUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully updated meeting name and description',
    onSuccess
  );
