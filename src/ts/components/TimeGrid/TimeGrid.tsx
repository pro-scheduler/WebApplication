import { Resizable } from 're-resizable';
import styles from './TimeGrid.module.scss';
import classcat from 'classcat';
import { useState, useMemo } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

const TimeGrid = () => {
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(100);

  const [changeDirection, setChangeDirection] = useState('top');
  const [topDelta, setTopDelta] = useState(0);
  const [delta, setDelta] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleResize = (event: any, direction: any, _ref: any, delta: any) => {
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
  };

  const handleStop = () => {
    setHeight(height + delta);
    setDelta(0);
    setIsResizing(false);

    if (changeDirection.includes('top')) {
      setTop(top + topDelta);
      setTopDelta(0);
    }
  };

  const handleDrag: DraggableEventHandler = (event: any, position: any) => {
    event.preventDefault();
    event.stopPropagation();

    // setTopDelta(position.y);
  };

  const cancelClasses = styles.handle
    .split(' ')
    .map((className) => `.${className}`)
    .join(', ');

  const handleStart = () => {
    setDelta(0);
    setIsResizing(true);
  };

  return (
    <div>
      <Draggable
        axis={'y'}
        bounds={{
          top: 0,
          bottom: 200,
          left: 0,
          right: 0,
        }}
        // position={{ x: left, y: top }}
        onDrag={handleDrag}
        onStop={() => setIsDragging(false)}
        onStart={() => setIsDragging(true)}
        cancel={cancelClasses}
        // disabled={disabled}
      >
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
          minWidth={'150px'}
          maxWidth={'150px'}
          minHeight={'100px'}
          maxHeight={'500px'}
          onResize={handleResize}
          onResizeStop={handleStop}
          onResizeStart={handleStart}
        >
          <span className={styles.hourLabel}>
            {height + delta} - {top + topDelta}
          </span>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default TimeGrid;
