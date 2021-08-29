import { Meeting } from '../meeting/Meeting';

export type ProUser = {
  id: number;
  email: string;
  nickname: string;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
};

export type BasicUserInfoDTO = {
  id: number;
  email: string;
};

export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
};

export type UserSummary = {
  id: number;
  email: string;
  username?: string;
};
