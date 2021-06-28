import { Question } from '../../model/survey/Question';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { post } from '../genericApiCalls';
import { getSurveysUrl } from './urls';

export const createSurvey = (
  meetingId: number,
  surveyWithQuestions: SurveyWithQuestionsDTO,
  setResponse?: Function,
  setData?: Function
) => {
  surveyWithQuestions.questions = surveyWithQuestions.questions.map((question: Question) => {
    question.id = null;
    return question;
  });

  surveyWithQuestions.meetingId = meetingId;
  post(
    surveyWithQuestions,
    getSurveysUrl(),
    setData,
    setResponse,
    true,
    'Surveys has beedn added succesfully'
  );
};
