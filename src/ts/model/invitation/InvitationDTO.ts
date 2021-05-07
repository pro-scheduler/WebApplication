import BasicUserInfoDTO from '../user/BasicUserInfoDTO';
import { State } from './Invitation';
import { BasicMeetingDetailsDTO } from '../meeting/MeetingDTO';

export interface BasicInvitationInfo {
  // TODO add invitationId
  basicMeetingDetailsDTO: BasicMeetingDetailsDTO;
  basicUserInfoDTO: BasicUserInfoDTO;
  state: State;
}

export interface InvitationEmailDTO {
  email: string;
}

export interface InvitationEmailsDTO {
  emails: string[];
}
