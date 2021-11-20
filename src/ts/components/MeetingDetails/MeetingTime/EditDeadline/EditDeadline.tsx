import { useState } from 'react';
import { useEffect } from 'react';
import { updateMeetingTimeDeadline } from '../../../../API/meeting/meetingService';
import Card from '../../../common/Card/Card';
import DateTimePicker from '../../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './EditDeadline.module.css';
import Timer from '../../../common/Timer/Timer';

export type EditDeadlineProps = {
  meetingId: number;
  setDeadline: Function;
  timeDeadline?: Date;
  isOrganizer: boolean;
  isMeetingOpen: boolean;
};

const EditDeadline = ({
  timeDeadline,
  meetingId,
  setDeadline,
  isOrganizer,
  isMeetingOpen,
}: EditDeadlineProps) => {
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
      <Card title="Details" onEdit={isOrganizer ? () => setEditMode(!editMode) : undefined}>
        {editMode ? (
          <>
            <DateTimePicker
              setDate={(date: Date) => {
                setNewDeadline(date);
              }}
              timeLabel="Select time"
              dateLabel="Select date"
              defaultDate={newDeadline}
            />
            <div className={styles.buttonContainer}>
              <ActionButton
                onclick={saveNewDeadline}
                text={'Edit voting deadline'}
                disabled={newDeadline === timeDeadline}
                className={styles.buttonAction}
              />
            </div>
          </>
        ) : (
          <>
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
export default EditDeadline;
