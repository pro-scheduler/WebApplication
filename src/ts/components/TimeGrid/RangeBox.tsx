import { Resizable } from 're-resizable';
import styles from './TimeGrid.module.scss';
import classcat from 'classcat';
import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';

const RangeBox = ({ step, defaultHeight, max, boxSize, defaultTop, id, changeParams }: any) => {
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(0);
  const [changeDirection, setChangeDirection] = useState('top');
  const [topDelta, setTopDelta] = useState(0);
  const [delta, setDelta] = useState(0);
  const [draggingDelta, setDraggingDelta] = useState(0);

  console.log('Init', height, defaultHeight);
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
    let toChangeHeight = height + defaultHeight;
    let toChangeTop = top + defaultTop;

    if (top + topDelta + draggingDelta + height + delta + defaultTop + defaultHeight > boxSize) {
      setHeight(boxSize - top - topDelta - draggingDelta - defaultTop);
      toChangeHeight = boxSize - top - topDelta - draggingDelta - defaultTop;
    } else if (top + topDelta + defaultTop + draggingDelta < 0) {
      setHeight(height + top + defaultTop);
      toChangeHeight = height + defaultHeight + top + defaultTop;
      toChangeTop = 0;
      setTopDelta(0);
      setDraggingDelta(0);
    } else {
      setHeight(height + delta);
      toChangeHeight = height + delta + defaultHeight;
    }
    setDelta(0);

    if (changeDirection.includes('top')) {
      if (top + topDelta + defaultTop + draggingDelta >= 0) {
        setTop(top + topDelta);
        toChangeTop = top + topDelta + defaultTop + draggingDelta;
        setTopDelta(0);
      }
    }
    setTop(0);
    setHeight(0);
    changeParams(id, toChangeTop, toChangeHeight);
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
    setTop(0);
    setHeight(0);
    changeParams(id, top + draggingDelta + defaultTop, height + defaultHeight);
  };
  const cancelClasses = styles.handle
    .split(' ')
    .map((className) => `.${className}`)
    .join(', ');

  const handleStart = () => {
    setDelta(0);
  };

  return (
    <div className={styles.rangeBoxContainer} style={{ top: top + topDelta + defaultTop }}>
      <Draggable
        axis={'y'}
        bounds={{
          top: -top - defaultTop,
          bottom: boxSize - top - height - defaultTop - defaultHeight,
          left: 0,
          right: 0,
        }}
        position={{ x: 62, y: 0 }}
        onDrag={handleDrag}
        onStop={handleDragStop}
        cancel={cancelClasses}
        grid={[step, step]}
        // disabled={disabled}
      >
        <Resizable
          // resposive here later to do
          size={{ width: '150px', height: height + delta + defaultHeight }}
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
          // minWidth={'150px'}
          // maxWidth={'150px'}
          minHeight={3}
          maxHeight={max}
          onResize={handleResize}
          onResizeStop={handleStop}
          onResizeStart={handleStart}
          grid={[step, step]}
        >
          <span className={styles.hourLabel}>
            {height + delta + defaultHeight} - {top + topDelta + draggingDelta + defaultTop}
          </span>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default RangeBox;
