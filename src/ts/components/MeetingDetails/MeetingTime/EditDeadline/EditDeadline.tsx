import { useState } from 'react';
import { useEffect } from 'react';
import { Collapse } from 'react-collapse';
import { updateMeetingTimeDeadline } from '../../../../API/meeting/meetingService';
import Card from '../../../common/Card/Card';
import DateTimePicker from '../../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../../common/SubmitButton/ActionButton/ActionButton';
import styles from './EditDeadline.module.css';

export type EditDeadlineProps = {
  isOpened: boolean;
  meetingId: number;
  setDeadline: Function;
  timeDeadline?: Date;
};

const EditDeadline = ({ isOpened, timeDeadline, meetingId, setDeadline }: EditDeadlineProps) => {
  const [newDeadline, setNewDeadline] = useState<Date>(new Date());

  const saveNewDeadline = () => {
    updateMeetingTimeDeadline(
      newDeadline,
      meetingId,
      () => {},
      () => {
        setDeadline(newDeadline);
      }
    );
  };
  useEffect(() => {
    if (timeDeadline) setNewDeadline(timeDeadline);
  }, [timeDeadline]);
  return (
    <Collapse isOpened={isOpened}>
      <Card title="Deadline for time voting">
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
      </Card>
    </Collapse>
  );
};
export default EditDeadline;
