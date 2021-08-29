import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { loadUserDeclarations } from '../../API/declarations/declarationsService';
import { DeclarationDetails } from '../../model/declaration/Declaration';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import DeclarationsList from '../../components/Declarations/DeclarationsList';

const Declarations = () => {
  const [declarations, setDeclarations] = useState<DeclarationDetails[]>([]);
  const [response, setResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    loadUserDeclarations(setDeclarations, setResponse);
    // eslint-disable-next-line
  }, []);
  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <LoadingSpinner active={response.isLoading} />
      <DeclarationsList declarations={declarations} />
    </Container>
  );
};

export default Declarations;
