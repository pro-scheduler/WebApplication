import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CalendarIcon from '../common/Icons/CalendarIcon';
import style from './NameAndDesctiption.module.css';
import DayPicker, { DateUtils, DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useState } from 'react';
import TimePicker from '../TimeGrid/TimePicker';

const ChooseTime = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const handleDayClick = (day: Date, { selected }: any) => {
    let days = selectedDays.concat();
    if (selected) {
      let selectedIndex = days.findIndex((selectedDay) => DateUtils.isSameDay(selectedDay, day));
      days.splice(selectedIndex, 1);
    } else {
      days.push(day);
    }
    days.sort((day1, day2) => day1.getTime() - day2.getTime());
    setSelectedDays(days);
  };

  return (
    <div>
      <Row className="justify-content-center mt-5">
        <Col xs="auto">
          <CalendarIcon />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <div className={style.createHeader}>Set the time of the meeting</div>
      </Row>
      <Row>
        <div>
          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        </div>
      </Row>
      <TimePicker days={selectedDays} />
    </div>
  );
};

export default ChooseTime;
