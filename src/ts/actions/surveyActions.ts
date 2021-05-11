import { Dispatch } from 'redux';
import { getSurveyAnswersUrl, getSurveysUrl, getSurveyUrl } from '../API/survey/urls';
import Survey from '../model/survey/Survey';
import SurveyResultsDTO from '../model/survey/SurveyDTO/SurveyResultsDTO';
import SurveyWithQuestionsDTO from '../model/survey/SurveyDTO/SurveyWithQuestionsDTO';
import { createSurveyFailed, createSurveyReset, createSurveySuccess } from './messagesActions';
import Question from '../model/survey/question/Question';

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

const createSurvey = (surveyWithQuestions: SurveyWithQuestionsDTO) => (dispatch: Dispatch) => {
  dispatch(createSurveyReset());

  surveyWithQuestions.questions = surveyWithQuestions.questions.map((question: Question) => {
    question.id = null;
    return question;
  });

  console.log(surveyWithQuestions);

  fetch(getSurveysUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(surveyWithQuestions),
  }).then((response) => {
    if (response.status === 201) {
      return dispatch(createSurveySuccess('Survey has been created successfully :)'));
    } else {
      return dispatch(createSurveyFailed('Survey has not been created ;/'));
    }
  });
};

// const addQuestionsToSurvey = (surveyId: number, surveyWithQuestions: SurveyWithQuestionsDTO) => (
//   dispatch: Dispatch
// ) => {
//   dispatch(createSurveyReset());
//
//   fetch(getSurveyUrl(surveyId), {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(surveyWithQuestions),
//   }).then((response) => {
//     if (response.status === 201) {
//       return dispatch(createSurveySuccess('Questions has been added successfully to survey :)'));
//     } else {
//       return dispatch(createSurveyFailed('Questions has not been added to survey ;/'));
//     }
//   });
// };

const addQuestionToSurveyWithQuestionsDTO = (question: Question) => (dispatch: Dispatch) => {
  return dispatch({ type: 'ADD_QUESTION', payload: { question } });
};

const removeQuestionFromSurveyWithQuestionsDTO = (id: number) => (dispatch: Dispatch) => {
  return dispatch({ type: 'REMOVE_QUESTION', payload: { id } });
};

const addDescriptionToSurveyWithQuestionsDTO = (description: string) => (dispatch: Dispatch) => {
  return dispatch({ type: 'ADD_DESCRIPTION', payload: { description } });
};

const setMeetingIdInSurveyWithQuestionsDTO = (meetingId: number) => (dispatch: Dispatch) => {
  return dispatch({ type: 'SET_MEETING_ID', payload: { meetingId } });
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  createSurvey,
  addQuestionToSurveyWithQuestionsDTO,
  removeQuestionFromSurveyWithQuestionsDTO,
  addDescriptionToSurveyWithQuestionsDTO,
  setMeetingIdInSurveyWithQuestionsDTO,
};

export default actions;
