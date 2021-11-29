import Card from '../common/Card/Card';
import { BiCalendarEvent, BiWorld } from 'react-icons/bi';
import { FaRegClipboard } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import styles from './MeetingDetailsInfo.module.css';
import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import ActionButton from '../common/SubmitButton/ActionButton/ActionButton';
import YesNoPopup from '../common/Popup/YesNoPopup';
import { useHistory, useLocation } from 'react-router';
import {
  cancelMeeting,
  leaveMeeting,
  updateOnlineMeetingDetails,
  updateRealMeetingDetails,
} from '../../API/meeting/meetingService';
import { MeetingState, MeetingType } from '../../model/meeting/Meeting';
import FinalDateForm from './FinalDateForm/FinalDateForm';
import GoogleButton from '../common/SubmitButton/IconButton/GoogleButton';
import { googleCalendarUrl } from '../../auth/AuthCredentials';
import Popup from '../common/Popup/Popup';
import { googleCalendarTokenExists } from '../../API/googlecalendar/googleCalendarService';
import GoogleCalendarPicker from './GoogleCalendarPicker/GoogleCalendarPicker';
import SingleValueInput from '../common/forms/Input/SingleValueInput';
import { PlaceDetails } from '../../model/geo/Geo';
import MapWithPlaces from '../common/Map/MapWithPlaces/MapWithPlaces';
import { changeFinalPlace } from '../../API/geo/geo';

export type MeetingDetailsInfoProps = {
  surveyModule: boolean;
  declarationsModule: boolean;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  isOrganizer: boolean;
  meetingId: number;
  state: MeetingState;
  refreshMeeting: Function;
  finalBeginDate: Date | null;
  finalEndDate: Date | null;
  finalPlace?: PlaceDetails;
  showGoogleCalendar: boolean;
  meetingType: MeetingType;
  markTimeRangeDeadline: Date | null;
};

