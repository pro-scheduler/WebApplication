export const getSurveysUrl = () => `${process.env.REACT_APP_SURVEY_SERVICE_URL}surveys`;

export const getSurveyUrl = (surveyId: number) => getSurveysUrl() + `/${surveyId}`;

export const getSurveyAnswersUrl = (surveyId: number) => getSurveyUrl(surveyId) + '/answers';

export const getSurveyForMeetingUrl = (meetingId: number) => getSurveysUrl() + `/${meetingId}/user`;

export const getFillSurveyUrl = () => getSurveysUrl() + '/fill';

export const getSurveySummaryUrl = (meetingId: number) => getSurveysUrl() + `/${meetingId}/summary`;
