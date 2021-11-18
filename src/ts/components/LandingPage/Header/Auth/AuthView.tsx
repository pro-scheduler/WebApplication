import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './AuthView.module.css';

export type AuthDetailsProps = {
  title: string;
  children: React.ReactNode[];
};

const AuthView = ({ title, children }: AuthDetailsProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" className={styles.authView}>
        <div>
          <h2 className="mt-4 ml-2 mb-5">{title}</h2>
          <div className="text-center mb-4">{children}</div>
        </div>
      </Col>
    </Row>
  );
};

export default AuthView;
