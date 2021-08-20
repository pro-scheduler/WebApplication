import { BasicMeetingDetailsDTO, MeetingSummary } from '../meeting/Meeting';
import { BasicUserInfoDTO, UserSummary } from '../user/ProUser';

export enum State {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type InvitationDetails = {
  id: number;
  user: UserSummary;
  meeting: MeetingSummary;
  state: State;
};

export type CreateInvitationsSummary = {
  meeting: MeetingSummary;
  createdInvitations: CreatedInvitationDetails[];
  failedInvitations: FailedInvitationDetails[];
};

export type CreatedInvitationDetails = {
  invitationId: number;
  user: UserSummary;
};

export type FailedInvitationDetails = {
  email: string;
  cause: string;
};

export type CreateInvitationsRequest = {
  meetingId: number;
  emails: string[];
  message: string;
};

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
