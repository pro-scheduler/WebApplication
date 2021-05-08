export const getSurveysUrl = () => `${process.env.REACT_APP_API_URL}survey`;

export const getSurveyUrl = (surveyId: number) => getSurveysUrl() + `/${surveyId}`;

export const getSurveyAnswersUrl = (surveyId: number) => getSurveyUrl(surveyId) + '/answers';
