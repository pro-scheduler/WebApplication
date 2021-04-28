import { Dispatch } from 'redux';
import { getSurveyAnswersUrl, getSurveysUrl, getSurveyUrl } from '../API/survey/urls';
import Survey from '../model/survey/Survey';
import SurveyResultsDTO from '../model/survey/SurveyDTO/SurveyResultsDTO';
import SurveyWithQuestionsDTO from '../model/survey/SurveyDTO/SurveyWithQuestionsDTO';
import { createSurveyFailed, createSurveyReset, createSurveySuccess } from './messagesActions';

const loadSurvey = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyUrl(id))
    .then((response) => response.json())
    .then((survey: Survey) => {
      console.log(survey);
      return dispatch({ type: 'LOAD_SURVEY', payload: survey });
    });
};

const loadSurveyResults = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyAnswersUrl(id))
    .then((response) => response.json())
    .then((surveyResultsDTO: SurveyResultsDTO) => {
      console.log(surveyResultsDTO);
      return dispatch({ type: 'LOAD_RESULTS', payload: surveyResultsDTO });
    });
};

const createSurvey = (surveyWithQuestions: SurveyWithQuestionsDTO) => (dispatch: Dispatch) => {
  dispatch(createSurveyReset());

  fetch(getSurveysUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(surveyWithQuestions),
  }).then((response) => {
    console.log(response);
    if (response.status === 201) {
      return dispatch(createSurveySuccess('Survey has been created successfully :)'));
    } else {
      return dispatch(createSurveyFailed('Survey has not been created ;/'));
    }
  });
};

const addQuestionsToSurvey = (surveyId: number, surveyWithQuestions: SurveyWithQuestionsDTO) => (
  dispatch: Dispatch
) => {
  dispatch(createSurveyReset());

  fetch(getSurveyUrl(surveyId), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(surveyWithQuestions),
  }).then((response) => {
    console.log(response);
    if (response.status === 201) {
      return dispatch(createSurveySuccess('Questions has been added successfully to survey :)'));
    } else {
      return dispatch(createSurveyFailed('Questions has not been added to survey ;/'));
    }
  });
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  createSurvey,
  addQuestionsToSurvey,
};

export default actions;