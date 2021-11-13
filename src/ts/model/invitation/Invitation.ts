import { MeetingSummary } from '../meeting/Meeting';
import { UserSummary } from '../user/ProUser';

export enum State {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type InvitationDetails = {
  id: number;
  user: UserSummary;
  invitedBy: UserSummary;
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

export type CreateInvitationsResponse = {
  createdInvitations: InvitationDetails[];
  failedInvitationDetails: FailedInvitationDetails[];
};
