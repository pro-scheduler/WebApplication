import Question, { Type } from '../question/Question';

export default interface Answer {
  id: number;
  question: Question;
  type: Type;
}
