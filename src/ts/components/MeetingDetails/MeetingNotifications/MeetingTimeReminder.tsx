import TimeReminder from './TimeReminder';

const MeetingTimeReminder = () => {
  const sendReminders = () => {
    console.log('Saving');
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Meeting time reminder'}
      checkboxLabel={'Send reminder about the meeting to all participants'}
      beforeLabel={'before the meeting starts'}
    />
  );
};

export default MeetingTimeReminder;
