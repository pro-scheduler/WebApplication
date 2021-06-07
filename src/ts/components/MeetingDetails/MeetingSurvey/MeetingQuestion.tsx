import { Question } from '../../../model/survey/Question';

export type MeetingQuestionProps = {
  question: Question;
};

const MeetingQuestion = ({ question }: MeetingQuestionProps) => {
  return (
    <div>
      <p>{question.question}</p>
    </div>
  );
};

export default MeetingQuestion;
