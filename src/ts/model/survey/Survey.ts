import Question from './question/Question';

export default interface Survey {
  id: number;
  meetingId: number;
  description: string;
  questions: Question[];
  answers: [];
}
