import { del, get, post, put } from '../genericApiCalls';
import {
  getCancelMeetingUrl,
  getGenerateSharedMeetingUrl,
  getJoinMeetingByGeneratedEndpointUrl,
  getLeaveMeetingUrl,
  getMeetingAttendeeUrl,
  getMeetingByGeneratedEndpointUrl,
  getMeetingSettingsUrl,
  getMeetingsUrl,
  getMeetingUrl,
  getUserHomePageDetailsUrl,
} from './urls';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import {
  CreateMeetingRequest,
  MeetingSettings,
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

export const updateOnlineMeetingDetails = (
  finalDate: TimeRangeDTO | undefined,
  link: string | undefined,
  password: string | undefined,
  markTimeRangeDeadline: Date | null,
  meetingId: number,
  setData?: Function,
  setResponse?: Function,
  onSuccess?: Function,
  customSuccesMessage?: string
) =>
  put(
    {
      finalDate: finalDate,
      link: link,
      password: password,
      markTimeRangeDeadline: markTimeRangeDeadline,
    },
    getMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    customSuccesMessage ? customSuccesMessage : 'Meeting details have been updated successfully',
    onSuccess
  );

export const updateRealMeetingDetails = (
  finalDate: TimeRangeDTO | undefined,
  finalMeetingPlaceId: number | undefined,
  markTimeRangeDeadline: Date | null,
  meetingId: number,
  setData?: Function,
  setResponse?: Function,
  onSuccess?: Function,
  customSuccesMessage?: string
) =>
  put(
    {
      finalDate: finalDate,
      finalMeetingPlaceId: finalMeetingPlaceId,
      markTimeRangeDeadline: markTimeRangeDeadline,
    },
    getMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    customSuccesMessage ? customSuccesMessage : 'Meeting details have been updated successfully',
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
  finalMeetingPlaceId?: number,
  setResponse?: Function,
  onSuccess?: Function
) =>
  put(
    finalMeetingPlaceId
      ? {
          name: name,
          description: description,
          finalMeetingPlaceId: finalMeetingPlaceId,
        }
      : {
          name: name,
          description: description,
        },
    getMeetingUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully updated meeting name and description',
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

export const getUserHomePageDetails = (setData: Function, setResponse?: Function) => {
  get(getUserHomePageDetailsUrl(), setData, setResponse);
};

export const generateSharedMeetingEndpoint = (
  meetingId: number,
  setData: Function,
  onSuccess?: Function,
  setResponse?: Function
) => {
  post(
    {
      meetingId,
    },
    getGenerateSharedMeetingUrl(),
    setData,
    setResponse,
    true,
    undefined,
    onSuccess
  );
};

export const getMeetingByGeneratedEndpoint = (
  generatedEndpoint: string,
  setMeeting: Function,
  setResponse?: Function
) => get(getMeetingByGeneratedEndpointUrl(generatedEndpoint), setMeeting, setResponse);

export const joinMeetingByGeneratedEndpoint = (
  generatedEndpoint: string,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) => {
  post(
    {},
    getJoinMeetingByGeneratedEndpointUrl(generatedEndpoint),
    setData,
    setResponse,
    true,
    'You successfully joined the meeting',
    onSuccess
  );
};

export const saveMeetingSettings = (
  meetingId: number,
  newSettings: MeetingSettings,
  onSuccess?: Function,
  setResponse?: Function
) =>
  post(
    newSettings,
    getMeetingSettingsUrl(meetingId),
    () => {},
    setResponse,
    true,
    'You have successfully modified general meeting settings',
    onSuccess
  );
export const getMeetingSettings = (
  meetingId: number,
  setSettings: Function,
  setResponse?: Function
) => get(getMeetingSettingsUrl(meetingId), setSettings, setResponse, false);

export const deleteMeeting = (
  meetingId: number,
  onSuccess?: Function,
  setResponse?: Function,
  setData?: Function
) =>
  del(
    getMeetingUrl(meetingId),
    setData,
    setResponse,
    true,
    'The meeting has been removed successfully',
    onSuccess
  );
