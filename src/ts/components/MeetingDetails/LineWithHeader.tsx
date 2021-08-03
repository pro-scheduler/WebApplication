import styles from './LineWithHeader.module.css';
import Col from 'react-bootstrap/Col';
import { RiPencilFill } from 'react-icons/ri';

const LineWithHeader = ({ header, iconAction }: { header?: string; iconAction?: Function }) => {
  return (
    <Col lg={12} className="my-0 py-0 pr-5">
      <div className={styles.meetingDetailsHeader}>
        <div>{header}</div>
        {iconAction && <RiPencilFill className={styles.pencilIcon} onClick={() => iconAction()} />}
      </div>
      <hr className={styles.meetingDetailsLine} />
    </Col>
  );
};

export default LineWithHeader;
