import TimeReminder from './TimeReminder';

const SurveyTimeReminder = () => {
  const sendReminders = () => {
    console.log('Saving');
  };

  return (
    <TimeReminder
      sendReminders={sendReminders}
      cardHeader={'Survey time reminder'}
      checkboxLabel={'Send reminder about the survey to all participants'}
      beforeLabel={'before the survey closes'}
    />
  );
};

export default SurveyTimeReminder;
