import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../common/Card/Card';
import DataTimePicker from '../../common/forms/DataTimePicker/DataTimePicker';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './FinalDateForm.module.css';

export type FinalDateFormProps = {
  meetingId: string;
  finalBeginDate: Date;
  finalEndDate: Date;
};

const FinalDateForm = ({ meetingId, finalBeginDate, finalEndDate }: FinalDateFormProps) => {
  const [beginDate, setBeginDate] = useState(finalBeginDate);
  const [endDate, setEndDate] = useState(finalEndDate);

  const saveFinalDate = () => {
    //TO DO send save request here
    console.log(endDate, beginDate, meetingId);
  };

  const reset = () => {
    setBeginDate(finalBeginDate);
    setEndDate(finalEndDate);
  };

  return (
    <Row className="justify-content mt-5 ml-5 pl-5">
      <Col>
        <Card
          title="Select final date"
          footer={
            <div>
              <div className={styles.buttonContainer}>
                <ActionButton
                  onclick={saveFinalDate}
                  text="Save FInal Date"
                  className={styles.submitButton}
                  disabled={finalEndDate === endDate && finalBeginDate === beginDate}
                />
                <ActionButton
                  onclick={reset}
                  text="Reset"
                  disabled={finalEndDate === endDate && finalBeginDate === beginDate}
                />
              </div>
            </div>
          }
        >
          <div className={styles.finalDateContainer}>
            <div className={styles.beginDatePicker}>
              <div>
                Begin date:
                <DataTimePicker
                  dateLabel="set meeting begin day"
                  timeLabel="Set meeting begin time"
                  setDate={setBeginDate}
                  defaultDate={beginDate}
                />
              </div>
            </div>
            <div className={styles.endDatePicker}>
              <div>
                End date:
                <DataTimePicker
                  dateLabel="set meeting end day"
                  timeLabel="Set meeting end time"
                  setDate={setEndDate}
                  defaultDate={endDate}
                />
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
export default FinalDateForm;
