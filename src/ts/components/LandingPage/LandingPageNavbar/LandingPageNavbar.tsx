import { Nav, Navbar } from 'react-bootstrap';
import logo from '../../../../images/logo.svg';
import React from 'react';
import styles from './LandingPageNavbar.module.css';
import RedirectButton from '../../common/SubmitButton/RedirectButton/RedirectButton';
import { UserSummary } from '../../../model/user/ProUser';
import UserIcon from '../../common/Icons/UserIcon';

const LandingPageNavbar = ({
  user,
  showUserIcon = false,
}: {
  user: UserSummary;
  showUserIcon?: boolean;
}) => {
  return (
    <Navbar fixed={'top'} variant="dark" className={styles.navbar}>
      <Navbar.Brand>
        <div className={styles.navbarLogo}>
          <img src={logo} alt="logo" />
          ProScheduler
        </div>
      </Navbar.Brand>
      <Nav className="ml-auto">
        {user && user.username && showUserIcon ? (
          <UserIcon user={user} backgroundColor="var(--light-red)" />
        ) : (
          <RedirectButton text="Sign In" redirectTO="/signin" className={styles.signInButton} />
        )}
      </Nav>
    </Navbar>
  );
};

export default LandingPageNavbar;
