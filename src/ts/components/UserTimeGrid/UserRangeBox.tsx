import { Resizable } from 're-resizable';
import styles from './UserTimeGrid.module.scss';
import classcat from 'classcat';
import { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import { TiDelete } from 'react-icons/ti';

export type RangeBoxProps = {
  step: number;
  defaultHeight: any;
  max: number;
  boxSize: number;
  defaultTop: any;
  id: number;
  changeParams: any;
  lockedRanges: Array<{ top: number; bottom: number }>;
  removeRange?: Function;
};
const UserRangeBox = ({
  step,
  defaultHeight,
  max,
  defaultTop,
  id,
  changeParams,
  lockedRanges,
  removeRange = () => {},
}: RangeBoxProps) => {
  const [top, setTop] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [changeDirection, setChangeDirection] = useState<string>('top');
  const [topDelta, setTopDelta] = useState<number>(0);
  const [delta, setDelta] = useState<number>(0);
  const [draggingDelta, setDraggingDelta] = useState<number>(0);

  const findNearestTopLocked = (height: number, whichNearest: string) => {
    for (let range of lockedRanges) {
      if (range.top <= height && range.bottom >= height) {
        if (whichNearest === 'top') return range.top;
        if (whichNearest === 'bottom') return range.bottom;
      }
    }
    return 0;
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
    let toChangeHeight: number;
    let toChangeTop: number = top + defaultTop;

    let currentBottom =
      top + topDelta + draggingDelta + height + delta + defaultTop + defaultHeight;
    let currentTop = top + topDelta + defaultTop + draggingDelta;
    if (!changeDirection.includes('top')) {
      let nearestBottom = findNearestTopLocked(currentTop, 'bottom');
      if (currentBottom > nearestBottom) {
        setHeight(nearestBottom - top - topDelta - draggingDelta - defaultTop);
        toChangeHeight = nearestBottom - top - topDelta - draggingDelta - defaultTop;
      } else {
        setHeight(height + delta);
        toChangeHeight = height + delta + defaultHeight;
      }
    } else {
      let nearestTop = findNearestTopLocked(currentBottom, 'top');
      if (currentTop < nearestTop) {
        setHeight(height + top + defaultTop);
        toChangeHeight = currentBottom - nearestTop;
        toChangeTop = nearestTop;
        setTopDelta(0);
        setDraggingDelta(0);
      } else {
        setHeight(height + delta);
        setTop(top + topDelta);
        toChangeHeight = height + delta + defaultHeight;
        toChangeTop = top + topDelta + defaultTop + draggingDelta;
        setTopDelta(0);
      }
    }

    setDelta(0);
    setTop(0);
    setHeight(0);
    changeParams(id, toChangeTop, toChangeHeight);
  };

  const handleDrag: DraggableEventHandler = (event: any, position: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDraggingDelta(position.y);
  };

  const handleDragStop: DraggableEventHandler = (event: any, _: any) => {
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
          top:
            -top -
            defaultTop +
            findNearestTopLocked(top + defaultTop + height + defaultHeight, 'top'),
          bottom:
            findNearestTopLocked(top + defaultTop, 'bottom') -
            top -
            height -
            defaultTop -
            defaultHeight,
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
          // responsive here later to do
          size={{ width: '70%', height: height + delta + defaultHeight }}
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
          <div className={styles.hourLabel}>
            {positionToTime(top + topDelta + draggingDelta + defaultTop)} -{' '}
            {positionToTime(
              top + topDelta + draggingDelta + defaultTop + height + delta + defaultHeight
            )}
            <TiDelete
              className={styles.exitButton}
              onClick={() => {
                removeRange(id);
              }}
            />
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};

export default UserRangeBox;
