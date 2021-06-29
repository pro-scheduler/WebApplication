export const getMeetingsUrl = () => `${process.env.REACT_APP_API_URL}meetings`;

export const getMeetingUrl = (meetingId: number) => getMeetingsUrl() + `/${meetingId}`;

export const getMeetingTimeRangesUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/timeranges';

export const getMeetingParticipantsUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/participants';

export const getMeetingOrganizersUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/organizers';

export const getJoinMeetingUrl = () => getMeetingsUrl() + '/join';

export const getLeaveMeetingUrl = () => getMeetingsUrl() + '/leave';

export const getRemoveUserFromMeetingUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/remove';

export const getSaveUserTimeUrl = (meetingId: number) => getMeetingUrl(meetingId) + '/timeranges';
