import Survey from '../model/survey/Survey';
import SurveyResultsDTO from '../model/survey/SurveyDTO/SurveyResultsDTO';

type surveyState = { survey: Survey; surveyResults: SurveyResultsDTO };

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
      console.log(action);
      return {
        ...state,
        survey: action.payload,
      };
    case 'LOAD_RESULTS':
      console.log(action);
      return {
        ...state,
        surveyResults: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
