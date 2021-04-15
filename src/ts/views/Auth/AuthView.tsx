import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AuthView.css';

import { FcBusinesswoman, FcManager } from 'react-icons/fc';

const AuthView = ({ title, question, redirectText, redirectTo, children }: any) => {
  return (
    <Row className="justify-content-center mt-5">
      <Col xs="auto" className="col-12 text-center mt-5">
        <div className="mx-3 personIcon personIcon1">
          <FcBusinesswoman />
        </div>
        <div className="mx-3 personIcon  personIcon2">
          <FcManager />
        </div>
        <div className="mx-3 personIcon  personIcon3">
          <FcBusinesswoman />
        </div>
        <div className="mx-3 personIcon  personIcon1">
          <FcManager />
        </div>
        <div className="mx-3 personIcon  personIcon2">
          <FcBusinesswoman />
        </div>
        <div className="mx-3 personIcon personIcon3">
          <FcManager />
        </div>
      </Col>
      <Col xs="auto" className="mt-5 authview">
        <h1 className="mt-4 ml-2 mb-5">{title}</h1>
        <div className="text-center mb-4">{children}</div>
        <div className="redirect">
          <p className="ml-2 mt-5 redirect">{question}</p>
          <Link to={redirectTo} className="ml-2 pb-5 link">
            {redirectText}
          </Link>
        </div>
      </Col>
    </Row>
  );
};

export default AuthView;
