import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
import style from './NameAndDesctiption.module.css';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useEffect, useState } from 'react';
import TimePicker from '../TimeGrid/TimePicker';
import useWindowDimensions from '../common/window/WindowDimension';
import { TimeRange } from '../../model/TimeRange';

const ChooseTime = ({ setSelectedRanges }: { setSelectedRanges: Function }) => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [timeRanges, setTimeRanges] = useState<{ [key: string]: Array<TimeRange> }>({});
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
    let rangesFilltered: { [key: string]: Array<TimeRange> } = {};
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
          rangesFilltered[key] = timeRanges[key];
        }
      }
    }
    setSelectedRanges(rangesFilltered);
  }, [timeRanges, selectedDays, setSelectedRanges]);

  const setRanges = (date: string, ranges: Array<TimeRange>) => {
    let ran: { [key: string]: Array<TimeRange> } = { ...timeRanges };
    ran[date] = ranges;
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
          {width}
        </Col>
        <Col />
      </Row>
      <div style={{ marginRight: width < 576 ? 45 : 0 }}>
        <TimePicker
          days={selectedDays}
          count={width > 1290 ? 4 : width > 991 ? 3 : width > 660 ? 2 : 1}
          setRanges={setRanges}
        />
      </div>
    </div>
  );
};

export default ChooseTime;
