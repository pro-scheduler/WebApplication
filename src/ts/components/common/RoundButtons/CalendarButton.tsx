import { MouseEventHandler } from 'react';

import { BiCalendarEvent } from 'react-icons/bi';
import RoundButton from './RoundButton';

interface IButton {
  onclick: MouseEventHandler;
  className: any;
  disabled?: boolean;
}

const CalendarButton = ({ onclick, className }: IButton) => {
  return (
    <RoundButton onclick={onclick} className={className} icon={<BiCalendarEvent />} disabled />
  );
};

export default CalendarButton;
