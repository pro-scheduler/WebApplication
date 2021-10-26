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
  addMeetingToGoogleCalendar,
  cancelMeeting,
  leaveMeeting,
  updateFinalDate,
  updateMeetingNameAndDescription,
} from '../../API/meeting/meetingService';
import { MeetingState } from '../../model/meeting/Meeting';
import FinalDateForm from './FinalDateForm/FinalDateForm';
import GoogleButton from '../common/SubmitButton/IconButton/GoogleButton';

export type MeetingDetailsInfoProps = {
  hasSurvey: boolean;
  hasDeclarations: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  name: string;
  description: string;
  isOrganizer: boolean;
  meetingId: number;
  state: MeetingState;
  refreshMeeting: Function;
  refreshNameAndDescription: Function;
  finalBeginDate: Date | null;
  finalEndDate: Date | null;
  finalPlace?: string;
  googleProvider: boolean;
};

const MeetingDetailsInfo = ({
  hasDeclarations,
  hasSurvey,
  meetingLink,
  meetingPassword,
  name,
  description,
  isOrganizer,
  meetingId,
  state,
  refreshMeeting,
  refreshNameAndDescription,
  finalBeginDate,
  finalEndDate,
  finalPlace,
  googleProvider,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [editNameAndDescription, setEditNameAndDescription] = useState<boolean>(false);
  const [newName, setName] = useState<string>('');
  const [newDescription, setDescription] = useState<string>('');
  const [newBeginDate, setNewBeginDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);
  const [invalidNameDesc, setInvalidNameDesc] = useState(false);
  const [cancelMeetingModal, setCancelMeetingModal] = useState(false);
  const [leaveMeetingModal, setLeaveMeetingModal] = useState(false);
  const history = useHistory();

  const updateDetails = () => {
    if (name !== newName || description !== newDescription) {
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
    }
    if (
      newBeginDate &&
      newEndDate &&
      (finalBeginDate !== newBeginDate || finalEndDate !== newEndDate)
    ) {
      updateFinalDate(
        {
          timeStart: newBeginDate,
          timeEnd: newEndDate,
        },
        meetingId,
        () => {},
        () => {},
        refreshMeeting
      );
    }
  };

  useEffect(() => {
    setName(name);
    setDescription(description);
  }, [name, description]);

  useEffect(() => {
    setNewBeginDate(finalBeginDate);
    setNewEndDate(finalEndDate);
  }, [finalBeginDate, finalEndDate]);

  const cancelTheMeeting = () => {
    setCancelMeetingModal(false);
    cancelMeeting(meetingId, refreshMeeting);
  };

  const leaveTheMeeting = () => {
    setLeaveMeetingModal(false);
    leaveMeeting(meetingId, () => history.push('/meetings'));
  };

  const addToGoogleCalendar = () => {
    addMeetingToGoogleCalendar(meetingId);
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
          <div
            className={googleProvider ? styles.flexButtonsContainer : styles.blockButtonsContainer}
          >
            {googleProvider && (
              <GoogleButton
                text={'Add to calendar'}
                onClick={addToGoogleCalendar}
                containerClassName={styles.googleCalendarButtonContainer}
                className={styles.googleCalendarButton}
              />
            )}
            {isOrganizer ? (
              <div>
                <ActionButton
                  onclick={() => setCancelMeetingModal(true)}
                  text={'Cancel the meeting'}
                  className={styles.actionButton}
                />
              </div>
            ) : (
              <div>
                <ActionButton
                  onclick={() => setLeaveMeetingModal(true)}
                  text={'Leave the meeting'}
                  className={styles.actionButton}
                />
              </div>
            )}
          </div>
        ) : undefined
      }
    >
      {!editNameAndDescription ? (
        <div className={styles.container}>
          <p className={styles.moduleContainer}>
            <BiCalendarEvent className={styles.moduleIcon} />{' '}
            {finalBeginDate && finalEndDate
              ? finalBeginDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                  minute: 'numeric',
                }) +
                ' - ' +
                finalEndDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                  minute: 'numeric',
                }) +
                ', ' +
                (finalBeginDate.toLocaleDateString() === finalEndDate.toLocaleDateString()
                  ? finalBeginDate.toLocaleDateString()
                  : finalBeginDate.toLocaleDateString() + ' - ' + finalEndDate.toLocaleDateString())
              : 'Time not set'}
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
            ) : finalPlace ? (
              finalPlace
            ) : (
              'Place not set'
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
          <p className={styles.editLabel}>Final date</p>
          <FinalDateForm
            finalBeginDate={newBeginDate}
            finalEndDate={newEndDate}
            setFinalBeginDate={setNewBeginDate}
            setFinalEndDate={setNewEndDate}
          />
          <div className={styles.buttonContainer}>
            <ActionButton
              onclick={() => {
                updateDetails();
              }}
              disabled={
                invalidNameDesc ||
                (newName === name &&
                  description === newDescription &&
                  finalBeginDate === newBeginDate &&
                  finalEndDate === newEndDate)
              }
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
