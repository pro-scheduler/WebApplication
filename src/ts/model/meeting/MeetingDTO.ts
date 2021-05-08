import TimeRange from '../TimeRange';
import BasicUserInfoDTO from '../user/BasicUserInfoDTO';

export default interface MeetingDTO {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: number[];
  participants: number[];
}

export interface BasicMeetingDetailsDTO {
  id: number;
  name: string;
  description: string;
}

export interface DeepMeetingDetailsDTO {
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  participants: BasicUserInfoDTO[];
  organizers: BasicUserInfoDTO[];
}
