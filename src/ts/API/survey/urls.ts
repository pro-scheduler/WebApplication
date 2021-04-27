export const getSurveysUrl = () => 'http://localhost:8080/api/survey';

export const getSurveyUrl = (surveyId: number) => `http://localhost:8080/api/survey/${surveyId}`;

export const getSurveyAnswers = (surveyId: number) => getSurveyUrl(surveyId) + '/answers';
