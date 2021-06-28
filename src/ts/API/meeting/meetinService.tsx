import { post, get } from '../genericApiCalls';
import { MeetingDetailsDTO } from '../../model/meeting/Meeting';
import { getMeetingsUrl, getMeetingUrl, getRemoveUserFromMeetingUrl } from './urls';

export const saveMeeting = (
  meeting: MeetingDetailsDTO,
  setResponse?: Function,
  successMessage?: string
) => post(meeting, getMeetingsUrl(), setResponse, true, successMessage);

export const loadMeeting = (id: number, setResponse?: Function) =>
  get(getMeetingUrl(id), setResponse);

export const fetchAllMeetings = (setResponse?: Function) => get(getMeetingsUrl(), setResponse);

export const removeUserFromMeeting = (meetingId: number, userId: number, setResponse?: Function) =>
  post(
    { id: userId },
    getRemoveUserFromMeetingUrl(meetingId),
    setResponse,
    true,
    'User succesfully removed from the meeting'
  );
