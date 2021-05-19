import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TimeGrid from '../../components/TimeGrid/TimeGrid';
import { useEffect, useState } from 'react';
import NextLeftButton from '../../components/common/NextButton/NextLeftButton';
import NextRightButton from '../../components/common/NextButton/NextRightButton';
import styles from './TimePicker.module.css';
import { TimeRange } from '../../model/TimeRange';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimePicker = ({
  days,
  count,
  setRanges,
}: {
  days: Date[];
  count: number;
  setRanges: Function;
}) => {
  const [currentDays, setCurrentDays] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    const tmp = days.map((day: Date, index: number) => (
      <Col hidden={!(index >= start && index < start + count)} key={index}>
        <TimeGrid
          primaryLabel={('0' + day.getDate()).slice(-2) + '.' + ('0' + day.getMonth()).slice(-2)}
          secondaryLabel={weekDays[day.getDay()]}
          boxSizes={36}
          addRanges={(range: TimeRange) => {
            const date =
              ('0' + day.getDate()).slice(-2) +
              '.' +
              ('0' + day.getMonth()).slice(-2) +
              '.' +
              day.getFullYear();
            setRanges(date, range);
          }}
        />
      </Col>
    ));
    while (tmp.length < count) {
      tmp.push(<Col key={tmp.length} />);
    }
    setCurrentDays(tmp);
  }, [start, days, count, setRanges]);

  return (
    <Row className="justify-content-center" style={{ position: 'relative', marginLeft: 10 }}>
      <div className={styles.leftArrow}>
        {days.length > count && (
          <NextLeftButton onclick={() => setStart(start - 1)} disabled={start === 0} />
        )}
      </div>
      {currentDays}
      <div className={styles.rightArrow}>
        {days.length > count && (
          <NextRightButton
            onclick={() => setStart(start + 1)}
            disabled={start >= days.length - count}
          />
        )}
      </div>
    </Row>
  );
};

export default TimePicker;
