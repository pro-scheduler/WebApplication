import { Answer } from './Answer';
import { Question } from './Question';

export type Survey = {
  id: number;
  meetingId: number;
  description: string;
  questions: Question[];
  answers: Answer[];
};

export type QuestionWithAnswers = {
  question: Question;
  answers: Answer[];
};

export type SurveyResultsDTO = {
  id: number;
  meetingId: number;
  description: string;
  questionsAndAnswers: QuestionWithAnswers[];
};

export type SurveyWithQuestionsDTO = {
  meetingId: number;
  description: string;
  questions: Question[];
};
