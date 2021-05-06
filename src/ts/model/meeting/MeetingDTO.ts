import TimeRange from '../TimeRange';

export default interface MeetingDTO {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: number[];
  participants: number[];
}
