import React from 'react';
import Container from 'react-bootstrap/Container';

import './LandingPage.css';
import Footer from '../../components/LandingPage/Footer/Footer';
import Header from '../../components/LandingPage/Header/Header';

const LandingPage = () => {
  return (
    <Container fluid className="mx-0 px-0 my-0 py-0">
      <Header />
      <Footer />
    </Container>
  );
};

export default LandingPage;
