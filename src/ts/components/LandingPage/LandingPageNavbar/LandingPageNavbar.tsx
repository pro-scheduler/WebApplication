import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../../../images/logo.svg';
import React from 'react';
import styles from './LandingPageNavbar.module.css';
import RedirectButton from '../../common/SubmitButton/RedirectButton/RedirectButton';

const LandingPageNavbar = () => {
  return (
    <Navbar fixed={'top'} variant="dark" className={styles.navbar}>
      <Navbar.Brand>
        <div className={styles.navbarLogo}>
          <img src={logo} alt="logo" />
          ProScheduler
        </div>
      </Navbar.Brand>
      <Nav className="ml-auto">
        <RedirectButton text="Sign In" redirectTO="/signin" className={styles.signInButton} />
      </Nav>
    </Navbar>
  );
};

export default LandingPageNavbar;
