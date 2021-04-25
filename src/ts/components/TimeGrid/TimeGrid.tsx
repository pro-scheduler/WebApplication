import styles from './TimeGrid.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, useCallback } from 'react';
import RangeBox from './RangeBox';

const TimeGrid = ({ primaryLabel, secondaryLabel, boxSizes }: any) => {
  //   const [ranges, setRanges] = useState<JSX.Element[]>([]);
  const [rangesParams, setRangesParams] = useState<any>({});

  const getParams = () => rangesParams;

  const calculateRanges = () => {
    let ranges: any = [];
    for (const key in rangesParams) {
      if (rangesParams[key] != null) {
        console.log('Values:', key, rangesParams[key].top, rangesParams[key].height);
        ranges.push(
          <RangeBox
            defaultHeight={rangesParams[key].height}
            step={3}
            max={432}
            boxSize={432}
            defaultTop={rangesParams[key].top}
            id={rangesParams[key].id}
            //   changeParams={changeParams}
            setRangesParams={setRangesParams}
            rangesParams={rangesParams}
            getParams={getParams}
          />
        );
      }
    }
    return ranges;
  };
  const onClick = (y: number, height: number) => {
    //   const changeParams = (id: number, top: number, height: number) => {
    //     console.log('Change', id, top, height, rangesParams);
    //     rangesParams[id.toString()] = { top, height };
    //     setRangesParams({ ...rangesParams });
    //     console.log('Changed', id, top, height, rangesParams);
    //   };

    let randId = Math.floor(Math.random() * 10000);
    //   setRanges([
    //     ...ranges,
    //     <RangeBox
    //       min={height}
    //       step={3}
    //       max={432}
    //       boxSize={432}
    //       defaultTop={y}
    //       id={randId}
    //       //   changeParams={changeParams}
    //       setRangesParams={setRangesParams}
    //       rangesParams={rangesParams}
    //       getParams={getParams}
    //     />,
    //   ]);
    console.log(y, height);
    rangesParams[randId.toString()] = { top: y, height: height, id: randId };
    setRangesParams({ ...rangesParams });
  };

  //   useEffect(() => {
  //     const mergeCallback = () => {
  //       let r1 = null;
  //       let r2 = null;
  //       //   console.log('MERGE3 ', rangesParams);

  //       //   for (const key1 in rangesParams) {
  //       //     for (const key2 in rangesParams) {
  //       //       if (key1 !== key2 && rangesParams[key1] != null && rangesParams[key2] != null) {
  //       //         let x1 = rangesParams[key1].top;
  //       //         let x2 = rangesParams[key1].top + rangesParams[key1].height;
  //       //         let y1 = rangesParams[key2].top;
  //       //         let y2 = rangesParams[key2].top + rangesParams[key1].height;
  //       //         if (x1 <= y2 && y1 <= x2) {
  //       //           r1 = key1;
  //       //           r2 = key2;
  //       //           console.log('Keys ', r1, r2);
  //       //         }
  //       //       }
  //       //     }
  //       //   }
  //       console.log('MERGE4 ', rangesParams);

  //       //   if (r1 !== null && r2 != null) {
  //       //     console.log('r1,r2', r1, r2);
  //       //     let top = Math.min(rangesParams[r1].top, rangesParams[r2].top);
  //       //     let bottom = Math.max(
  //       //       rangesParams[r1].top + rangesParams[r1].height,
  //       //       rangesParams[r2].top + rangesParams[r2].height
  //       //     );
  //       //     console.log('Here', top, bottom, rangesParams);
  //       //     //   delete rangesParams[r1];
  //       //     //   delete rangesParams[r2];
  //       //     rangesParams[r1] = null;
  //       //     rangesParams[r2] = null;
  //       //     setRangesParams({ ...rangesParams });
  //       //     onClick(top, bottom - top);
  //       //   }

  //       console.log('MERGE5 ', rangesParams);
  //     };
  //     mergeCallback();
  //   }, [onClick, rangesParams]);

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
    // <div role="button" onClick={onClick} className={styles.cell}>
    <div>
      <div className={styles.titleRect}>
        <div className={styles.primaryLabel}>{primaryLabel}</div>
        <div className={styles.secondaryLabel}>{secondaryLabel}</div>
      </div>
      <div className={styles.hours_grid}>
        {hourButtonsGrid()}
        {/* {ranges} */}
        {calculateRanges()}
      </div>
    </div>
  );
};

export default TimeGrid;
