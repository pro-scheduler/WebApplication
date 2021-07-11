import { getUserOrganizedMeetingsUrl, getUserParticipatedMeetingsUrl } from './urls';
import { get } from '../genericApiCalls';

export const loadUserOrganizedMeetings = (
  userId: number,
  setMeetings: Function,
  setResponse?: Function
) => {
  get(getUserOrganizedMeetingsUrl(userId), setMeetings, setResponse);
};

export const loadUserParticipatedMeetings = (
  userId: number,
  setMeetings: Function,
  setResponse?: Function
) => {
  get(getUserParticipatedMeetingsUrl(userId), setMeetings, setResponse);
};
