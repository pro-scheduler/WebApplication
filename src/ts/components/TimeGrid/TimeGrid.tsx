import { Resizable } from 're-resizable';
import styles from './TimeGrid.module.scss';
import classcat from 'classcat';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';

const TimeGrid = () => {
  const [top, setTop] = useState(100);
  const [height, setHeight] = useState(30);

  const [changeDirection, setChangeDirection] = useState('top');
  const [topDelta, setTopDelta] = useState(0);
  const [delta, setDelta] = useState(0);

  const handleResize = (event: any, direction: any, _ref: any, delta: any) => {
    // if (!isResizable || disabled) {
    //   return;
    // }
    event.preventDefault();
    event.stopPropagation();

    if (delta.height === 0) {
      return;
    }

    setDelta(delta.height);
    setChangeDirection(direction);

    if (direction.includes('top')) {
      setTopDelta(-delta.height);
    }

    console.log('delta ' + delta.height);
    console.log('direction ' + direction);
  };

  const handleStop = () => {
    setHeight(height + delta);
    setDelta(0);

    if (changeDirection.includes('top')) {
      setTop(top + topDelta);
      setTopDelta(0);
    }
  };

  const handleStart = () => {
    setDelta(0);
  };

  return (
    <div>
      {/* <div className={styles.cell} style={{ height: height + delta, top: top + topDelta }}></div> */}
      <Row>
        <Resizable
          enable={{ top: true, bottom: true }}
          className={styles.rangeBox}
          style={{ height: height + delta, top: top + topDelta }}
          handleWrapperClass={styles['handle-wrapper']}
          handleClasses={{
            bottom: classcat([styles.handle, styles.bottom]),
            bottomLeft: styles.handle,
            bottomRight: styles.handle,
            left: styles.handle,
            right: styles.handle,
            top: classcat([styles.handle, styles.top]),
            topLeft: styles.handle,
            topRight: styles.handle,
          }}
          minWidth={'100px'}
          maxWidth={'100px'}
          minHeight={'30px'}
          onResize={handleResize}
          onResizeStop={handleStop}
          onResizeStart={handleStart}
        ></Resizable>
      </Row>
    </div>
  );
};

export default TimeGrid;
