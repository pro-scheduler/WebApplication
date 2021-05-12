import { Question } from '../model/survey/Question';
import { Survey, SurveyResultsDTO, SurveyWithQuestionsDTO } from '../model/survey/Survey';

type surveyState = {
  survey: Survey;
  surveyResults: SurveyResultsDTO;
  newSurvey: SurveyWithQuestionsDTO;
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

const defaultNewSurvey: SurveyWithQuestionsDTO = {
  meetingId: 2,
  description: '',
  questions: [],
};

const defaultState: surveyState = {
  survey: defaultSurvey,
  surveyResults: defaultSurveyResults,
  newSurvey: defaultNewSurvey,
};

const userReducer = (state: surveyState = defaultState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'LOAD_SURVEY':
      return loadSurvey(state, action);
    case 'LOAD_RESULTS':
      return loadResults(state, action);
    case 'SET_MEETING_ID':
      return setMeetingId(state, action.payload.meetingId);
    case 'ADD_QUESTION':
      return addQuestion(state, action.payload);
    case 'REMOVE_QUESTION':
      return removeQuestion(state, action.payload.id);
    case 'ADD_DESCRIPTION':
      return addDescription(state, action.payload.description);
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

const setMeetingId = (state: surveyState = defaultState, meetingId: number) => {
  return {
    ...state,
    newSurvey: {
      ...state.newSurvey,
      meetingId: meetingId,
    },
  };
};

const addQuestion = (state: surveyState = defaultState, payload: any) => {
  return {
    ...state,
    newSurvey: {
      ...state.newSurvey,
      questions: questionWithIdExists(payload.question.id, state.newSurvey.questions)
        ? state.newSurvey.questions.map((question: Question) => {
            if (question.id !== payload.question.id) return question;
            return {
              ...question,
              ...payload.question,
            };
          })
        : [...state.newSurvey.questions, payload.question],
    },
  };
};

const removeQuestion = (state: surveyState = defaultState, id: number) => {
  return {
    ...state,
    newSurvey: {
      ...state.newSurvey,
      questions: state.newSurvey.questions.filter((question: Question) => question.id !== id),
    },
  };
};

const addDescription = (state: surveyState = defaultState, description: string) => {
  return {
    ...state,
    newSurvey: {
      ...state.newSurvey,
      description: description,
    },
  };
};

const questionWithIdExists = (id: number, questions: Question[]): boolean => {
  return questions.filter((question: Question) => question.id === id).length > 0;
};

export default userReducer;
