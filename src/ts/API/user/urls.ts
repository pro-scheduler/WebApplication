export const getUsersUrl = () => `${process.env.REACT_APP_API_URL}users`;

export const getUserUrl = (userId: number) => getUsersUrl() + `/${userId}`;

export const getUserParticipatedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?organized=false';

export const getUserOrganizedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?organized=true';
