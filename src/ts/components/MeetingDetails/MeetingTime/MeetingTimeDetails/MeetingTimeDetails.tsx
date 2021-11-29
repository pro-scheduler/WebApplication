import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  updateOnlineMeetingDetails,
  updateRealMeetingDetails,
} from '../../../../API/meeting/meetingService';
import Card from '../../../common/Card/Card';
import DateTimePicker from '../../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './MeetingTimeDetails.module.css';
import Timer from '../../../common/Timer/Timer';
import { BiCalendarEvent } from 'react-icons/bi';
import FinalDateForm from '../../FinalDateForm/FinalDateForm';
import { MeetingType } from '../../../../model/meeting/Meeting';
import { PlaceDetails } from '../../../../model/geo/Geo';

export type MeetingTimeDetailsProps = {
  meetingId: number;
  setDeadline: Function;
  timeDeadline?: Date;
  isOrganizer: boolean;
  isMeetingOpen: boolean;
  finalBeginDate: Date | null;
  finalEndDate: Date | null;
  setFinalBeginDate: Function;
  setFinalEndDate: Function;
  meetingType: MeetingType;
  meetingLink: string | undefined;
  meetingPassword: string | undefined;
  finalPlace?: PlaceDetails;
};

const MeetingTimeDetails = ({
  timeDeadline,
  meetingId,
  setDeadline,
  isOrganizer,
  isMeetingOpen,
  finalBeginDate,
  finalEndDate,
  setFinalBeginDate,
  setFinalEndDate,
  meetingType,
  meetingLink,
  meetingPassword,
  finalPlace,
}: MeetingTimeDetailsProps) => {
  const [newDeadline, setNewDeadline] = useState<Date | null>(timeDeadline ? timeDeadline : null);
  const [newBeginDate, setNewBeginDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

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

  const updateDetails = () => {
    if (meetingType === MeetingType.ONLINE) {
      updateOnlineMeetingDetails(
        newBeginDate && newEndDate
          ? {
              timeStart: newBeginDate,
              timeEnd: newEndDate,
            }
          : undefined,
        meetingLink,
        meetingPassword,
        newDeadline,
        meetingId,
        () => {},
        () => {},
        () => {
          setDeadline(newDeadline);
          setFinalBeginDate(newBeginDate);
          setFinalEndDate(newEndDate);
          setEditMode(false);
        }
      );
    } else {
      updateRealMeetingDetails(
        newBeginDate && newEndDate
          ? {
              timeStart: newBeginDate,
              timeEnd: newEndDate,
            }
          : undefined,
        finalPlace ? finalPlace.id : undefined,
        newDeadline,
        meetingId,
        () => {},
        () => {},
        () => {
          setDeadline(newDeadline);
          setFinalBeginDate(newBeginDate);
          setFinalEndDate(newEndDate);
          setEditMode(false);
        }
      );
    }
  };

  useEffect(() => {
    if (timeDeadline) setNewDeadline(timeDeadline);
  }, [timeDeadline]);
  return (
    <div>
      <Card
        title="Details"
        onEdit={isOrganizer && isMeetingOpen ? () => setEditMode(!editMode) : undefined}
      >
        {editMode ? (
          <div>
            <p className={styles.editLabel}>Final meeting date</p>
            <div className={styles.editMode}>
              <FinalDateForm
                finalBeginDate={newBeginDate}
                finalEndDate={newEndDate}
                setFinalBeginDate={setNewBeginDate}
                setFinalEndDate={setNewEndDate}
              />
            </div>
            <p className={styles.editLabel}>Voting deadline</p>
            <div className={styles.editMode}>
              <DateTimePicker
                setDate={(date: Date) => {
                  setNewDeadline(date);
                }}
                timeLabel="Select time"
                dateLabel="Select date"
                defaultDate={newDeadline}
              />
            </div>
            <div className={styles.buttonContainer}>
              <ActionButton
                onclick={updateDetails}
                text={'Save changes'}
                disabled={
                  newDeadline === timeDeadline &&
                  newBeginDate === finalBeginDate &&
                  newEndDate === finalEndDate
                }
                className={styles.buttonAction}
              />
            </div>
          </div>
        ) : (
          <>
            <p className={styles.finalDateContainer}>
              <BiCalendarEvent className={styles.finalDateIcon} />{' '}
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
                    : finalBeginDate.toLocaleDateString() +
                      ' - ' +
                      finalEndDate.toLocaleDateString())
                : 'Time has not been specified yet'}
            </p>
            {isMeetingOpen ? (
              <Timer
                date={timeDeadline}
                completedMessage={'Voting is ended'}
                nonCompletedMessage={'Voting ends in:'}
                noEndDateMessage={'Voting has no time limit'}
              />
            ) : (
              <p>The meeting is canceled</p>
            )}
          </>
        )}
      </Card>
    </div>
  );
};
export default MeetingTimeDetails;
