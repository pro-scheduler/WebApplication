import { Answer } from './Answer';
import { Question } from './Question';

export type Survey = {
  id: number;
  meetingId: number;
  description: string;
  questions: Question[];
  answers: Answer[];
};

export type SurveyResultsDTO = {
  id: number;
  meetingId: number;
  description: string;
  questionsAndAnswers: {
    question: Question;
    answers: Answer[];
  }[];
};

export type SurveyWithQuestionsDTO = {
  meetingId: number;
  description: string;
  questions: Question[];
};

export type UserSurvey = {
  id: number;
  meetingId: number;
  description: string;
  questionsAndAnswers: {
    question: Question;
    answer: Answer | null;
  }[];
  state: 'INCOMPLETE' | 'COMPLETE';
};
