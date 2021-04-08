import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../../../images/logo.svg';

import { BiCopyright } from 'react-icons/bi';
import './Footer.css';

const Footer = () => {
  return (
    <Jumbotron fluid className="footer mx-0 my-0 px-0 py-0">
      <Container fluid className="mt-5">
        <Row className="mb-0 pb-0">
          <Col lg={12}>
            <hr />
          </Col>
          <Col lg={6} className="my-0 py-0">
            <p>
              <img src={logo} alt="logo" />
              ProScheduler
            </p>
          </Col>
          <Col lg={6} className="my-0 py-0 text-right">
            <p className="copyright">
              Copyright <BiCopyright></BiCopyright> 2021 ProScheduler
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Footer;
