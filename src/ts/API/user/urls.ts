export const getUsersUrl = () => `${process.env.REACT_APP_API_URL}users`;

export const getUserUrl = (userId: number) => getUsersUrl() + `/${userId}`;

export const getUserParticipatedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?roles=attendee';

export const getUserOrganizedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?roles=organizer';

export const getCurrentUserUrl = () => `${getUsersUrl()}/me`;
