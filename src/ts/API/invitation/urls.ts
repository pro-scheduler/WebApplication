import { getMeetingUrl } from '../meeting/urls';

export const getInvitationsUrl = () => `${process.env.REACT_APP_API_URL}invitations`;

export const getInvitationUrl = (invitationId: number) => getInvitationsUrl() + `/${invitationId}`;

export const getAcceptInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/accept';

export const getRejectInvitationUrl = (invitationId: number) =>
  getInvitationUrl(invitationId) + '/reject';

export const getUserPendingInvitationsUrl = (userId: number) =>
  getInvitationsUrl() + '?states=pending';

export const getMeetingInvitationsUrl = (meetingId: number) =>
  getMeetingUrl(meetingId) + '/invitations';
