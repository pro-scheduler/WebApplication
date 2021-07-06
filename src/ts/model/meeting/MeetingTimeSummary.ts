import { TimeRangeDTO } from '../TimeRangeDTO';

export type MeetingTimeSummary = {
  availableTimeRanges: TimeRangeDTO[];
  timeRangesEnteredByAllUsers: TimeRangeDTO[];
};
