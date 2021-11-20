import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { getUserSurveys } from '../../API/survey/surveyService';
import { BasicUserSurveyInfo } from '../../model/survey/Survey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import SurveysList from '../../components/Surveys/SurveysList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Surveys = () => {
  const [surveys, setSurveys] = useState<BasicUserSurveyInfo[]>([]);
  const [response, setResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    getUserSurveys(setSurveys, setResponse);
  }, []);

  return (
    <Container fluid className="mb-4">
      {response.isSuccess ? (
        <Row className="justify-content-center mt-4">
          <Col>
            <SurveysList surveys={surveys} />
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
export default Surveys;
