import Question from './question/Question';
import Answer from './answer/Answer';

export default interface Survey {
  id: number;
  meetingId: number;
  description: string;
  questions: Question[];
  answers: Answer[];
}
