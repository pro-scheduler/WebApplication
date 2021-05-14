import { TimeRange } from '../TimeRange';
import { BasicUserInfoDTO, ProUser } from '../user/ProUser';

export type Meeting = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: ProUser[];
  participants: ProUser[];
};

export type MeetingDTO = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: number[];
  participants: number[];
};

export type BasicMeetingDetailsDTO = {
  id: number;
  name: string;
  description: string;
};

export type DeepMeetingDetailsDTO = {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  participants: BasicUserInfoDTO[];
  organizers: BasicUserInfoDTO[];
};
