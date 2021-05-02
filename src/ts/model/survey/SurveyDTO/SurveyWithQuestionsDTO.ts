import Question from '../question/Question';

export default interface SurveyWithQuestionsDTO {
  meetingId: number;
  description: string;
  questions: Question[];
}
