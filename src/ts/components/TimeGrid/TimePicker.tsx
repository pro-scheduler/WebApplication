import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import { useEffect, useState } from 'react';
interface ITimePickerProps {
  days: Date[];
}
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimePicker = ({ days }: ITimePickerProps) => {
  const [currentDays, setCurrentDays] = useState([<Col />, <Col />, <Col />, <Col />]);
  const [start, setStart] = useState(0);
  useEffect(() => {
    let tmp = days
      .filter((day, index) => index >= start && index < start + 4)
      .map((day) => (
        <Col>
          <TimeGrid
            primaryLabel={('0' + day.getDate()).slice(-2) + '.' + ('0' + day.getMonth()).slice(-2)}
            secondaryLabel={weekDays[day.getDay()]}
            boxSizes={36}
          />
        </Col>
      ));
    while (tmp.length < 4) {
      tmp.push(<Col />);
    }
    setCurrentDays(tmp);
  }, [start, days]);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">{currentDays}</Row>
      <button onClick={() => setStart(start - 1)} disabled={start === 0}>
        Left
      </button>
      <button onClick={() => setStart(start + 1)} disabled={start >= days.length - 4}>
        Right
      </button>
    </Container>
  );
};

export default TimePicker;
