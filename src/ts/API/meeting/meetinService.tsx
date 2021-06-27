import { post } from '../genericApiCalls';
import { MeetingDetailsDTO } from '../../model/meeting/Meeting';
import { getMeetingsUrl } from './urls';

export const saveMeeting = (
  meeting: MeetingDetailsDTO,
  setResponse?: Function,
  successMessage?: string
) => post(meeting, getMeetingsUrl(), setResponse, successMessage);
