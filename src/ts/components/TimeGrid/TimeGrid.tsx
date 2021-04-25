import styles from './TimeGrid.module.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import RangeBox from './RangeBox';

const TimeGrid = ({ primaryLabel, secondaryLabel, boxSizes }: any) => {
  const [ranges, setRanges] = useState<JSX.Element[]>([]);
  const onClick = (y: number) => {
    console.log(y);
    setRanges([
      ...ranges,
      <RangeBox
        min={26}
        step={3}
        max={432}
        boxSize={432}
        defaultTop={y}
        mergeCallback={mergeCallback}
      />,
    ]);
  };

  const mergeCallback = () => {};

  const hourButtonsGrid = () => {
    let buttons = [];
    for (let i = 0; i < 12; i++) {
      buttons.push(
        <div>
          <div
            role="button"
            onClick={(evnet) => onClick(boxSizes * i)}
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
        {ranges}
      </div>
    </div>
  );
};

export default TimeGrid;
