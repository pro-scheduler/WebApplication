import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './AuthView.module.css';

import AuthDetails, { AuthDetailsProps } from '../../components/Auth/AuthDetails';
import AuthDecoration from '../../components/Auth/AuthDecoration';

const AuthView = ({ title, question, redirectText, redirectTo, children }: AuthDetailsProps) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" className="col-12 text-center my-5">
        <AuthDecoration />
      </Col>
      <Col xs="auto" className={styles.authView}>
        <AuthDetails
          title={title}
          question={question}
          redirectText={redirectText}
          redirectTo={redirectTo}
          children={children}
        />
      </Col>
    </Row>
  );
};

export default AuthView;
