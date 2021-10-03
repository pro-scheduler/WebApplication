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
  const [collapsed, setCollapsed] = useState<Boolean>(true);

  return (
    <Col lg={12} className="my-0 py-0 px-4">
      <div className={styles.meetingDetailsHeader}>
        <div>{header}</div>
        <div>
          {collapseAction && collapsed && (
            <RiArrowDownSLine
              onClick={() => {
                collapseAction(false);
                setCollapsed(false);
              }}
              className={styles.arrowIcon}
            />
          )}
          {collapseAction && !collapsed && (
            <RiArrowLeftSLine
              onClick={() => {
                collapseAction(true);
                setCollapsed(true);
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
