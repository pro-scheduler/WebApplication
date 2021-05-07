export const getInvitationsUrl = () => 'http://localhost:8080/api/invitations';

export const getInvitationUrl = (invitationId: number) =>
  `http://localhost:8080/api/invitations/${invitationId}`;

export const getAcceptInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/accept';

export const getRejectInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/reject';

export const getUserPendingInvitationsUrl = (userId: number) =>
  getInvitationsUrl() + `/user/${userId}`;

export const getMeetingInvitationsUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}`;

export const getRemoveUserInvitationUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}/remove`;

export const getCreateSingleInvitationUrl = (meetingId: number) =>
  getInvitationsUrl() + `/meeting/${meetingId}/single`;
