import { MeetingDetails } from '../meeting/Meeting';

export type ProUser = {
  id: number;
  email: string;
  nickname: string;
  organizedMeetings: MeetingDetails[];
  participatedMeetings: MeetingDetails[];
};

export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
};

export type UserSummary = {
  id: number;
  email: string;
  username: string;
};
