import { useState } from 'react';
import Checkbox from '../../../common/forms/Checkbox/Checkbox';
import TextArea from '../../../common/forms/TextArea/TextArea';
import Popup from '../../../common/Popup/Popup';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './CloseVotingModal.module.css';

export type CloseVotingModalProps = {
  show: boolean;
  setShow: Function;
  hasSurevyVoting: boolean;
  hasTimeVoting: boolean;
  hasPlaceVoting: boolean;
};

const CloseVotingModal = ({
  show,
  setShow,
  hasSurevyVoting,
  hasTimeVoting,
  hasPlaceVoting,
}: CloseVotingModalProps) => {
  const [closeSurveyVoting, setCloseSurveyVoting] = useState<boolean>(true);
  const [closePlaceAndTimeVoting, setClosePlaceAndTimeVoting] = useState<boolean>(true);
  const [sendNotification, setSendNotification] = useState<boolean>(true);

  const clsoeVoting = () => {};
  return (
    <Popup
      show={show}
      title={'Are you sure to close the voting?'}
      onClose={() => setShow(false)}
      className={styles.closeVotingPopup}
    >
      {(hasTimeVoting || hasPlaceVoting) && (
        <Checkbox
          checked={closePlaceAndTimeVoting}
          setChecked={setClosePlaceAndTimeVoting}
          label={
            hasTimeVoting && hasPlaceVoting
              ? 'Close time and place voting'
              : hasPlaceVoting
              ? 'Close place voting'
              : 'Close time voting'
          }
          disabled={false}
        />
      )}
      {hasSurevyVoting && (
        <Checkbox
          checked={closeSurveyVoting}
          setChecked={setCloseSurveyVoting}
          label={'Close survey'}
          disabled={false}
        />
      )}
      <Checkbox
        checked={sendNotification}
        setChecked={setSendNotification}
        label={'Send notification emails to atendees'}
        disabled={false}
      />
      <TextArea
        defaultValue={'Hi everyone! i'}
        valueHandler={() => {}}
        setInvalid={() => {}}
        placeholder="Please type content of the notification..."
        disabled={!sendNotification}
        className={styles.textArea}
      />
      <ActionButton text={'Close voting'} onclick={clsoeVoting} />
    </Popup>
  );
};
export default CloseVotingModal;
