import { UserSummary } from '../user/ProUser';

export type DeclarationDetails = {
  id: number;
  meetingId: number;
  title: String;
  description: String;
  createdBy: UserSummary;
  assigned: UserSummary[];
};
