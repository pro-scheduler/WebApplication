import Card from '../../common/Card/Card';
import { useState } from 'react';
import styles from './CustomReminder.module.css';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import { CustomMessage } from '../../../model/notification/Notification';
import TextArea from '../../common/forms/TextArea/TextArea';
import { sendCustomNotification } from '../../../API/notification/notificationService';

export type CustomReminderProps = {
  meetingId: number;
  meetingName: string;
};

const CustomReminder = ({ meetingId, meetingName }: CustomReminderProps) => {
  const [customMessage, setCustomMessage] = useState<CustomMessage>({
    meetingId: meetingId,
    meetingName: meetingName,
    message: '',
  });

  const setMessage = (value: string) => {
    setCustomMessage({ ...customMessage, message: value });
  };

  const sendReminders = () => {
    sendCustomNotification(customMessage, () => setMessage(''));
  };

  return (
    <Card title={'Custom notification'}>
      <TextArea valueHandler={setMessage} value={customMessage.message} />
      <ActionButton
        onclick={sendReminders}
        text={'Send notification'}
        className={styles.sendReminderButton}
        disabled={customMessage.message === ''}
      />
    </Card>
  );
};

export default CustomReminder;
