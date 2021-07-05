import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import purpleLogo from '../../../../images/purpleLogo.svg';

import styles from './Header.module.css';
import RedirectButton from '../../common/SubmitButton/RedirectButton/RedirectButton';

const Header = () => {
  return (
    <Jumbotron fluid className={styles.headerJumbotron}>
      <Container fluid className="ml-lg-2 mt-lg-2">
        <h1 className={styles.headerLogo}>
          <img src={purpleLogo} alt="logo" />
          ProScheduler
        </h1>
        <h2 className={styles.headerMotto}>Schedule meetings like a pro</h2>
        <Row className={styles.headerRow}>
          <Col md={12} lg={6} className="mt-lg-5 pt-lg-5 px-0 mx-auto text-center">
            <RedirectButton text="Sign In" redirectTO="/signin" className={styles.redirectButton} />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Header;
