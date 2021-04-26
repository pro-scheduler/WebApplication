import styles from './TimeGrid.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import RangeBox from './RangeBox';

const TimeGrid = ({ primaryLabel, secondaryLabel, boxSizes }: any) => {
  const [rangesParams, setRangesParams] = useState<any>({});

  const changeParams = (id: number, top: number, height: number) => {
    let tmp = { ...rangesParams };
    tmp[id.toString()] = { top, height, id };
    setRangesParams({ ...tmp });
  };

  const calculateRanges = () => {
    let ranges: any = [];
    for (const key in rangesParams) {
      if (rangesParams[key] != null) {
        ranges.push(
          <RangeBox
            defaultHeight={rangesParams[key].height}
            step={3}
            max={432}
            boxSize={432}
            defaultTop={rangesParams[key].top}
            id={rangesParams[key].id}
            changeParams={changeParams}
            setRangesParams={setRangesParams}
            rangesParams={rangesParams}
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
        for (const key2 in rangesParams) {
          if (key1 !== key2 && rangesParams[key1] != null && rangesParams[key2] != null) {
            let x1 = rangesParams[key1].top;
            let x2 = rangesParams[key1].top + rangesParams[key1].height;
            let y1 = rangesParams[key2].top;
            let y2 = rangesParams[key2].top + rangesParams[key2].height;
            if (x1 <= y2 && y1 <= x2) {
              r1 = key1;
              r2 = key2;
            }
          }
        }
      }

      if (r1 !== null && r2 != null) {
        let top = Math.min(rangesParams[r1].top, rangesParams[r2].top);
        let bottom = Math.max(
          rangesParams[r1].top + rangesParams[r1].height,
          rangesParams[r2].top + rangesParams[r2].height
        );
        let tmp = { ...rangesParams };
        delete tmp[r1];
        delete tmp[r2];
        let randId = Math.floor(Math.random() * 10000);
        tmp[randId.toString()] = { top: top, height: bottom - top, id: randId };
        setRangesParams({ ...tmp });
      }
    };
    mergeCallback();
  }, [rangesParams]);

  const hourButtonsGrid = () => {
    let buttons = [];
    for (let i = 0; i < 12; i++) {
      buttons.push(
        <div>
          <div
            role="button"
            onClick={(evnet) => onClick(boxSizes * i, 36)}
            className={
              styles.button_cell +
              ' ' +
              (i === 0 ? styles.top_radius : i === 11 ? styles.bottom_radius : '')
            }
          >
            <Row className={'m-0'}>
              <Col className={'align-self-center pr-0'} xs="auto">
                {i}:00{' '}
              </Col>
              <Col className={'align-self-center'}>
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
      <div className={styles.hours_grid}>
        {hourButtonsGrid()}
        {calculateRanges()}
      </div>
    </div>
  );
};

export default TimeGrid;
