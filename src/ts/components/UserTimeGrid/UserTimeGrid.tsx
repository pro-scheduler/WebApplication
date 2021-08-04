import styles from './UserTimeGrid.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import UserRangeBox from './UserRangeBox';
import LockedCell from './LockedCell';

export type UserTimeGridProps = {
  primaryLabel: string;
  secondaryLabel: string;
  boxSizes: number;
  addRanges: Function;
  lockedRanges: Array<{ from: string; to: string }>;
  disabled: Boolean;
  userRanges?: Ranges;
  setPreferencesChanged?: (value: boolean) => void;
};

interface Ranges {
  [key: string]: { top: number; height: number; id: number };
}

const UserTimeGrid = ({
  primaryLabel,
  secondaryLabel,
  boxSizes,
  addRanges,
  lockedRanges,
  disabled,
  userRanges = {},
  setPreferencesChanged = () => {},
}: UserTimeGridProps) => {
  const [rangesParams, setRangesParams] = useState<Ranges>(userRanges);
  const [calculatedLockedRanges, setCalculatedLockedRanges] = useState<Array<JSX.Element>>([]);
  const [mappedLocked, setMappedLocked] = useState<Array<{ top: number; bottom: number }>>([]);
  const step = 3;
  const changeParams = (id: number, top: number, height: number) => {
    let tmp = { ...rangesParams };
    tmp[id.toString()] = { top, height, id };
    setRangesParams({ ...tmp });
    setPreferencesChanged(true);
  };
  const removeRange = (id: number) => {
    let tmp = { ...rangesParams };
    delete tmp[id.toString()];
    setRangesParams({ ...tmp });
    setPreferencesChanged(true);
  };
  const positionToTime = (position: number) => {
    const hour: number = Math.floor((5 * (position / step)) / 60);
    const min: number = (5 * (position / step)) % 60;
    let hourStr: string = hour.toString();
    let minStr: string = min.toString();
    if (hour < 10) {
      hourStr = '0' + hourStr;
    }
    if (min < 10) {
      minStr = '0' + minStr;
    }
    return hourStr + ':' + minStr;
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
    let ranges = [];
    for (let range in rangesParams) {
      ranges.push({
        from: positionToTime(rangesParams[range].top),
        to: positionToTime(rangesParams[range].top + rangesParams[range].height),
      });
    }
    addRanges(ranges);
    // eslint-disable-next-line
  }, [rangesParams]);

  const calculateRanges = () => {
    let ranges: Array<JSX.Element> = [];
    for (const key in rangesParams) {
      if (rangesParams.hasOwnProperty(key)) {
        ranges.push(
          <UserRangeBox
            key={key}
            defaultHeight={rangesParams[key].height}
            step={step}
            max={432 * 2}
            boxSize={432 * 2}
            defaultTop={rangesParams[key].top}
            id={rangesParams[key].id}
            changeParams={changeParams}
            lockedRanges={mappedLocked}
            removeRange={removeRange}
          />
        );
      }
    }
    return ranges;
  };

  useEffect(() => {
    let ranges: Array<JSX.Element> = [];
    for (let key of lockedRanges) {
      let tmp = mapHourToPosition(key);
      ranges.push(
        <LockedCell top={tmp.top} height={tmp.height} key={tmp.top + ' ' + tmp.height} />
      );
    }
    setCalculatedLockedRanges(ranges);
  }, [lockedRanges]);

  useEffect(() => {
    setMappedLocked(
      lockedRanges.map((range) => {
        let tmp = mapHourToPosition(range);
        return {
          top: tmp.top,
          bottom: tmp.top + tmp.height,
        };
      })
    );
  }, [lockedRanges]);

  const onClick = (y: number, height: number) => {
    if (!disabled) {
      let bottom = y + height;
      let commonRanges = getAllCommonRanges(y, bottom);
      if (commonRanges.length > 0) {
        for (let range of commonRanges) {
          let randId = Math.floor(Math.random() * 10000);
          let top = range.top > y ? range.top : y;
          let bot = range.bottom < bottom ? range.bottom : bottom;
          rangesParams[randId.toString()] = { top: top, height: bot - top, id: randId };
        }
        setRangesParams({ ...rangesParams });
      }
    }
  };

  useEffect(() => {
    const mergeCallback = () => {
      let r1 = null;
      let r2 = null;

      for (const key1 in rangesParams) {
        if (rangesParams.hasOwnProperty(key1)) {
          for (const key2 in rangesParams) {
            if (key1 !== key2 && rangesParams.hasOwnProperty(key2)) {
              let x = rangesParams[key1].top + rangesParams[key1].height;
              let y = rangesParams[key2].top + rangesParams[key2].height;
              if (rangesParams[key1].top <= y && rangesParams[key2].top <= x) {
                r1 = key1;
                r2 = key2;
              }
            }
          }
        }
      }

      if (r1 !== null && r2 != null) {
        const top = Math.min(rangesParams[r1].top, rangesParams[r2].top);
        const bottom = Math.max(
          rangesParams[r1].top + rangesParams[r1].height,
          rangesParams[r2].top + rangesParams[r2].height
        );
        let tmp = { ...rangesParams };
        delete tmp[r1];
        delete tmp[r2];
        const randId = Math.floor(Math.random() * 10000);
        tmp[randId.toString()] = { top: top, height: bottom - top, id: randId };
        setRangesParams({ ...tmp });
      }
    };
    mergeCallback();
  }, [rangesParams]);

  const hasCommonRange = (top: number, bottom: number) => {
    for (let range of mappedLocked) {
      if (range.top < bottom && top < range.bottom) {
        return true;
      }
    }
    return false;
  };

  const getAllCommonRanges = (top: number, bottom: number) => {
    let ranges = [];
    for (let range of mappedLocked) {
      if (range.top < bottom && top < range.bottom) {
        ranges.push(range);
      }
    }
    return ranges;
  };

  const hourButtonsGrid = () => {
    let buttons = [];
    for (let i = 0; i < 24; i++) {
      buttons.push(
        <div key={i}>
          <div
            role="button"
            onClick={() => onClick(boxSizes * i, 36)}
            className={
              styles.button_cell +
              ' ' +
              (i === 23 ? styles.bottom_radius : '') +
              ' ' +
              (!hasCommonRange(i * step * 12, i * step * 12 + step * 12)
                ? styles.button_disabled
                : disabled
                ? styles.button_disabled
                : '')
            }
          >
            <Row className={'m-0'}>
              <Col
                className={'align-self-center pr-0'}
                xs="auto"
                style={{ color: i > 20 || i < 7 ? 'var(--light-grey)' : 'var(--medium-grey)' }}
              >
                {i}:00{' '}
              </Col>
              <Col>
                <hr className={styles.hrLine} />
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return buttons;
  };
  return (
    <div>
      <div className={styles.titleRect}>
        <div className={styles.primaryLabel}>{primaryLabel}</div>
        <div className={styles.secondaryLabel}>{secondaryLabel}</div>
      </div>
      <div className={styles.top_hours_grid} />
      <div className={styles.hours_grid}>
        {calculatedLockedRanges}
        {hourButtonsGrid()}
        {calculateRanges()}
      </div>
    </div>
  );
};

export default UserTimeGrid;
