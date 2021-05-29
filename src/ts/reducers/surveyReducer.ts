import { Survey, SurveyResultsDTO } from '../model/survey/Survey';

type surveyState = {
  survey: Survey;
  surveyResults: SurveyResultsDTO;
};

const defaultSurvey: Survey = {
  id: 0,
  meetingId: 0,
  description: '',
  questions: [],
  answers: [],
};

const defaultSurveyResults: SurveyResultsDTO = {
  id: 0,
  meetingId: 0,
  description: '',
  questionsAndAnswers: [],
};

const defaultState: surveyState = {
  survey: defaultSurvey,
  surveyResults: defaultSurveyResults,
};

const userReducer = (state: surveyState = defaultState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'LOAD_SURVEY':
      return loadSurvey(state, action);
    case 'LOAD_RESULTS':
      return loadResults(state, action);
    default:
      return state;
  }
};

const loadSurvey = (state: surveyState = defaultState, action: { type: string; payload: any }) => {
  console.log(action);
  return {
    ...state,
    survey: action.payload,
  };
};

const loadResults = (state: surveyState = defaultState, action: { type: string; payload: any }) => {
  console.log(action);
  return {
    ...state,
    surveyResults: action.payload,
  };
};

export default userReducer;