const MeetingDetailsInfo = ({
  declarationsModule,
  surveyModule,
  meetingLink,
  meetingPassword,
  isOrganizer,
  meetingId,
  state,
  refreshMeeting,
  finalBeginDate,
  finalEndDate,
  finalPlace,
  showGoogleCalendar,
  meetingType,
  markTimeRangeDeadline,
}: MeetingDetailsInfoProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [newLink, setNewLink] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [newFinalPlace, setNewFinalPlace] = useState<PlaceDetails | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newBeginDate, setNewBeginDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);
  const [cancelMeetingModal, setCancelMeetingModal] = useState(false);
  const [leaveMeetingModal, setLeaveMeetingModal] = useState(false);
  const [googleCalendarPickerModalShow, setGoogleCalendarPickerModalShow] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const updateFinalPlace = () => {
    if (newFinalPlace && finalPlace !== newFinalPlace) {
      changeFinalPlace(
        {
          latitude: newFinalPlace.latitude,
          longitude: newFinalPlace.longitude,
          name: newFinalPlace.name,
          description: newFinalPlace.description,
          address: newFinalPlace.description,
        },
        meetingId,
        () => {
          refreshMeeting();
          setEditMode(false);
        }
      );
    }
  };

  const updateDetails = () => {
    if (meetingType === MeetingType.ONLINE) {
      updateOnlineMeetingDetails(
        newBeginDate && newEndDate
          ? {
              timeStart: newBeginDate,
              timeEnd: newEndDate,
            }
          : undefined,
        newLink,
        newPassword,
        markTimeRangeDeadline,
        meetingId,
        () => {},
        () => {},
        () => {
          refreshMeeting();
          setEditMode(false);
        }
      );
    } else {
      if (
        newBeginDate &&
        newEndDate &&
        (newBeginDate !== finalBeginDate || newEndDate !== finalEndDate)
      ) {
        updateRealMeetingDetails(
          newBeginDate && newEndDate
            ? {
                timeStart: newBeginDate,
                timeEnd: newEndDate,
              }
            : undefined,
          finalPlace ? finalPlace.id : undefined,
          markTimeRangeDeadline,
          meetingId,
          () => {},
          () => {},
          () => {
            if (newFinalPlace && finalPlace !== newFinalPlace) {
              updateFinalPlace();
            } else {
              refreshMeeting();
              setEditMode(false);
            }
          }
        );
      } else {
        updateFinalPlace();
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('google-calendar-picker') === 'show') {
      setGoogleCalendarPickerModalShow(true);
      queryParams.delete('google-calendar-picker');
      history.replace({
        search: queryParams.toString(),
      });
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setNewBeginDate(finalBeginDate);
    setNewEndDate(finalEndDate);
  }, [finalBeginDate, finalEndDate]);

  useEffect(() => {
    if (newBeginDate && !newEndDate) {
      setNewEndDate(new Date(newBeginDate.getTime() + 60 * 60 * 1000));
    }
    // eslint-disable-next-line
  }, [newBeginDate]);

  useEffect(() => {
    setNewLink(meetingLink);
    setNewPassword(meetingPassword);
  }, [meetingLink, meetingPassword]);

  useEffect(() => {
    if (finalPlace) {
      setNewFinalPlace(finalPlace);
    }
  }, [finalPlace]);

  const cancelTheMeeting = () => {
    setCancelMeetingModal(false);
    cancelMeeting(meetingId, refreshMeeting);
  };

  const leaveTheMeeting = () => {
    setLeaveMeetingModal(false);
    leaveMeeting(meetingId, () => history.push('/meetings'));
  };

  const generateEditButtonText = (
    finalDateChanged: boolean,
    placeChanged: boolean,
    linkChanged: boolean
  ) => {
    let buttonName = 'Edit meeting details';
    let changes = 0;

    if (finalDateChanged) {
      buttonName = 'Edit final date';
      changes++;
    }
    if (placeChanged) {
      buttonName = 'Edit final place';
      changes++;
    }
    if (linkChanged) {
      buttonName = 'Edit meeting details';
      changes++;
    }
    if (changes > 1) buttonName = 'Edit meeting details';
    return buttonName;
  };

  return (
    <Card
      title={'Details'}
      onEdit={
        isOrganizer && state === MeetingState.OPEN
          ? () => {
              setEditMode(!editMode);
            }
          : undefined
      }
      footer={
        state === MeetingState.OPEN && !editMode ? (
          <div className={styles.flexButtonsContainer}>
            {showGoogleCalendar && (
              <GoogleButton
                redirectTo={!googleCalendarTokenExists() ? googleCalendarUrl(meetingId) : undefined}
                text={'Add to calendar'}
                onClick={() =>
                  googleCalendarTokenExists() && setGoogleCalendarPickerModalShow(true)
                }
                containerClassName={styles.googleCalendarButtonContainer}
                className={styles.googleCalendarButton}
              />
            )}
            <div>
              <ActionButton
                onclick={() => setLeaveMeetingModal(true)}
                text={'Leave the meeting'}
                className={styles.actionButton}
              />
            </div>
            {isOrganizer && (
              <div>
                <ActionButton
                  onclick={() => setCancelMeetingModal(true)}
                  text={'Cancel the meeting'}
                  className={styles.actionButton}
                />
              </div>
            )}
          </div>
        ) : undefined
      }
    >
      <Popup
        show={googleCalendarPickerModalShow}
        title={'Choose Google Calendar'}
        onClose={() => setGoogleCalendarPickerModalShow(false)}
      >
        <GoogleCalendarPicker
          meetingId={meetingId}
          onCalendarChosen={() => setGoogleCalendarPickerModalShow(false)}
        />
      </Popup>
      {!editMode ? (
        <div className={styles.container}>
          <p className={styles.moduleContainer}>
            <BiCalendarEvent className={styles.moduleIcon} />{' '}
            {finalBeginDate && finalEndDate
              ? finalBeginDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: false,
                  minute: 'numeric',
                }) +
                ' - ' +
                finalEndDate.toLocaleString('en-US', {
                  hour: 'numeric',
                  hour12: false,
                  minute: 'numeric',
                }) +
                ', ' +
                (finalBeginDate.toLocaleDateString() === finalEndDate.toLocaleDateString()
                  ? finalBeginDate.toLocaleDateString()
                  : finalBeginDate.toLocaleDateString() + ' - ' + finalEndDate.toLocaleDateString())
              : 'Time has not been specified yet'}
          </p>
          <p className={styles.moduleContainer}>
            <BiWorld className={styles.moduleIcon} />{' '}
            {meetingType === MeetingType.ONLINE && meetingLink ? (
              <>
                <a href={meetingLink} className={styles.onlineMeetingLink}>
                  {meetingLink}
                </a>
                {meetingPassword && (
                  <>
                    <RiLockPasswordFill
                      className={cx(styles.moduleIcon, styles.passwordIcon)}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                    {showPassword && meetingPassword}
                  </>
                )}
              </>
            ) : finalPlace ? (
              finalPlace.name
            ) : (
              'Final place has not been specified yet'
            )}
          </p>
          {meetingType === MeetingType.REAL && finalPlace && (
            <div className="mx-1 mb-3">
              <MapWithPlaces
                placesToDisplay={[finalPlace]}
                disabled={true}
                mainButtonTooltipNameMapper={() => {}}
                displayRemoveButton={false}
                displayMainButton={false}
                mainButtonAction={() => {}}
                allowAdding={false}
                addPlaceAction={() => {}}
                removeButtonAction={() => {}}
                mapHeight={240}
              />
            </div>
          )}
          <p className={styles.moduleContainer}>
            <FaRegClipboard className={styles.moduleIcon} />{' '}
            {surveyModule ? 'Survey available' : 'Survey not available'}
          </p>
          <p className={styles.moduleContainer}>
            <BsPencil className={styles.moduleIcon} />{' '}
            {declarationsModule ? 'Declarations available' : 'Declarations not available'}
          </p>
        </div>
      ) : (
        <>
          <p className={styles.editLabel}>Final date</p>
          <FinalDateForm
            finalBeginDate={newBeginDate}
            finalEndDate={newEndDate}
            setFinalBeginDate={setNewBeginDate}
            setFinalEndDate={setNewEndDate}
          />
          {meetingType === MeetingType.ONLINE ? (
            <>
              <p className={styles.editLabel}>Meeting link</p>
              <SingleValueInput
                placeholder="Please type meeting link ..."
                value={newLink}
                valueHandler={setNewLink}
              />
              <p className={styles.editLabel}>Meeting password</p>
              <SingleValueInput
                placeholder="Please type meeting password ..."
                value={newPassword}
                valueHandler={setNewPassword}
              />
            </>
          ) : (
            <>
              <p className={styles.editLabel}>Final place</p>
              <div className="mx-1 my-3">
                <MapWithPlaces
                  placesToDisplay={newFinalPlace ? [newFinalPlace] : []}
                  disabled={false}
                  mainButtonTooltipNameMapper={() => {}}
                  displayRemoveButton={false}
                  displayMainButton={false}
                  mainButtonAction={() => {}}
                  allowAdding={true}
                  addPlaceAction={(newPlace: PlaceDetails) => setNewFinalPlace(newPlace)}
                  removeButtonAction={() => {}}
                  mapHeight={240}
                />
              </div>
            </>
          )}
          <div className={styles.buttonContainer}>
            <ActionButton
              onclick={() => {
                updateDetails();
              }}
              disabled={
                finalBeginDate === newBeginDate &&
                finalEndDate === newEndDate &&
                meetingLink === newLink &&
                meetingPassword === newPassword &&
                finalPlace === newFinalPlace
              }
              text={generateEditButtonText(
                finalBeginDate !== newBeginDate || finalEndDate !== newEndDate,
                finalPlace !== newFinalPlace &&
                  newFinalPlace !== undefined &&
                  newFinalPlace !== null,
                meetingLink !== newLink || meetingPassword !== newPassword
              )}
              className={styles.updateButton}
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
