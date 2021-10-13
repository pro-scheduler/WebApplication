import { UserSummary } from '../user/ProUser';

export type MeetingChatMessageDetails = {
  id: number;
  sendBy: UserSummary;
  creationDateTime: Date;
  message: string;
};

export type CreateMeetingChatMessageRequest = {
  message: string;
};
