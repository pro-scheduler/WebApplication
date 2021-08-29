import Card from '../../common/Card/Card';
import { useState } from 'react';
import RadioButton from '../../common/forms/RadioButton/RadioButton';
import styles from './SurveyReminder.module.css';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { createSurveyReminder } from '../../../API/notification/notificationService';

export type SurveyReminderProps = {
  meetingId: number;
  surveyId: number;
  meetingName: string;
};
const SurveyReminder = ({ meetingId, surveyId, meetingName }: SurveyReminderProps) => {
  const [allParticipants, setAllParticipants] = useState<boolean>(true);
  const [someParticipants, setSomeParticipants] = useState<boolean>(false);

  const handleAllParticipantsClicked = () => {
    setAllParticipants(!allParticipants);
    setSomeParticipants(false);
  };

  const handleSomeParticipantsClicked = () => {
    setSomeParticipants(!someParticipants);
    setAllParticipants(false);
  };

  const sendReminders = () => {
    createSurveyReminder({
      meetingId: meetingId,
      surveyId: surveyId,
      meetingName: meetingName,
      toAll: allParticipants,
    });
  };

  return (
    <Card title="Survey reminder">
      <div className={styles.surveyReminderHeader}>Send reminder about survey</div>
      <RadioButton
        checked={allParticipants}
        onChange={handleAllParticipantsClicked}
        label={'To all participants'}
      />
      <RadioButton
        checked={someParticipants}
        onChange={handleSomeParticipantsClicked}
        label={'To participants who have not filled the survey yet'}
      />
      <ActionButton
        onclick={sendReminders}
        text={'Send reminder'}
        className={styles.sendReminderButton}
      />
    </Card>
  );
};

export default SurveyReminder;
