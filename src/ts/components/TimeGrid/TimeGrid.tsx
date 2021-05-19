import styles from './TimeGrid.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import RangeBox from './RangeBox';

export type TimeGridProps = {
  primaryLabel: string;
  secondaryLabel: string;
  boxSizes: number;
  addRanges: Function;
};

const TimeGrid = ({ primaryLabel, secondaryLabel, boxSizes, addRanges }: TimeGridProps) => {
  const [rangesParams, setRangesParams] = useState<any>({});
  const step = 3;
  const changeParams = (id: number, top: number, height: number) => {
    let tmp = { ...rangesParams };
    tmp[id.toString()] = { top, height, id };
    setRangesParams({ ...tmp });
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

  useEffect(() => {
    let ranges = [];
    for (let range in rangesParams) {
      ranges.push({
        from: positionToTime(rangesParams[range].top),
        to: positionToTime(rangesParams[range].top + rangesParams[range].height),
      });
    }
    console.log(ranges);
    addRanges(ranges);
    // eslint-disable-next-line
  }, [rangesParams]);

  const calculateRanges = () => {
    let ranges: any = [];
    for (const key in rangesParams) {
      if (rangesParams.hasOwnProperty(key)) {
        ranges.push(
          <RangeBox
            key={key}
            defaultHeight={rangesParams[key].height}
            step={step}
            max={432 * 2}
            boxSize={432 * 2}
            defaultTop={rangesParams[key].top}
            id={rangesParams[key].id}
            changeParams={changeParams}
          />
        );
      }
    }
    return ranges;
  };

  const onClick = (y: number, height: number) => {
    let randId = Math.floor(Math.random() * 10000);
    rangesParams[randId.toString()] = { top: y, height: height, id: randId };
    setRangesParams({ ...rangesParams });
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

  const hourButtonsGrid = () => {
    let buttons = [];
    for (let i = 0; i < 24; i++) {
      buttons.push(
        <div key={i}>
          <div
            role="button"
            onClick={() => onClick(boxSizes * i, 36)}
            className={styles.button_cell + ' ' + (i === 23 ? styles.bottom_radius : '')}
          >
            <Row className={'m-0'}>
              <Col className={'align-self-center pr-0'} xs="auto">
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
        {hourButtonsGrid()}
        {calculateRanges()}
      </div>
    </div>
  );
};

export default TimeGrid;
