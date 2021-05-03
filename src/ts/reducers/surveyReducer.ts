import Survey from '../model/survey/Survey';
import SurveyResultsDTO from '../model/survey/SurveyDTO/SurveyResultsDTO';
import SurveyWithQuestionsDTO from '../model/survey/SurveyDTO/SurveyWithQuestionsDTO';
import Question from '../model/survey/question/Question';

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
    case 'SET_MEETING_ID':
      return {
        ...state,
        newSurvey: {
          ...state.newSurvey,
          meetingId: action.payload.meetingId,
        },
      };
    case 'ADD_QUESTION':
      return {
        ...state,
        newSurvey: {
          ...state.newSurvey,
          questions: questionWithIdExists(action.payload.question.id, state.newSurvey.questions)
            ? state.newSurvey.questions.map((question: Question) => {
                if (question.id !== action.payload.question.id) return question;
                return {
                  ...question,
                  ...action.payload.question,
                };
              })
            : [...state.newSurvey.questions, action.payload.question],
        },
      };
    case 'REMOVE_QUESTION':
      return {
        ...state,
        newSurvey: {
          ...state.newSurvey,
          questions: state.newSurvey.questions.filter(
            (question: Question) => question.id !== action.payload.id
          ),
        },
      };
    case 'ADD_DESCRIPTION':
      return {
        ...state,
        newSurvey: {
          ...state.newSurvey,
          description: action.payload.description,
        },
      };
    default:
      return state;
  }
};

const questionWithIdExists = (id: number, questions: Question[]): boolean => {
  return questions.filter((question: Question) => question.id === id).length > 0;
};

export default userReducer;
