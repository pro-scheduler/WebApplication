import { Meeting } from '../meeting/Meeting';

export type ProUser = {
  id: number;
  email: string;
  organizedMeetings: Meeting[];
  participatedMeetings: Meeting[];
};

export type BasicUserInfoDTO = {
  id: number;
  email: string;
};
