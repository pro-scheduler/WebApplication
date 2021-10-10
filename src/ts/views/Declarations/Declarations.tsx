import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { loadUserDeclarations } from '../../API/declarations/declarationsService';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import DeclarationsList from '../../components/Declarations/DeclarationsList';
import Col from 'react-bootstrap/Col';
import PencilIcon from '../../components/common/Icons/PencilIcon';
import styles from './Declarations.module.css';
import Row from 'react-bootstrap/Row';

const Declarations = () => {
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  const [response, setResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    loadUserDeclarations(setDeclarations, setResponse);
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center mt-4 mb-5">
        <Col lg={12} className="text-center mt-5">
          <PencilIcon className={styles.pencilIcon} />
        </Col>
      </Row>
      {response.isSuccess ? (
        <Row className="justify-content-center mt-4">
          <Col>
            <DeclarationsList declarations={declarations} />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center mt-4 mb-5">
          <Col className="text-center mt-5">
            <LoadingSpinner active={response.isLoading} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Declarations;
