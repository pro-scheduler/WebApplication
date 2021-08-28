import { Question } from '../../model/survey/Question';
import { SurveyWithQuestionsDTO } from '../../model/survey/Survey';
import { get, post, put } from '../genericApiCalls';
import {
  getFillSurveyUrl,
  getSurveyAnswersUrl,
  getSurveyForMeetingUrl,
  getSurveySummaryUrl,
  getSurveysUrl,
  getSurveyToEditUrl,
  getSurveyUrl,
} from './urls';
import { Answer } from '../../model/survey/Answer';

export const createSurvey = (
  meetingId: number,
  surveyWithQuestions: SurveyWithQuestionsDTO,
  setResponse?: Function,
  onSuccess?: Function,
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
    'Survey has been added successfully',
    onSuccess
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

export const getSurveyToEdit = (meetingId: number, setSurvey: Function, setResponse?: Function) => {
  get(getSurveyToEditUrl(meetingId), setSurvey, setResponse);
};

export const editSurvey = (
  id: number,
  survey: SurveyWithQuestionsDTO,
  onSuccess?: Function,
  setResponse?: Function,
  setData?: Function
) => {
  put(
    survey,
    getSurveyUrl(id),
    setData,
    setResponse,
    true,
    'Survey has been updated successfully',
    onSuccess
  );
};
