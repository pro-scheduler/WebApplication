import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { updateFinalDate } from '../../../API/meeting/meetingService';
import Card from '../../common/Card/Card';
import DateTimePicker from '../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './FinalDateForm.module.css';

export type FinalDateFormProps = {
  meetingId: number;
  finalBeginDate: Date;
  finalEndDate: Date;
  hasBeenSet: boolean;
  isOrganizer: boolean;
};

const FinalDateForm = ({
  meetingId,
  finalBeginDate,
  finalEndDate,
  hasBeenSet,
  isOrganizer,
}: FinalDateFormProps) => {
  const [defaultBegin, setDefaultBegin] = useState<Date>(finalBeginDate);
  const [defaultEnd, setDefaultEnd] = useState<Date>(finalEndDate);
  const [beginDate, setBeginDate] = useState<Date>(finalBeginDate);
  const [endDate, setEndDate] = useState<Date>(finalEndDate);
  const [saved, setSaved] = useState<boolean>(hasBeenSet);
  const [editMode, setEditMode] = useState<boolean>(false);

  const saveFinalDate = () => {
    updateFinalDate(
      {
        timeStart: beginDate,
        timeEnd: endDate,
      },
      meetingId,
      () => {},
      () => {},
      () => {
        setSaved(true);
        setDefaultBegin(beginDate);
        setDefaultEnd(endDate);
      }
    );
  };

  const reset = () => {
    setBeginDate(finalBeginDate);
    setEndDate(finalEndDate);
  };

  return (
    <Row className="justify-content mt-5">
      <Col>
        <Card
          title="Final date of the meeting"
          onEdit={isOrganizer ? () => setEditMode(!editMode) : undefined}
          footer={
            editMode ? (
              <div>
                <div className={styles.buttonContainer}>
                  <Row className="justify-content">
                    <Col lg={6}>
                      <div className={styles.centerColumn}>
                        <ActionButton
                          onclick={saveFinalDate}
                          text={saved ? 'Edit final date' : 'Save final date'}
                          disabled={defaultEnd === endDate && defaultBegin === beginDate}
                          className={styles.buttonAction}
                        />
                      </div>
                    </Col>
                    <Col lg={6} className="mt-2 mt-lg-0">
                      <div className={styles.centerColumn}>
                        <ActionButton
                          onclick={reset}
                          text="Reset"
                          disabled={defaultEnd === endDate && defaultBegin === beginDate}
                          className={styles.buttonAction}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : undefined
          }
        >
          <div className={styles.finalDateContainer}>
            <Row className="justify-content">
              <Col lg={6}>
                <div className={styles.beginDatePicker}>
                  <div>
                    Begin date:
                    <DateTimePicker
                      dateLabel="Meeting begin day"
                      timeLabel="Meeting begin time"
                      setDate={setBeginDate}
                      defaultDate={beginDate}
                    />
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.endDatePicker}>
                  <div>
                    End date:
                    <DateTimePicker
                      dateLabel="Meeting end day"
                      timeLabel="Meeting end time"
                      setDate={setEndDate}
                      defaultDate={endDate}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default FinalDateForm;
