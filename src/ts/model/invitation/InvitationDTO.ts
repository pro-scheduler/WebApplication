import BasicUserInfoDTO from '../user/BasicUserInfoDTO';
import { State } from './Invitation';
import { BasicMeetingDetailsDTO } from '../meeting/MeetingDTO';

export interface BasicInvitationInfo {
  id: number;
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
