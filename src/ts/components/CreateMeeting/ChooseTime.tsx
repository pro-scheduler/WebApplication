import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CalendarIcon from '../common/Icons/CalendarIcon';
import style from './NameAndDesctiption.module.css';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useState } from 'react';
import TimePicker from '../TimeGrid/TimePicker';

const ChooseTime = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

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

  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center my-4">
        <div className={style.createHeader}>Set time of the meeting</div>
      </Row>
      <Row>
        <Col />
        <Col className="text-center">
          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        </Col>
        <Col />
      </Row>
      <TimePicker days={selectedDays} />
    </div>
  );
};

export default ChooseTime;
