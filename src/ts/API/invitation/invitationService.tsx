import { post } from '../genericApiCalls';
import { getMeetingInvitationsUrl } from './urls';
import { InvitationEmailsDTO } from '../../model/invitation/Invitation';

export const createInvitations = (
  meetingId: number,
  invitationEmailsDTO: InvitationEmailsDTO,
  setResponse?: Function
) =>
  post(
    invitationEmailsDTO,
    getMeetingInvitationsUrl(meetingId),
    setResponse,
    'Ivitations has beed added succefully'
  );
