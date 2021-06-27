import { Answer } from './Answer';
import { Question, QuestionType } from './Question';

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

export type SurveySummary = {
  finishedParticipantsCount: number;
  questionSummaries: {
    question: string;
    type: QuestionType;
    entries?: ChoiceInfo[];
    answers?: Entry[];
    avg?: number;
    yes?: {
      percentage: number;
    };
    no?: {
      percentage: number;
    };
  }[];
};

export type Entry = {
  email: string;
  answer: string;
};

export type EntryInfo = {
  percentage: number;
  attendeesCount?: number;
};

export type ChoiceInfo = {
  choice: string;
  point?: number;
  info: EntryInfo;
};
