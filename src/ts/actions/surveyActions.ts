import { Dispatch } from 'redux';
import {
  getSurveyAnswersUrl,
  getSurveyForMeetingUrl,
  getSurveySummaryUrl,
  getSurveyUrl,
} from '../API/survey/urls';
import { Survey, SurveyResultsDTO, SurveySummary } from '../model/survey/Survey';
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

const getSurveySummary = (meetingId: number): Promise<SurveySummary | undefined> => {
  return fetch(getSurveySummaryUrl(meetingId), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  }).then((response) => {
    return response.status === 200 ? response.json() : undefined;
  });
};

const actions = {
  loadSurvey,
  loadSurveyResults,
  getSurveyForMeeting,
  getSurveySummary,
};

export default actions;
