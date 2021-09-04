import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { useState } from 'react';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './NotificationSettings.module.css';

const NotificationSettings = () => {
  const [meetingReminders, setMeetingReminders] = useState<boolean>(true);
  const [organizerMessages, setOrganizerMessages] = useState<boolean>(true);
  const [invitations, setInvitations] = useState<boolean>(true);

  const saveSettings = () => {
    // TODO connect with API
  };

  return (
    <Card
      title="Notification settings"
      footer={
        <div className={styles.saveButtonContainer}>
          <ActionButton
            onclick={saveSettings}
            text={'Save settings'}
            className={styles.saveButton}
          />
        </div>
      }
    >
      <Checkbox
        checked={meetingReminders}
        setChecked={setMeetingReminders}
        label={'Receive meeting reminders via email'}
      />
      <Checkbox
        checked={organizerMessages}
        setChecked={setOrganizerMessages}
        label={'Receive organizer messages via email'}
      />
      <Checkbox
        checked={invitations}
        setChecked={setInvitations}
        label={'Receive invitations via email'}
      />
    </Card>
  );
};

export default NotificationSettings;
