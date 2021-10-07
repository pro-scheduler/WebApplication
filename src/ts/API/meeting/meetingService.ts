import { del, get, post, put } from '../genericApiCalls';
import {
  getCancelMeetingUrl,
  getLeaveMeetingUrl,
  getMeetingAttendeeUrl,
  getMeetingsUrl,
  getMeetingUrl,
} from './urls';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import {
  CreateMeetingRequest,
  HomeInfo,
  MeetingState,
  MeetingType,
  UpdateMeetingAttendeeRequest,
} from '../../model/meeting/Meeting';

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

export const updateMeetingTimeDeadline = (
  deadline: Date,
  meetingId: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  put(
    {
      markTimeRangeDeadline: deadline,
    },
    getMeetingUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully updated time voting deadline',
    onSuccess
  );

export const updateMeetingAttendee = (
  meetingId: number,
  attendeeId: number,
  updateMeetingAttendeeRequest: UpdateMeetingAttendeeRequest,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) =>
  put(
    updateMeetingAttendeeRequest,
    getMeetingAttendeeUrl(meetingId, attendeeId),
    setData,
    setResponse,
    true,
    'Attendee role has been updated successfully',
    onSuccess
  );

export const getHomeInfo = (setHomeInfo: Function, setResponse?: Function) => {
  const homeInfo: HomeInfo = {
    declarations: 5,
    invitations: 1,
    surveys: 0,
    upcomingMeetings: [
      {
        id: 0,
        name: 'Cooking workshop',
        description: 'Ala ma kota i kot ma ale',
        type: MeetingType.REAL,
        organizers: [{ id: 0, username: 'Ola', email: 'ola@mail.com' }],
        state: MeetingState.OPEN,
        finalDate: {
          timeStart: new Date(),
          timeEnd: new Date(),
        },
      },
      {
        id: 1,
        name: 'Meet Joe',
        description: 'Ala ma kota i kot ma ale',
        type: MeetingType.REAL,
        organizers: [
          { id: 0, username: 'Ola', email: 'ola@mail.com' },
          { id: 1, username: 'Ala', email: 'ola@mail.com' },
        ],
        state: MeetingState.OPEN,
        finalDate: {
          timeStart: new Date(),
          timeEnd: new Date(),
        },
      },
    ],
    todayMeetings: [],
  };
  setHomeInfo(homeInfo);
};
