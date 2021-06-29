import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AnswerTimeGrid from './AnswerTimeGrid';
import { useEffect, useState } from 'react';
import NextLeftButton from '../common/NextButton/NextLeftButton';
import NextRightButton from '../common/NextButton/NextRightButton';
import styles from './UserTimePicker.module.css';
import { TimeRange } from '../../model/TimeRange';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface RangesWithDay {
  [key: string]: { ranges: Array<{ from: string; to: string }>; date: Date };
}

const AnswersTimePicker = ({
  count,
  setRanges,
  availableRanges,
  answers,
  disabled,
}: {
  count: number;
  setRanges: Function;
  availableRanges: RangesWithDay;
  answers: RangesWithDay;
  disabled?: Boolean;
}) => {
  const [currentDays, setCurrentDays] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(0);

  useEffect(() => {
    const tmp = Object.entries(availableRanges).map(
      (
        [key, value]: [string, { ranges: { from: string; to: string }[]; date: Date }],
        index: number
      ) => (
        <Col hidden={!(index >= start && index < start + count)} key={index}>
          <AnswerTimeGrid
            primaryLabel={
              ('0' + value.date.getDate()).slice(-2) +
              '.' +
              ('0' + (value.date.getMonth() + 1)).slice(-2)
            }
            secondaryLabel={weekDays[value.date.getDay()]}
            boxSizes={36}
            disabled={disabled ? disabled : false}
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
            answers={answers[key]}
          />
        </Col>
      )
    );
    while (tmp.length < count) {
      tmp.push(<Col key={tmp.length} />);
    }
    setCurrentDays(tmp);
  }, [start, availableRanges, count, setRanges, answers, disabled]);

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

export default AnswersTimePicker;
