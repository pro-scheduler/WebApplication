export const getInvitationsUrl = () => `${process.env.REACT_APP_API_URL}invitations`;

export const getInvitationUrl = (invitationId: number) => getInvitationsUrl() + `/${invitationId}`;

export const getAcceptInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/accept';

export const getRejectInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/reject';

export const getUserPendingInvitationsUrl = (userId: number) =>
  getInvitationsUrl() + `/user/${userId}`;

export const getMeetingInvitationsUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}?states=PENDING,REJECTED`;

export const getRemoveUserInvitationUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}/remove`;

export const getCreateSingleInvitationUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}/single`;
