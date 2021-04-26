export const getUsersUrl = () => 'http://localhost:9000/api/users';

export const getUserUrl = (userId: number) => `http://localhost:9000/api/users/${userId}`;

export const getUserParticipatedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?organized=false';

export const getUserOrganizedMeetingsUrl = (userId: number) =>
  getUserUrl(userId) + '/meetings?organized=true';
