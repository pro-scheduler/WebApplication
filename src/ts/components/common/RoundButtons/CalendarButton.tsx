import { MouseEventHandler } from 'react';

import { BiCalendarEvent } from 'react-icons/bi';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
  disabled?: boolean;
}

const CalendarButton = ({ onclick, className, disabled }: IButton) => {
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
