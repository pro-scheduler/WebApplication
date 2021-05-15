import { BiCalendarEvent } from 'react-icons/bi';
import Icon from './Icon';

const CalendarIcon = ({ className }: { className?: string }) => {
  return <Icon className={className} icon={<BiCalendarEvent />} />;
};

export default CalendarIcon;
