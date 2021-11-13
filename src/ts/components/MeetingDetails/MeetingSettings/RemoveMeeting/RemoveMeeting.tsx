import Card from '../../../common/Card/Card';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import { useState } from 'react';
import styles from './RemoveMeeting.module.css';
import SingleValueInput from '../../../common/forms/Input/SingleValueInput';
import YesNoPopup from '../../../common/Popup/YesNoPopup';
import { useHistory } from 'react-router-dom';
import { deleteMeeting } from '../../../../API/meeting/meetingService';

export type RemoveMeetingProps = {
  meetingName: string;
  meetingId: number;
};
const RemoveMeeting = ({ meetingName, meetingId }: RemoveMeetingProps) => {
  const [name, setName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const history = useHistory();

  const removeMeeting = () => {
    deleteMeeting(meetingId, () => history.push('/meetings'));
  };

  return (
    <Card title={'Remove the meeting'}>
      <div>
        Type the meeting name to remove the meeting. Remember, this operation cannot be undone!
      </div>
      <div className={styles.inputButtonContainer}>
        <div className={styles.nameInput}>
          <SingleValueInput
            valueHandler={setName}
            value={name}
            placeholder={'Type the meeting name here ...'}
          />
        </div>
        <ActionButton
          onclick={() => setShowModal(true)}
          text={'Remove the meeting'}
          className={styles.removeMeetingButton}
          disabled={meetingName !== name}
        />
      </div>
      <YesNoPopup
        show={showModal}
        title={'Are you sure you want to remove the meeting?'}
        onAccept={removeMeeting}
        onDecline={() => setShowModal(false)}
      />
    </Card>
  );
};

export default RemoveMeeting;
