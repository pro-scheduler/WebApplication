import { BiCalendarEvent } from 'react-icons/bi';
import RoundButton, { RoundButtonProps } from './RoundButton';

const CalendarButton = ({ onclick, className, disabled }: RoundButtonProps) => {
  return (
    <RoundButton
      onclick={onclick}
      className={className}
      icon={<BiCalendarEvent />}
      disabled={disabled}
    />
  );
};

export default CalendarButton;
