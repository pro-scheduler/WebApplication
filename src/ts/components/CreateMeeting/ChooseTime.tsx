import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
import style from './NameAndDesctiption.module.css';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useEffect, useState } from 'react';
import TimePicker from '../TimeGrid/TimePicker';
import useWindowDimensions from '../common/window/WindowDimension';
import { TimeRangeDTO } from '../../model/TimeRangeDTO';

interface rangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}
const ChooseTime = ({ setSelectedRanges }: { setSelectedRanges: Function }) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [timeRanges, setTimeRanges] = useState<rangesWithDay>({});
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
    let rangesFilltered: TimeRangeDTO[] = [];
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
              from.setTime(from.getTime() - from.getTimezoneOffset() * 60 * 1000);
              to.setTime(to.getTime() - to.getTimezoneOffset() * 60 * 1000);
              rangesFilltered.push({ startDateTime: from, endDateTime: to });
            });
          }
        }
      }
    }
    setSelectedRanges(rangesFilltered);
  }, [timeRanges, selectedDays, setSelectedRanges]);

  const setRanges = (date: string, ranges: Array<{ from: string; to: string }>, day: Date) => {
    let ran: rangesWithDay = {
      ...timeRanges,
    };
    ran[date] = { ranges: ranges, date: day };
    setTimeRanges({ ...ran });
  };
  return (
    <div style={{ marginLeft: width < 576 ? 0 : 45 }}>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Set time of the meeting</div>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col />
        <Col className="text-center">
          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        </Col>
        <Col />
      </Row>
      <div style={{ marginRight: width < 576 ? 45 : 0 }}>
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
