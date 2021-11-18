import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import styles from './Header.module.css';
import { Col, Row } from 'react-bootstrap';
import GoogleButton from '../../common/SubmitButton/IconButton/GoogleButton';
import { facebookUrl, googleUrl } from '../../../auth/AuthCredentials';
import FacebookButton from '../../common/SubmitButton/IconButton/FacebookButton';
import AuthView from './Auth/AuthView';
import { useLocation } from 'react-router';
import { TiTick } from 'react-icons/ti';

const Header = () => {
  const location = useLocation();

  const constructStateParam = () => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('invite-link')) {
      return `t=il,v=${queryParams.get('invite-link')}`;
    }
    return `t=d,v=null`;
  };
  return (
    <Jumbotron fluid className={styles.headerJumbotron}>
      <Container fluid className="ml-lg-4 mt-lg-2">
        <Row>
          <Col lg={6}>
            <div className={styles.headerContainer}>
              <h2 className={styles.headerMotto}>Schedule meetings like a pro</h2>
              <div className={styles.tickContainer}>
                <TiTick className={styles.tickIcon} /> Create meetings
              </div>
              <div className={styles.tickContainer}>
                <TiTick className={styles.tickIcon} /> Organize surveys
              </div>
              <div className={styles.tickContainer}>
                <TiTick className={styles.tickIcon} /> Make declarations
              </div>
              <div className={styles.tickContainer}>
                <TiTick className={styles.tickIcon} /> Send notifications
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className={styles.authView}>
              <AuthView title="Get started">
                <GoogleButton
                  redirectTo={googleUrl.replace(':state', constructStateParam())}
                  text="Sign in with Google"
                  containerClassName="my-2"
                />
                <FacebookButton
                  redirectTo={facebookUrl.replace(':state', constructStateParam())}
                  text="Sign in with Facebook"
                  containerClassName="mt-4"
                />
              </AuthView>
            </div>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Header;
