import { UserSummary } from '../user/ProUser';

export type DeclarationDetails = {
  id: number;
  meetingId: number;
  title: string;
  description: string;
  createdBy: UserSummary;
  assignees: UserSummary[];
};
