import { get, post } from '../genericApiCalls';
import {
  getMeetingInvitationsUrl,
  getAcceptInvitationUrl,
  getRejectInvitationUrl,
  getUserPendingInvitationsUrl,
  getInvitationsUrl,
} from './urls';
import { CreateInvitationsRequest } from '../../model/invitation/Invitation';

export const createInvitations = (
  createRequest: CreateInvitationsRequest,
  setResponse?: Function,
  onSuccess?: Function,
  setData?: Function
) =>
  post(
    createRequest,
    getInvitationsUrl(),
    setData,
    setResponse,
    true,
    'Invitations has been send successfully',
    onSuccess
  );

export const fetchMeetingInvitations = (meetingId: number, setResponse: Function) =>
  get(getMeetingInvitationsUrl(meetingId), setResponse);

export const fetchUserPendingInvitations = (setData: Function, setResponse?: Function) =>
  get(getUserPendingInvitationsUrl(), setData, setResponse);

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
    'Invitation has been accepted successfully',
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
    'Invitation has been rejected successfully',
    onSuccess
  );
