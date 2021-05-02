import Question, { Type } from '../question/Question';

export default interface Answer {
  id: number | null;
  question: Question;
  type: Type;
}
