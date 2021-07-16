import TimePicker, { TimePickerValue } from 'react-time-picker';
import styles from './TimePickerWithClock.module.css';
import { Row, Col } from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import { useState } from 'react';
import { useEffect } from 'react';

export type TimePickerWithClockProps = {
  setDay: Function;
  label?: string;
};

const TimePickerWithClock = ({ setDay, label }: TimePickerWithClockProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<TimePickerValue>('00:00');

  useEffect(() => {
    if (date && time) {
      let newDate: Date | undefined = new Date(date.getTime());
      newDate?.setMinutes(parseInt(time.toString().slice(-2)));
      newDate?.setHours(parseInt(time.toString().slice(0, 2)));
      newDate?.setTime(newDate.getTime() - newDate.getTimezoneOffset() * 60 * 1000);
      setDay(newDate);
    }
  }, [date, time, setDay]);

  return (
    <Row className="justify-content-center">
      {label && (
        <Col lg={12} className="text-center my-3">
          <div className={styles.deadlineHeader}>{label}</div>
        </Col>
      )}
      <Col lg={6} className="text-center text-lg-right">
        <DayPicker
          selectedDays={date}
          onDayClick={setDate}
          className={styles.dayPicker}
          disabledDays={[
            {
              before: new Date(Date.now()),
            },
          ]}
        />
      </Col>
      <Col lg={6} className="text-center text-lg-left mt-2 mt-lg-3">
        <TimePicker
          value={time}
          onChange={setTime}
          renderNumbers={true}
          clearIcon={null}
          minTime={new Date(Date.now())}
        />
      </Col>
    </Row>
  );
};

export default TimePickerWithClock;
