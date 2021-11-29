import React, { useState } from 'react';
import { useEffect } from 'react';
import { updateMeetingTimeDeadline } from '../../../../API/meeting/meetingService';
import Card from '../../../common/Card/Card';
import DateTimePicker from '../../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './MeetingTimeDetails.module.css';
import Timer from '../../../common/Timer/Timer';
import { BiCalendarEvent } from 'react-icons/bi';

export type MeetingTimeDetailsProps = {
  meetingId: number;
  setDeadline: Function;
  timeDeadline?: Date;
  isOrganizer: boolean;
  isMeetingOpen: boolean;
  finalBeginDate: Date | null;
  finalEndDate: Date | null;
};

const MeetingTimeDetails = ({
  timeDeadline,
  meetingId,
  setDeadline,
  isOrganizer,
  isMeetingOpen,
  finalBeginDate,
  finalEndDate,
}: MeetingTimeDetailsProps) => {
  const [newDeadline, setNewDeadline] = useState<Date | null>(timeDeadline ? timeDeadline : null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const saveNewDeadline = () => {
    if (newDeadline) {
      updateMeetingTimeDeadline(
        newDeadline,
        meetingId,
        () => {},
        () => {
          setDeadline(newDeadline);
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
                onclick={saveNewDeadline}
                text={'Edit voting deadline'}
                disabled={newDeadline === timeDeadline}
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
