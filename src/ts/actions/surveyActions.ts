import { Dispatch } from 'redux';
import { getSurveyAnswersUrl, getSurveysUrl, getSurveyUrl } from '../API/survey/urls';
import { Survey, SurveyResultsDTO, SurveyWithQuestionsDTO } from '../model/survey/Survey';
import { Question } from '../model/survey/Question';

const loadSurvey = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyUrl(id))
    .then((response) => response.json())
    .then((survey: Survey) => {
      return dispatch({ type: 'LOAD_SURVEY', payload: survey });
    });
};

const loadSurveyResults = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyAnswersUrl(id))
    .then((response) => response.json())
    .then((surveyResultsDTO: SurveyResultsDTO) => {
      return dispatch({ type: 'LOAD_RESULTS', payload: surveyResultsDTO });
    });
};

const createSurvey = (meetingId: number, surveyWithQuestions: SurveyWithQuestionsDTO) => {
  surveyWithQuestions.questions = surveyWithQuestions.questions.map((question: Question) => {
    question.id = null;
    return question;
  });

  surveyWithQuestions.meetingId = meetingId;

  return fetch(getSurveysUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(surveyWithQuestions),
  });
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  createSurvey,
};

export default actions;
