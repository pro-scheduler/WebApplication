import { Question } from '../../model/survey/Question';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { post } from '../genericApiCalls';
import { getFillSurveyUrl, getSurveysUrl } from './urls';
import { Answer } from '../../model/survey/Answer';

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
    'Survey has been added successfully'
  );
};

export const fillSurvey = (
  id: number,
  questionsAndAnswers: { question: Question; answer: Answer | null }[],
  setResponse?: Function,
  setData?: Function
) => {
  const survey = { id: id, questionsAndAnswers: questionsAndAnswers };

  post(
    survey,
    getFillSurveyUrl(),
    setData,
    setResponse,
    true,
    'Answers has been saved successfully'
  );
};
