import { Dispatch } from 'redux';
import {
  getFillSurveyUrl,
  getSurveyAnswersUrl,
  getSurveyForMeetingUrl,
  getSurveyUrl,
} from '../API/survey/urls';
import { Survey, SurveyResultsDTO } from '../model/survey/Survey';
import { Question } from '../model/survey/Question';
import { Answer } from '../model/survey/Answer';
import Cookies from 'js-cookie';

const loadSurvey = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyUrl(id), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((survey: Survey) => {
      return dispatch({ type: 'LOAD_SURVEY', payload: survey });
    });
};

const loadSurveyResults = (id: number) => (dispatch: Dispatch) => {
  fetch(getSurveyAnswersUrl(id), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  })
    .then((response) => response.json())
    .then((surveyResultsDTO: SurveyResultsDTO) => {
      return dispatch({ type: 'LOAD_RESULTS', payload: surveyResultsDTO });
    });
};

const getSurveyForMeeting = (meetingId: number) => {
  return fetch(getSurveyForMeetingUrl(meetingId), {
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  }).then((response) => {
    return response.status === 200 ? response.json() : undefined;
  });
};

const fillSurvey = (
  id: number,
  questionsAndAnswers: { question: Question; answer: Answer | null }[]
) => {
  const survey = { id: id, questionsAndAnswers: questionsAndAnswers };

  return fetch(getFillSurveyUrl(), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
    body: JSON.stringify(survey),
  });
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  getSurveyForMeeting,
  fillSurvey,
};

export default actions;
