import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from '../../components/LandingPage/Header/Header';
import Content from '../../components/LandingPage/Content/Content';
import Footer from '../../components/LandingPage/Footer/Footer';
import LandingPageNavbar from '../../components/LandingPage/LandingPageNavbar/LandingPageNavbar';
import { UserSummary } from '../../model/user/ProUser';

const LandingPage = ({ user }: { user: UserSummary }) => {
  return (
    <>
      <LandingPageNavbar user={user} />
      <Container fluid className="m-0 p-0">
        <Header />
        <Content />
        <Footer />
      </Container>
    </>
  );
};

export default LandingPage;
