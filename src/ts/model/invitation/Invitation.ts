import { BasicMeetingDetailsDTO, Meeting } from '../meeting/Meeting';
import { BasicUserInfoDTO, ProUser } from '../user/ProUser';

export type Invitation = {
  id: number;
  user: ProUser;
  meeting: Meeting;
  invitationState: State;
};

export enum State {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type BasicInvitationInfo = {
  invitationId: number;
  basicMeetingDetailsDTO: BasicMeetingDetailsDTO;
  basicUserInfoDTO: BasicUserInfoDTO;
  state: State;
};

export type InvitationEmailDTO = {
  email: string;
};

export type InvitationEmailsDTO = {
  emails: string[];
};
