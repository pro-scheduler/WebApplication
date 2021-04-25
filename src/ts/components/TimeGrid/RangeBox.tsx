import { Resizable } from 're-resizable';
import styles from './TimeGrid.module.scss';
import classcat from 'classcat';
import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

const RangeBox = ({ step, min, max, defaultTop }: any) => {
  const [top, setTop] = useState(defaultTop);
  const [height, setHeight] = useState(min);

  const [changeDirection, setChangeDirection] = useState('top');
  const [topDelta, setTopDelta] = useState(0);
  const [delta, setDelta] = useState(0);
  const [draggingDelta, setDraggingDelta] = useState(0);

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
    if (top + topDelta + draggingDelta + height + delta > 480) {
      setHeight(480 - top - topDelta - draggingDelta);
    } else if (top + topDelta + draggingDelta < 0) {
      setHeight(height + top);
      setTop(0);
      setTopDelta(0);
      setDraggingDelta(0);
      console.log('elo');
    } else {
      setHeight(height + delta);
    }
    setDelta(0);
    setIsResizing(false);

    if (changeDirection.includes('top')) {
      if (top + topDelta + draggingDelta >= 0) {
        setTop(top + topDelta);
        setTopDelta(0);
      }
    }
  };

  const handleDrag: DraggableEventHandler = (event: any, position: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDraggingDelta(position.y);
  };

  const handleDragStop: DraggableEventHandler = (event: any, position: any) => {
    event.preventDefault();
    event.stopPropagation();
    setTop(top + draggingDelta);
    setDraggingDelta(0);
    setIsDragging(false);
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
    <div className={styles.rangeBoxContainer} style={{ top: top + topDelta }}>
      <Draggable
        axis={'y'}
        bounds={{
          top: -top,
          bottom: 480 - top - height,
          left: 0,
          right: 0,
        }}
        position={{ x: 62, y: 0 }}
        onDrag={handleDrag}
        onStop={handleDragStop}
        onStart={() => setIsDragging(true)}
        cancel={cancelClasses}
        grid={[step, step]}
        // disabled={disabled}
      >
        <Resizable
          size={{ width: '130px', height: height + delta }}
          enable={{ top: true, bottom: true }}
          className={styles.rangeBox}
          // style={{ height: height + delta, top: top + topDelta }}
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
          minHeight={min}
          maxHeight={max}
          onResize={handleResize}
          onResizeStop={handleStop}
          onResizeStart={handleStart}
          grid={[step, step]}
        >
          <span className={styles.hourLabel}>
            {height + delta} - {top + topDelta + draggingDelta}
          </span>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default RangeBox;
