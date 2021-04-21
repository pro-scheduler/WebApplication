import React from 'react';
import { useParams } from 'react-router';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const Meeting = () => {
  const { id }: any = useParams();

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <Row className="justify-content-center mt-4">{id}</Row>
    </Container>
  );
};

export default Meeting;
