export const getMeetingsUrl = () => 'http://localhost:9000/api/meetings';

export const getMeetingUrl = (meetingId: number) =>
  `http://localhost:9000/api/meetings/${meetingId}`;

export const getMeetingTimeRangesUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/timeranges';

export const getMeetingParticipantsUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/participants';

export const getMeetingOrganizersUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/organizers';

export const getJoinMeetingUrl = () => getMeetingsUrl() + '/join';

export const getLeaveMeetingUrl = () => getMeetingsUrl() + '/leave';
