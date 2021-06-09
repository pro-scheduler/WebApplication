import { Question, QuestionType } from './Question';

export type Answer = {
  id: number | null;
  question: Question;
  type: QuestionType;
  text?: string; // for open
  decision?: boolean; // for yes or no
  dropdownChoice?: string; // for dropdown
  rating?: number; // for linear
  choices?: string[]; // for multiChoice
};
