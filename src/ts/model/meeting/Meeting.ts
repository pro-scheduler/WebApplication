import TimeRange from '../TimeRange';
import ProUser from '../ProUser';

export default interface Meeting {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: ProUser[];
  attendees: ProUser[];
}
