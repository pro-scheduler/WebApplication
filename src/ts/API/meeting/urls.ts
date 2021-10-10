export const getMeetingsUrl = () => `${process.env.REACT_APP_API_URL}meetings`;

export const getMeetingUrl = (meetingId: number) => getMeetingsUrl() + `/${meetingId}`;

export const getLeaveMeetingUrl = (meetingId: number) => getMeetingUrl(meetingId) + '/leave';

export const getCancelMeetingUrl = (meetingId: number) => getMeetingUrl(meetingId) + '/cancel';

export const getMeetingAttendeeUrl = (meetingId: number, attendeeId: number) =>
  getMeetingUrl(meetingId) + `/attendees/${attendeeId}`;

export const getShareMeetingUrl = () => `${process.env.REACT_APP_API_URL}share`;

export const getGenerateSharedMeetingUrl = () => getShareMeetingUrl() + '/generate';

export const getMeetingByGeneratedEndpointUrl = (generatedEndpoint: string) =>
  getShareMeetingUrl() + `/${generatedEndpoint}`;

export const getJoinMeetingByGeneratedEndpointUrl = (generatedEndpoint: string) =>
  getMeetingByGeneratedEndpointUrl(generatedEndpoint) + '/join';
