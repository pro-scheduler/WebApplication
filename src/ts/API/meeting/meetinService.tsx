import { post, get } from '../genericApiCalls';
import { MeetingDetailsDTO } from '../../model/meeting/Meeting';
import { getMeetingsUrl, getMeetingUrl } from './urls';

export const saveMeeting = (
  meeting: MeetingDetailsDTO,
  setResponse?: Function,
  successMessage?: string
) => post(meeting, getMeetingsUrl(), setResponse, true, successMessage);

export const loadMeeting = (id: number, setResponse?: Function) =>
  get(getMeetingUrl(id), setResponse);
