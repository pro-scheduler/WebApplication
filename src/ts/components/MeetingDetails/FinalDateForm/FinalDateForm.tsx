import { Row, Col } from 'react-bootstrap';
import DateTimePicker from '../../common/forms/DateTimePicker/DateTimePicker';
import styles from './FinalDateForm.module.css';

export type FinalDateFormProps = {
  finalBeginDate: Date | null;
  finalEndDate: Date | null;
  setFinalBeginDate: Function;
  setFinalEndDate: Function;
};

const FinalDateForm = ({
  finalBeginDate,
  finalEndDate,
  setFinalBeginDate,
  setFinalEndDate,
}: FinalDateFormProps) => {
  return (
    <div className={styles.finalDateContainer}>
      <Row className="justify-content">
        <Col lg={12}>
          <div className={styles.beginDatePicker}>
            <div>
              <DateTimePicker
                dateLabel="Meeting begin day"
                timeLabel="Meeting begin time"
                setDate={setFinalBeginDate}
                defaultDate={finalBeginDate}
              />
            </div>
          </div>
        </Col>
        <Col lg={12}>
          <div className={styles.endDatePicker}>
            <div>
              <DateTimePicker
                dateLabel="Meeting end day"
                timeLabel="Meeting end time"
                setDate={setFinalEndDate}
                defaultDate={finalEndDate}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default FinalDateForm;
