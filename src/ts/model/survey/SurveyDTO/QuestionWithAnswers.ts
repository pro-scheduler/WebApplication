import Question from '../question/Question';
import Answer from '../answer/Answer';

export default interface QuestionWithAnswers {
  question: Question;
  answers: Answer[];
}
