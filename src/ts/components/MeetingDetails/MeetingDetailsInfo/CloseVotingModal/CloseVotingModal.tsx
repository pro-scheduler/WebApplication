import { useEffect, useState } from 'react';
import {
  updateOnlineMeetingDetails,
  updateRealMeetingDetails,
} from '../../../../API/meeting/meetingService';
import { sendCustomNotification } from '../../../../API/notification/notificationService';
import {
  editSurvey,
  getSurveyForMeeting,
  getSurveyToEdit,
} from '../../../../API/survey/surveyService';
import { MeetingType } from '../../../../model/meeting/Meeting';
import { UserSurvey, SurveyWithQuestionsDTO } from '../../../../model/survey/Survey';
import { toastInfo } from '../../../../tools/messagesInvocator';
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
  hasFinalDate: boolean;
  hasFinalPlace: boolean;
  meetingId: number;
  meetingType: MeetingType;
  meetingName: string;
};

const CloseVotingModal = ({
  show,
  setShow,
  hasSurevyVoting,
  hasTimeVoting,
  hasPlaceVoting,
  hasFinalDate,
  hasFinalPlace,
  meetingId,
  meetingType,
  meetingName,
}: CloseVotingModalProps) => {
  const [closeSurveyVoting, setCloseSurveyVoting] = useState<boolean>(true);
  const [closePlaceAndTimeVoting, setClosePlaceAndTimeVoting] = useState<boolean>(true);
  const [sendNotification, setSendNotification] = useState<boolean>(true);
  const [customMessage, setCustomMessage] = useState<string>(
    'Hi everyone!\n\nI would like to inform you that the final date of our meeting has been set. \n\n Best regards.'
  );
  const [survey, setSurvey] = useState<UserSurvey>();
  const [surveyToEdit, setSurveyToEdit] = useState<SurveyWithQuestionsDTO>();

  useEffect(() => {
    getSurveyForMeeting(meetingId, setSurvey);
    getSurveyToEdit(meetingId, setSurveyToEdit);
  }, [meetingId]);

  const generatePastDate = () => new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const closeVoting = () => {
    if (hasTimeVoting && closePlaceAndTimeVoting && !hasFinalDate) {
      toastInfo(
        'You have not specified final date. Please save a final date before cancel a voting'
      );
      return;
    }
    if (hasPlaceVoting && closePlaceAndTimeVoting && !hasFinalPlace) {
      toastInfo(
        'You have not specified final place. Please save a final place before cancel a voting'
      );
      return;
    }
    if (hasSurevyVoting && closeSurveyVoting) {
      if (survey && surveyToEdit)
        editSurvey(
          survey.id,
          {
            ...surveyToEdit,
            surveyEndDate: generatePastDate(),
          },
          () => {},
          () => {},
          () => {},
          'Filling a survey has been closed successfully'
        );
    }
    if ((hasTimeVoting || hasPlaceVoting) && closePlaceAndTimeVoting) {
      if (meetingType === MeetingType.REAL)
        updateRealMeetingDetails(
          undefined,
          undefined,
          generatePastDate(),
          meetingId,
          () => {},
          () => {},
          () => {},
          hasTimeVoting && hasPlaceVoting
            ? 'Place and time voting has been closed successfully'
            : hasTimeVoting
            ? 'Time voting has been closed successfully'
            : 'Place voting has been closed successfully'
        );
      if (meetingType === MeetingType.ONLINE)
        updateOnlineMeetingDetails(
          undefined,
          undefined,
          undefined,
          generatePastDate(),
          meetingId,
          () => {},
          () => {},
          () => {},
          hasTimeVoting && hasPlaceVoting
            ? 'Place and time voting has been closed successfully'
            : hasTimeVoting
            ? 'Time voting has been closed successfully'
            : 'Place voting has been closed successfully'
        );
    }
    if (sendNotification) {
      console.log({
        meetingId,
        meetingName,
        message: customMessage,
      });
      sendCustomNotification({
        meetingId,
        meetingName,
        message: customMessage,
      });
    }
  };

  return (
    <Popup
      show={show}
      title={'Are you sure you want to close the voting?'}
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
        label={'Send notification emails to attendees'}
        disabled={false}
      />
      <TextArea
        valueHandler={setCustomMessage}
        value={customMessage}
        placeholder="Please type content of the notification..."
        disabled={!sendNotification}
        className={styles.textArea}
      />
      <ActionButton
        text={'Close voting'}
        onclick={closeVoting}
        disabled={
          (!closePlaceAndTimeVoting && !closeSurveyVoting) ||
          (sendNotification && customMessage === '')
        }
      />
    </Popup>
  );
};
export default CloseVotingModal;
