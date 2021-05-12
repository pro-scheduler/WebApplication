import { BiCalendarEvent } from 'react-icons/bi';
import RoundButton, { RoundButtonProps } from './RoundButton';

const CalendarButton = ({ onclick, className }: RoundButtonProps) => {
  return <RoundButton onclick={onclick} className={className} icon={<BiCalendarEvent />} />;
};

export default CalendarButton;
