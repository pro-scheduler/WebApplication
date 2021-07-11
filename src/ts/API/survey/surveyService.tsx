import { Question } from '../../model/survey/Question';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { get, post } from '../genericApiCalls';
import {
  getFillSurveyUrl,
  getSurveyAnswersUrl,
  getSurveyForMeetingUrl,
  getSurveySummaryUrl,
  getSurveysUrl,
  getSurveyUrl,
} from './urls';
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

export const loadSurvey = (id: number, setSurvey: Function, setResponse?: Function) => {
  get(getSurveyUrl(id), setSurvey, setResponse);
};

export const getSurveyForMeeting = (
  meetingId: number,
  setSurvey: Function,
  setResponse?: Function
) => {
  get(getSurveyForMeetingUrl(meetingId), setSurvey, setResponse);
};

export const loadSurveyResults = (id: number, setSurvey: Function, setResponse?: Function) => {
  get(getSurveyAnswersUrl(id), setSurvey, setResponse);
};

export const getSurveySummary = (
  meetingId: number,
  setSurveySummary: Function,
  setResponse?: Function
) => {
  get(getSurveySummaryUrl(meetingId), setSurveySummary, setResponse);
};
