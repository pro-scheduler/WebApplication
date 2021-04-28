import QuestionWithAnswers from './QuestionWithAnswers';

export default interface SurveyResultsDTO {
  id: number;
  meetingId: number;
  description: string;
  questionsAndAnswers: QuestionWithAnswers[];
}
