import { Dispatch } from 'redux';
import {
  getFillSurveyUrl,
  getSurveyAnswersUrl,
  getSurveyForMeetingUrl,
  getSurveysUrl,
  getSurveyUrl,
} from '../API/survey/urls';
import {
  Survey,
  SurveyResultsDTO,
  SurveyWithQuestionsDTO,
  UserSurvey,
} from '../model/survey/Survey';
import { Question } from '../model/survey/Question';
import { Answer } from '../model/survey/Answer';

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

const getSurveyForMeeting = async (meetingId: number): Promise<UserSurvey | undefined> => {
  try {
    const response = await fetch(getSurveyForMeetingUrl(meetingId));
    return response.json();
  } catch (error) {
    return undefined;
  }
};

const fillSurvey = async (
  id: number,
  questionsAndAnswers: { question: Question; answer: Answer | null }[]
) => {
  const survey = { id: id, questionsAndAnswers: questionsAndAnswers };

  try {
    const response = await fetch(getFillSurveyUrl(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    });
    return response.json();
  } catch (error) {
    return undefined;
  }
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  createSurvey,
  getSurveyForMeeting,
  fillSurvey,
};

export default actions;
