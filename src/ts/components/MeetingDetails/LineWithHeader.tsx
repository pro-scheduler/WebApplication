import styles from './LineWithHeader.module.css';
import Col from 'react-bootstrap/Col';
import React from 'react';

const LineWithHeader = ({ header }: { header?: string }) => {
  return (
    <Col lg={12} className="my-0 py-0 pr-5">
      <div className={styles.meetingDetailsHeader}>{header}</div>
      <hr className={styles.meetingDetailsLine} />
    </Col>
  );
};

export default LineWithHeader;
