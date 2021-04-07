import { BiCalendarEvent } from 'react-icons/bi';
import Icon from './Icon';

const CalendarIcon = ({ className }: any) => {
  return <Icon className={className} icon={<BiCalendarEvent />} />;
};

export default CalendarIcon;
