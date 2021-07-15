import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import styles from './Header.module.css';

const Header = () => {
  return (
    <Jumbotron fluid className={styles.headerJumbotron}>
      <Container fluid className="ml-lg-4 mt-lg-2">
        <h2 className={styles.headerMotto}>Schedule meetings like a pro</h2>
      </Container>
    </Jumbotron>
  );
};

export default Header;
