import { getMeetingUrl } from './urls';

export const fetchMeetingWithId = (meetingId: number) => {
  return fetch(getMeetingUrl(meetingId))
    .then((response: Response) => response.json())
    .then((meeting) => {
      return meeting;
    });
};
