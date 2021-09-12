import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { getUserSurveys } from '../../API/survey/surveyService';
import { BasicUserSurveyInfo } from '../../model/survey/Survey';
import { ApiCall } from '../../API/genericApiCalls';
import LoadingSpinner from '../../components/common/Spinner/LoadingSpinner';
import SurveysList from '../../components/Surveys/SurveysList';

const Surveys = () => {
  const [surveys, setSurveys] = useState<BasicUserSurveyInfo[]>([]);
  const [response, setResponse] = useState<ApiCall>(new ApiCall());

  useEffect(() => {
    getUserSurveys(setSurveys, setResponse);
  }, []);

  return (
    <Container fluid className="ml-5 ml-sm-auto">
      <LoadingSpinner active={response.isLoading} />
      <SurveysList surveys={surveys} />
    </Container>
  );
};

export default Surveys;
