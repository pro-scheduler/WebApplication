import './LineWithHeader.css';
import Col from 'react-bootstrap/Col';
import React from 'react';

const LineWithHeader = ({ header }: any) => {
  return (
    <Col lg={12} className="my-0 py-0 pr-5">
      <div className="mb-0 mt-5 lineHeader">{header}</div>
      <hr className="mt-2" />
    </Col>
  );
};

export default LineWithHeader;
