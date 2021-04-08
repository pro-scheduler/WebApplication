import React from 'react';
import Container from 'react-bootstrap/Container';

import Header from '../../components/LandingPage/Header/Header';
import Content from '../../components/LandingPage/Content/Content';
import Footer from '../../components/LandingPage/Footer/Footer';

const LandingPage = () => {
  return (
    <Container fluid className="m-0 p-0">
      <Header />
      <Content />
      <Footer />
    </Container>
  );
};

export default LandingPage;
