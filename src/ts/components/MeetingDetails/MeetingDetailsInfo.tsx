import Card from '../common/Card/Card';
import { BiCalendarEvent, BiWorld } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './MeetingDetailsInfo.module.css';
import { useEffect, useState } from 'react';
import cx from 'classnames';
import { maxSings, minSings, required } from '../../tools/validator';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import TextArea from '../common/forms/TextArea/TextArea';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import YesNoPopup from '../common/Popup/YesNoPopup';
import { useHistory } from 'react-router';
import {
  cancelMeeting,
  leaveMeeting,
  updateMeetingNameAndDescription,
} from '../../API/meeting/meetingService';
import { MeetingState } from '../../model/meeting/Meeting';

export type MeetingDetailsInfoProps = {
  hasSurvey: boolean;
  hasDeclarations: boolean;
  hasTime: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  name: string;
  description: string;
  isOrganizer: boolean;
  meetingId: number;
  state: MeetingState;
  refreshMeeting: Function;
  refreshNameAndDescription: Function;
};

const MeetingDetailsInfo = ({
  hasDeclarations,
  hasSurvey,
  hasTime,
  meetingLink,
  meetingPassword,
  name,
  description,
  isOrganizer,
  meetingId,
  state,
  refreshMeeting,
  refreshNameAndDescription,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [editNameAndDescription, setEditNameAndDescription] = useState<boolean>(false);
  const [newName, setName] = useState<string>('');
  const [newDescription, setDescription] = useState<string>('');
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [cancelMeetingModal, setCancelMeetingModal] = useState(false);
  const [leaveMeetingModal, setLeaveMeetingModal] = useState(false);
  const history = useHistory();

  const updateNameAndDescription = () => {
    updateMeetingNameAndDescription(
      newName,
      newDescription,
      meetingId,
      () => {},
      () => {
        setName(newName);
        setDescription(newDescription);
        refreshNameAndDescription(newName, newDescription);
      }
    );
  };

  useEffect(() => {
    setName(name);
    setDescription(description);
  }, [name, description]);

  const cancelTheMeeting = () => {
    setCancelMeetingModal(false);
    cancelMeeting(meetingId, refreshMeeting);
  };

  const leaveTheMeeting = () => {
    setLeaveMeetingModal(false);
    leaveMeeting(meetingId, () => history.push('/meetings'));
  };

  return (
    <Card
      title={'Details'}
      onEdit={
        isOrganizer && state === MeetingState.OPEN
          ? () => {
              setEditNameAndDescription(!editNameAndDescription);
            }
          : undefined
      }
      footer={
        state === MeetingState.OPEN ? (
          <div className={styles.actionButtonContainer}>
            {isOrganizer ? (
              <ActionButton
                onclick={() => setCancelMeetingModal(true)}
                text={'Cancel the meeting'}
                className={styles.actionButton}
              />
            ) : (
              <ActionButton
                onclick={() => setLeaveMeetingModal(true)}
                text={'Leave the meeting'}
                className={styles.actionButton}
              />
            )}
          </div>
        ) : undefined
      }
    >
      {!editNameAndDescription ? (
        <div className={styles.container}>
          <p className={styles.moduleContainer}>
            <BiCalendarEvent className={styles.moduleIcon} />{' '}
            {hasTime ? 'Time available' : 'No time available'}
          </p>
          <p className={styles.moduleContainer}>
            <BiWorld className={styles.moduleIcon} />{' '}
            {meetingLink ? (
              <>
                <a href={meetingLink} className={styles.onlineMeetingLink}>
                  {meetingLink}
                </a>
                {meetingPassword && (
                  <>
                    <RiLockPasswordFill
                      className={cx(styles.moduleIcon, styles.passwordIcon)}
                      onMouseEnter={() => setShowPassword(true)}
                      onMouseLeave={() => setShowPassword(false)}
                    />
                    {showPassword && meetingPassword}
                  </>
                )}
              </>
            ) : (
              'No place available'
            )}
          </p>
          <p className={styles.moduleContainer}>
            <FaRegClipboard className={styles.moduleIcon} />{' '}
            {hasSurvey ? 'Survey available' : 'No surveys available'}
          </p>
          <p className={styles.moduleContainer}>
            <BsPencil className={styles.moduleIcon} />{' '}
            {hasDeclarations ? 'Declarations available' : 'No declarations available'}
          </p>
        </div>
      ) : (
        <>
          <p className={styles.editLabel}>Meeting name</p>
          <SingleValueInput
            value={newName}
            valueHandler={setName}
            setInvalid={setInvalidNameDesc}
            validation={[
              { validation: required, message: 'This field is required' },
              { validation: minSings(5), message: 'Min 5 signs' },
              { validation: maxSings(255), message: 'Max 255 signs' },
            ]}
            placeholder="Please type meeting name ..."
          />
          <p className={styles.editLabel}>Meeting description</p>
          <TextArea
            defaultValue={newDescription}
            valueHandler={setDescription}
            setInvalid={setInvalidNameDesc}
            validation={[{ validation: maxSings(500), message: 'Max 500 signs' }]}
            placeholder="Please type meeting description ..."
          />
          <div className={styles.buttonContainer}>
            <ActionButton
              onclick={() => {
                updateNameAndDescription();
              }}
              disabled={invalidNameDesc || (newName === name && description === newDescription)}
              text="Edit"
            />
          </div>
        </>
      )}
      <YesNoPopup
        show={cancelMeetingModal}
        title={'Do you want to cancel the meeting?'}
        onDecline={() => setCancelMeetingModal(false)}
        onAccept={cancelTheMeeting}
      />
      <YesNoPopup
        show={leaveMeetingModal}
        title={'Do you want to leave the meeting?'}
        onDecline={() => setLeaveMeetingModal(false)}
        onAccept={leaveTheMeeting}
      />
    </Card>
  );
};
export default MeetingDetailsInfo;
