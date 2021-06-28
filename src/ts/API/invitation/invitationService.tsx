import { get, post } from '../genericApiCalls';
import {
  getMeetingInvitationsUrl,
  getAcceptInvitationUrl,
  getRejectInvitationUrl,
  getUserPendingInvitationsUrl,
} from './urls';
import { InvitationEmailsDTO } from '../../model/invitation/Invitation';

export const createInvitations = (
  meetingId: number,
  invitationEmailsDTO: InvitationEmailsDTO,
  setResponse?: Function,
  setData?: Function
) =>
  post(
    invitationEmailsDTO,
    getMeetingInvitationsUrl(meetingId),
    setData,
    setResponse,
    true,
    'Ivitations has beed added succefully'
  );

export const fetchMeetingInvitations = (meetingId: number, setResponse: Function) =>
  get(getMeetingInvitationsUrl(meetingId), setResponse);

export const fetchUserPendingInvitations = (userId: number, setData: Function) =>
  get(getUserPendingInvitationsUrl(userId), setData);

export const acceptInvitation = (
  invitationId: number,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) =>
  post(
    {},
    getAcceptInvitationUrl(invitationId),
    setData,
    setResponse,
    true,
    'Invitation accepted successfully',
    onSuccess
  );

export const rejectInvitation = (
  invitationId: number,
  onSuccess?: Function,
  setData?: Function,
  setResponse?: Function
) =>
  post(
    {},
    getRejectInvitationUrl(invitationId),
    setData,
    setResponse,
    true,
    'Invitation rejected successfully',
    onSuccess
  );
