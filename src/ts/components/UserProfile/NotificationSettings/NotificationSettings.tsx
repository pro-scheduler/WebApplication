import Card from '../../common/Card/Card';
import Checkbox from '../../common/forms/Checkbox/Checkbox';
import { useEffect, useState } from 'react';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './NotificationSettings.module.css';
import { UserSettings } from '../../../model/notification/Notification';
import { getUserSettings, updateUserSettings } from '../../../API/notification/notificationService';

const NotificationSettings = () => {
  const [userSettings, setUserSettings] = useState<UserSettings>({
    receiveSurveyRemindersViaEmail: true,
    receiveOrganizerMessagesViaEmail: true,
    receiveMeetingRemindersViaEmail: true,
    receiveInvitationsViaEmail: true,
  });

  const [updatedUserSettings, setUpdatedUserSettings] = useState<UserSettings>(userSettings);

  useEffect(() => {
    getUserSettings(setUserSettings);
  }, []);

  useEffect(() => {
    setUpdatedUserSettings(userSettings);
  }, [userSettings]);

  const setMeetingReminders = (value: boolean) => {
    setUpdatedUserSettings({ ...updatedUserSettings, receiveMeetingRemindersViaEmail: value });
  };

  const setOrganizerMessages = (value: boolean) => {
    setUpdatedUserSettings({ ...updatedUserSettings, receiveOrganizerMessagesViaEmail: value });
  };

  const setInvitations = (value: boolean) => {
    setUpdatedUserSettings({ ...updatedUserSettings, receiveInvitationsViaEmail: value });
  };

  const setSurveys = (value: boolean) => {
    setUpdatedUserSettings({ ...updatedUserSettings, receiveSurveyRemindersViaEmail: value });
  };

  const saveSettings = () => {
    updateUserSettings(updatedUserSettings, () => getUserSettings(setUserSettings));
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
            disabled={userSettings === updatedUserSettings}
          />
        </div>
      }
    >
      <Checkbox
        checked={updatedUserSettings.receiveMeetingRemindersViaEmail}
        setChecked={setMeetingReminders}
        label={'Receive meeting reminders via email'}
      />
      <Checkbox
        checked={updatedUserSettings.receiveOrganizerMessagesViaEmail}
        setChecked={setOrganizerMessages}
        label={'Receive organizer messages via email'}
      />
      <Checkbox
        checked={updatedUserSettings.receiveInvitationsViaEmail}
        setChecked={setInvitations}
        label={'Receive invitations via email'}
      />
      <Checkbox
        checked={updatedUserSettings.receiveSurveyRemindersViaEmail}
        setChecked={setSurveys}
        label={'Receive survey reminders via email'}
      />
    </Card>
  );
};

export default NotificationSettings;
