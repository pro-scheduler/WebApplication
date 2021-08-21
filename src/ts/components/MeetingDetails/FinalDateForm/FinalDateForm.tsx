import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../../common/Card/Card';
import DateTimePicker from '../../common/forms/DateTimePicker/DateTimePicker';
import ActionButton from '../../common/SubmitButton/ActionButton/ActionButton';
import styles from './FinalDateForm.module.css';

export type FinalDateFormProps = {
  meetingId: number;
  finalBeginDate: Date;
  finalEndDate: Date;
};

const FinalDateForm = ({ meetingId, finalBeginDate, finalEndDate }: FinalDateFormProps) => {
  const [beginDate, setBeginDate] = useState(finalBeginDate);
  const [endDate, setEndDate] = useState(finalEndDate);

  const saveFinalDate = () => {
    //TODO send save request here
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
                <Row className="justify-content">
                  <Col lg={6}>
                    <div className={styles.centerColumn}>
                      <ActionButton
                        onclick={saveFinalDate}
                        text="Save final date"
                        disabled={finalEndDate === endDate && finalBeginDate === beginDate}
                        className={styles.buttonAction}
                      />
                    </div>
                  </Col>
                  <Col lg={6} className="mt-2 mt-lg-0">
                    <div className={styles.centerColumn}>
                      <ActionButton
                        onclick={reset}
                        text="Reset"
                        disabled={finalEndDate === endDate && finalBeginDate === beginDate}
                        className={styles.buttonAction}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          }
        >
          <div className={styles.finalDateContainer}>
            <Row className="justify-content">
              <Col lg={6}>
                <div className={styles.beginDatePicker}>
                  <div>
                    Begin date:
                    <DateTimePicker
                      dateLabel="Set meeting begin day"
                      timeLabel="Set meeting begin time"
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
                      dateLabel="Set meeting end day"
                      timeLabel="Set meeting end time"
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
