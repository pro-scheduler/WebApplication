import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import { useEffect, useState } from 'react';
import NextLeftButton from '../../components/common/NextButton/NextLeftButton';
import NextRightButton from '../../components/common/NextButton/NextRightButton';
import styles from './TimePicker.module.css';

interface ITimePickerProps {
  days: Date[];
}
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TimePicker = ({ days }: ITimePickerProps) => {
  const [currentDays, setCurrentDays] = useState([<Col />, <Col />, <Col />, <Col />]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    let tmp = days
      //   .filter((day, index) => index >= start && index < start + 4)
      .map((day, index) => (
        <Col hidden={!(index >= start && index < start + 4)}>
          <TimeGrid
            primaryLabel={('0' + day.getDate()).slice(-2) + '.' + ('0' + day.getMonth()).slice(-2)}
            secondaryLabel={weekDays[day.getDay()]}
            boxSizes={36}
            timeRanges={[]}
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
      <Row className="justify-content-center mt-4">
        <div className={styles.leftArrow}>
          {days.length > 4 ? (
            <NextLeftButton onclick={() => setStart(start - 1)} disabled={start === 0} />
          ) : null}
        </div>
        {currentDays}
        <div className={styles.rightArrow}>
          {days.length > 4 ? (
            <NextRightButton
              onclick={() => setStart(start + 1)}
              disabled={start >= days.length - 4}
            />
          ) : null}
        </div>
      </Row>
    </Container>
  );
};

export default TimePicker;
