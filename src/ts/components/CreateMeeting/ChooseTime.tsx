import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
import styles from './ChooseTime.module.css';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import React, { useEffect, useState } from 'react';
import TimePicker from '../TimeGrid/TimePicker';
import useWindowDimensions from '../common/window/WindowDimension';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';
import { creatingMeetingState } from '../../views/CreateMeeting/CreateMeeting';
import Card from '../common/Card/Card';
import DeleteButton from '../common/SubmitButton/ActionButton/DeleteButton';
import DateTimePicker from '../common/forms/DateTimePicker/DateTimePicker';

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

export type ChooseTimeProps = {
  state: creatingMeetingState;
  setSelectedRanges: Function;
  setDeadlineDate: Function;
};
const ChooseTime = ({ state, setSelectedRanges, setDeadlineDate }: ChooseTimeProps) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [timeRanges, setTimeRanges] = useState<RangesWithDay>({});
  const [deadline, setDeadline] = useState<Date>(new Date());
  // eslint-disable-next-line
  const { height, width } = useWindowDimensions();
  const handleDayClick = (day: Date, { selected }: DayModifiers) => {
    const days = selectedDays.concat();
    if (selected) {
      const selectedIndex = days.findIndex((selectedDay) => DateUtils.isSameDay(selectedDay, day));
      days.splice(selectedIndex, 1);
    } else {
      days.push(day);
    }
    days.sort((day1: Date, day2: Date) => day1.getTime() - day2.getTime());
    setSelectedDays(days);
  };

  useEffect(() => {
    let rangesFiltered: TimeRangeDTO[] = [];
    for (let key in timeRanges) {
      for (let day of selectedDays) {
        if (
          key ===
          ('0' + day.getDate()).slice(-2) +
            '.' +
            ('0' + day.getMonth()).slice(-2) +
            '.' +
            day.getFullYear()
        ) {
          if (timeRanges[key].ranges.length > 0) {
            timeRanges[key].ranges.forEach((range) => {
              let from: Date = new Date(timeRanges[key].date);
              let to: Date = new Date(timeRanges[key].date);
              from.setHours(parseInt(range.from.split(':')[0]), parseInt(range.from.split(':')[1]));
              to.setHours(parseInt(range.to.split(':')[0]), parseInt(range.to.split(':')[1]));
              rangesFiltered.push({ timeStart: from, timeEnd: to });
            });
          }
        }
      }
    }
    setSelectedRanges(rangesFiltered);
  }, [timeRanges, selectedDays, setSelectedRanges]);

  const setRanges = (date: string, ranges: Array<{ from: string; to: string }>, day: Date) => {
    let ran: RangesWithDay = {
      ...timeRanges,
    };
    ran[date] = { ranges: ranges, date: day };
    setTimeRanges({ ...ran });
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const removeDay = (day: Date) => {
    setSelectedDays([...selectedDays.filter((d) => d !== day)]);
  };
  return (
    <div
      className={
        state !== 'time' && (state !== 'summary' || selectedDays.length === 0) ? styles.hidden : ''
      }
    >
      <Row className="justify-content-center mt-5">
        <Col lg={12} className="text-center">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.createHeader}>Set time of the meeting</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col sm={12}>
          <Card title="Deadline for time voting">
            <DateTimePicker
              setDate={(date: Date) => {
                setDeadlineDate(date);
                setDeadline(date);
              }}
              timeLabel="Select time"
              dateLabel="Select date"
              defaultDate={deadline}
            />
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={styles.possibleTimeHeader}>Select a possible meeting time</div>
      </Row>
      <Row className="justify-content-center mt-1">
        <Col className="text-center">
          <Card title="Meeting dates">
            <div className={styles.meetingDates}>
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
                className={styles.dayPicker}
                disabledDays={[
                  {
                    before: new Date(Date.now()),
                  },
                ]}
              />
              {selectedDays.length > 0 && (
                <div className={styles.selectedDays}>
                  <div className={styles.datesHeader}>Chosen dates</div>
                  {selectedDays.map((date, i) => (
                    <div key={i}>
                      <hr className={styles.hrLine} />
                      <div className={styles.dateRow}>
                        <div>
                          {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
                        </div>
                        <DeleteButton onDelete={() => removeDay(date)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <div className="mt-5">
        <TimePicker
          days={selectedDays}
          count={width > 1290 ? 4 : width > 991 ? 3 : width > 768 ? 2 : 1}
          setRanges={setRanges}
        />
      </div>
    </div>
  );
};

export default ChooseTime;
