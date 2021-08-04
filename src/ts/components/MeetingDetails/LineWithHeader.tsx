import styles from './LineWithHeader.module.css';
import Col from 'react-bootstrap/Col';
import { RiPencilFill, RiArrowDownSLine, RiArrowLeftSLine } from 'react-icons/ri';
import { useState } from 'react';

const LineWithHeader = ({
  header,
  iconAction,
  collapseAction,
}: {
  header?: string;
  iconAction?: Function;
  collapseAction?: Function;
}) => {
  const [colapsed, setColapsed] = useState<Boolean>(true);

  return (
    <Col lg={12} className="my-0 py-0 pr-5">
      <div className={styles.meetingDetailsHeader}>
        <div>{header}</div>
        <div>
          {collapseAction && colapsed && (
            <RiArrowDownSLine
              onClick={() => {
                collapseAction(false);
                setColapsed(false);
              }}
              className={styles.arrowIcon}
            />
          )}
          {collapseAction && !colapsed && (
            <RiArrowLeftSLine
              onClick={() => {
                collapseAction(true);
                setColapsed(true);
              }}
              className={styles.arrowIcon}
            />
          )}
          {iconAction && (
            <RiPencilFill className={styles.pencilIcon} onClick={() => iconAction()} />
          )}
        </div>
      </div>
      <hr className={styles.meetingDetailsLine} />
    </Col>
  );
};

export default LineWithHeader;
