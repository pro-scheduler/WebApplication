import TimeReminder, { TimeUnit } from './TimeReminder';
import { useState } from 'react';

const MeetingTimeReminder = () => {
  const [reminder, setReminder] = useState<boolean>(false);
  const [value, setValue] = useState<number>(15);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.MINUTES);

  const sendReminders = () => {
    console.log(value);
    console.log(timeUnit);
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Meeting time reminder'}
      checkboxLabel={'Send reminder about the meeting to all participants'}
      beforeLabel={'before the meeting starts'}
      timeUnit={timeUnit}
      setTimeUnit={setTimeUnit}
      reminder={reminder}
      setReminder={setReminder}
      value={value}
      setValue={setValue}
    />
  );
};

export default MeetingTimeReminder;
