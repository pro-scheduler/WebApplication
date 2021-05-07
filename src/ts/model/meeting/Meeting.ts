import TimeRange from '../TimeRange';
import ProUser from '../user/ProUser';

export default interface Meeting {
  id: number;
  name: string;
  description: string;
  availableTimeRanges: TimeRange[];
  organizers: ProUser[];
  participants: ProUser[];
}
