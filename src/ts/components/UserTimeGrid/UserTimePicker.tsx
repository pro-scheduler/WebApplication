import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserTimeGrid from './UserTimeGrid';
import { useEffect, useState } from 'react';
import NextLeftButton from '../common/NextButton/NextLeftButton';
import NextRightButton from '../common/NextButton/NextRightButton';
import styles from './UserTimePicker.module.css';
import { TimeRange } from '../../model/TimeRange';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

const UserTimePicker = ({
  count,
  setRanges,
  availableRanges,
  disabled,
}: {
  count: number;
  setRanges: Function;
  availableRanges: RangesWithDay;
  disabled: Boolean;
}) => {
  const [currentDays, setCurrentDays] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    const tmp = Object.values(availableRanges).map(
      (value: { ranges: Array<{ from: string; to: string }>; date: Date }, index: number) => (
        <Col hidden={!(index >= start && index < start + count)} key={index}>
          <UserTimeGrid
            primaryLabel={
              ('0' + value.date.getDate()).slice(-2) +
              '.' +
              ('0' + (value.date.getMonth() + 1)).slice(-2)
            }
            secondaryLabel={weekDays[value.date.getDay()]}
            boxSizes={36}
            disabled={disabled}
            addRanges={(range: TimeRange) => {
              const date =
                ('0' + value.date.getDate()).slice(-2) +
                '.' +
                ('0' + value.date.getMonth()).slice(-2) +
                '.' +
                value.date.getFullYear();
              setRanges(date, range, value.date);
            }}
            lockedRanges={value.ranges}
          />
        </Col>
      )
    );
    while (tmp.length < count) {
      tmp.push(<Col key={tmp.length} />);
    }
    setCurrentDays(tmp);
  }, [start, availableRanges, count, setRanges, disabled]);

  return (
    <Row className="justify-content-center" style={{ position: 'relative', marginLeft: 10 }}>
      <div className={styles.leftArrow}>
        {Object.values(availableRanges).length > count && (
          <NextLeftButton onclick={() => setStart(start - 1)} disabled={start === 0} />
        )}
      </div>
      {currentDays}
      <div className={styles.rightArrow}>
        {Object.values(availableRanges).length > count && (
          <NextRightButton
            onclick={() => setStart(start + 1)}
            disabled={start >= Object.values(availableRanges).length - count}
          />
        )}
      </div>
    </Row>
  );
};

export default UserTimePicker;
