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
interface Ranges {
  [key: string]: { top: number; height: number; id: number };
}
const UserTimePicker = ({
  count,
  setRanges,
  availableRanges,
  disabled,
  selectedRanges = {},
  setIsDirty = () => {},
}: {
  count: number;
  setRanges: Function;
  availableRanges: RangesWithDay;
  disabled: Boolean;
  selectedRanges?: RangesWithDay;
  setIsDirty?: Function;
}) => {
  const [currentDays, setCurrentDays] = useState<JSX.Element[]>([]);
  const [start, setStart] = useState<number>(0);
  const step = 3;

  const calculateLockedRanges = (ranges: Array<{ from: string; to: string }>) => {
    let tmp: Ranges = {};
    ranges.forEach((range, id) => {
      tmp[id.toString()] = { ...mapHourToPosition(range), id };
    });
    return tmp;
  };

  const mapHourToPosition = (position: { from: string; to: string }) => {
    let fromH = parseInt(position.from.split(':')[0]);
    let fromM = parseInt(position.from.split(':')[1]);
    let toH = parseInt(position.to.split(':')[0]);
    let toM = parseInt(position.to.split(':')[1]);

    let top = fromH * 12 * step + (fromM / 5) * step;
    let height = toH * 12 * step + (toM / 5) * step - top;
    return {
      top: top,
      height: height,
    };
  };

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
            userRanges={calculateLockedRanges(
              selectedRanges[
                ('0' + value.date.getDate()).slice(-2) +
                  '.' +
                  ('0' + value.date.getMonth()).slice(-2) +
                  '.' +
                  value.date.getFullYear()
              ]
                ? selectedRanges[
                    ('0' + value.date.getDate()).slice(-2) +
                      '.' +
                      ('0' + value.date.getMonth()).slice(-2) +
                      '.' +
                      value.date.getFullYear()
                  ].ranges
                : []
            )}
            lockedRanges={value.ranges}
            setIsDirty={setIsDirty}
          />
        </Col>
      )
    );
    while (tmp.length < count) {
      tmp.push(<Col key={tmp.length} />);
    }
    setCurrentDays(tmp);
    // eslint-disable-next-line
  }, [start, availableRanges, count, setRanges, disabled, selectedRanges]);

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
