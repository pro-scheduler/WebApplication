import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import logo from '../../../../images/logo.svg';
import { BiCopyright } from 'react-icons/bi';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Jumbotron fluid className={styles.footer}>
      <Container fluid>
        <Row className="mt-5 mb-0 pt-2 pb-0 ml-0">
          <Col lg={12} className="my-0 py-0">
            <hr className={styles.footerLine} />
          </Col>
          <Col lg={6} className="my-0 py-0">
            <p className={styles.footerLogo}>
              <img src={logo} alt="logo" className="mt-2" />
              ProScheduler
            </p>
          </Col>
          <Col lg={6} className="my-0 py-0 text-right">
            <p className={styles.copyright}>
              Copyright <BiCopyright /> 2021 ProScheduler
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Footer;
