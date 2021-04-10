import TimeRange from './TimeRange';

export default interface Meeting {
  meetingId: number;
  name: string;
  description: string;
  // availableTimeRanges: TimeRange[]
}
